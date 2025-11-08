<!-- src/components/StrategyDemo.vue -->
<template>
    <div class="demo">
      <h3>예시: 할인 전략 Strategy</h3>
      <p class="hint">
        같은 가격에 다른 <b>전략</b>을 적용해 최종 금액을 계산합니다.
      </p>
  
      <div class="row">
        <label>
          상품 금액 (₩)
          <input v-model.number="basePrice" type="number" min="0" />
        </label>
      </div>
  
      <div class="strategies">
        <label v-for="s in strategies" :key="s.key" class="strategy">
          <input
            type="radio"
            name="discount"
            :value="s.key"
            v-model="selectedKey"
          />
          {{ s.label }}
        </label>
      </div>
  
      <div class="result">
        <div class="label">선택된 전략</div>
        <div class="value">{{ currentLabel }}</div>
        <div class="label">최종 금액</div>
        <div class="total">₩ {{ formattedTotal }}</div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { computed, reactive, ref, watch } from 'vue';
  import {
    NoDiscount,
    StudentDiscount,
    BlackFridayDiscount,
    PriceCalculator,
  } from '../patterns/strategy';
  
  const basePrice = ref(10000);
  const selectedKey = ref<'none' | 'student' | 'bf'>('none');
  
  const strategies = [
    { key: 'none' as const, label: '기본가 (할인 없음)', instance: new NoDiscount() },
    { key: 'student' as const, label: '학생 할인 20%', instance: new StudentDiscount() },
    { key: 'bf' as const, label: '블랙프라이데이 40%', instance: new BlackFridayDiscount() },
  ];
  
  const calculator = reactive(new PriceCalculator(strategies[0].instance));
  
  watch(selectedKey, (key) => {
    const found = strategies.find((s) => s.key === key);
    if (found) calculator.setStrategy(found.instance);
  });
  
  const currentLabel = computed(() => {
    const found = strategies.find((s) => s.key === selectedKey.value);
    return found?.label ?? '';
  });
  
  const formattedTotal = computed(() => {
    const total = calculator.getTotal(basePrice.value || 0);
    return total.toLocaleString();
  });
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
  .row {
    margin-bottom: 6px;
  }
  label {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 10px;
  }
  input[type='number'] {
    padding: 4px 6px;
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    font-size: 10px;
  }
  .strategies {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 4px 0 6px;
  }
  .strategy {
    flex-direction: row;
    align-items: center;
    gap: 4px;
    padding: 4px 6px;
    border-radius: 999px;
    border: 1px solid #e5e7eb;
    background: #f9fafb;
  }
  .result {
    padding: 6px 8px;
    border-radius: 10px;
    background: #eff6ff;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2px 8px;
    max-width: 260px;
  }
  .label {
    font-size: 9px;
    color: #6b7280;
  }
  .value,
  .total {
    font-size: 11px;
    font-weight: 600;
  }
  </style>
  