<template>
    <div class="demo">
      <h3>예시: 리포트 설정 Builder</h3>
      <p class="hint">
        여러 옵션을 선택한 뒤 <b>Builder</b>를 통해 하나의 설정 객체를 생성합니다.
      </p>
  
      <div class="form">
        <label>
          제목
          <input v-model="title" placeholder="주간 통계 리포트" />
        </label>
  
        <label class="row">
          <input type="checkbox" v-model="includeChart" />
          차트 포함
        </label>
  
        <label class="row">
          <input type="checkbox" v-model="includeSummary" />
          요약 포함
        </label>
  
        <label>
          포맷
          <select v-model="format">
            <option value="pdf">PDF</option>
            <option value="html">HTML</option>
          </select>
        </label>
  
        <button @click="buildConfig">리포트 설정 생성</button>
      </div>
  
      <pre class="output" v-if="output">
  {{ output }}
      </pre>
  
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { ReportConfigBuilder, type ReportFormat } from '../patterns/builder';
  
  const title = ref('주간 통계 리포트');
  const includeChart = ref(true);
  const includeSummary = ref(true);
  const format = ref<ReportFormat>('pdf');
  
  const output = ref('');
  const error = ref('');
  
  const buildConfig = () => {
    error.value = '';
    output.value = '';
  
    try {
      const builder = new ReportConfigBuilder()
        .setTitle(title.value)
        .includeChart(includeChart.value)
        .includeSummary(includeSummary.value)
        .setFormat(format.value);
  
      const config = builder.build();
      output.value = JSON.stringify(config, null, 2);
    } catch (e: any) {
      error.value = e.message ?? '설정 생성 실패';
    }
  };
  </script>
  
  <style scoped>
  .demo {
    margin-top: 10px;
    font-size: 11px;
  }
  .hint {
    margin: 0 0 6px;
    color: #6b7280;
  }
  .form {
    display: grid;
    gap: 6px;
    margin-bottom: 6px;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 10px;
  }
  .row {
    flex-direction: row;
    align-items: center;
    gap: 6px;
  }
  input,
  select {
    padding: 4px 6px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    font-size: 10px;
  }
  button {
    margin-top: 4px;
    padding: 6px 8px;
    border-radius: 10px;
    border: none;
    background: #2563eb;
    color: #fff;
    font-size: 10px;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.95;
  }
  .output {
    background: #111827;
    color: #e5e7eb;
    padding: 6px 8px;
    border-radius: 8px;
    font-size: 9px;
    overflow-x: auto;
  }
  .error {
    color: #dc2626;
    font-size: 10px;
  }
  </style>
  