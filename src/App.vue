<template>
  <div class="page">
    <header class="header">
      <div>
        <h1>디자인 패턴 실습 과제</h1>
        <p class="subtitle">Vue + TypeScript 기반 구현 데모 페이지</p>
      </div>
    </header>

    <main class="layout">
      <!-- 왼쪽: 카테고리 & 패턴 선택 -->
      <section class="sidebar">
        <div class="section-title">1. 패턴 카테고리 선택</div>
        <div class="tabs">
          <button
            v-for="c in categories"
            :key="c.value"
            class="tab"
            :class="{ active: selectedCategory === c.value }"
            @click="selectCategory(c.value)"
          >
            {{ c.label }}
          </button>
        </div>

        <div class="section-title with-caption">
          <span>2. 패턴 선택</span>
        </div>

        <div class="pattern-list">
          <button
            v-for="pattern in filteredPatterns"
            :key="pattern.id"
            class="pattern-item"
            :class="{ active: selectedPattern?.id === pattern.id }"
            @click="selectPattern(pattern)"
          >
            <div class="pattern-name">{{ pattern.name }}</div>
            <div class="pattern-desc">{{ pattern.brief }}</div>
          </button>
        </div>
      </section>

      <!-- 오른쪽: 상세 + Demo -->
      <section class="content">
        <div v-if="selectedPattern" class="card">
          <div class="pill">
            {{ selectedPattern.category }} Pattern
          </div>
          <h2>{{ selectedPattern.name }}</h2>
          <p class="content-desc">
            {{ selectedPattern.description }}
          </p>

          <ul class="content-list">
            <li v-for="(item, idx) in selectedPattern.highlights" :key="idx">
              {{ item }}
            </li>
          </ul>

          <div class="code-box">
            <div class="code-header">
              <span>핵심 아이디어 (요약 코드)</span>
            </div>
            <pre class="code"><code>{{ selectedPattern.sample }}</code></pre>
          </div>

          <div class="demo-box">
            <h3>실행 예제 (Vue + TypeScript)</h3>
            <BuilderDemo v-if="selectedPattern.id === 'builder'" />
            <FacadeDemo v-else-if="selectedPattern.id === 'facade'" />
            <StrategyDemo v-else-if="selectedPattern.id === 'strategy'" />
          </div>
        </div>

        <div v-else class="card empty-state">
          <h2>패턴을 선택해주세요</h2>
          <p>
            왼쪽에서 생성 / 구조 / 행위 패턴 각각 하나씩 선택하고,
            아래 Demo 코드와 함께 제출하면 됩니다.
          </p>
        </div>

        <div class="note-card">
          <h3>제출 체크리스트</h3>
          <ul>
            <li>생성 패턴: Builder</li>
            <li>구조 패턴: Facade</li>
            <li>행위 패턴: Strategy</li>
            <li>Vue + TypeScript 사용</li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import BuilderDemo from './components/BuilderDemo.vue';
import FacadeDemo from './components/FacadeDemo.vue';
import StrategyDemo from './components/StrategyDemo.vue';

type PatternCategory = 'Creational' | 'Structural' | 'Behavioral';

interface Pattern {
  id: 'builder' | 'facade' | 'strategy';
  name: string;
  category: PatternCategory;
  brief: string;
  description: string;
  highlights: string[];
  sample: string;
}

const patterns: Pattern[] = [
  {
    id: 'builder',
    name: 'Builder',
    category: 'Creational',
    brief: '복잡한 객체를 단계적으로 생성하는 생성 패턴.',
    description:
      '생성자에 인자를 잔뜩 넣는 대신, 의미 있는 메서드 체이닝으로 설정값을 쌓아가며 객체를 생성합니다.',
    highlights: [
      '필수/옵션 값 명확하게 구분 가능',
      '가독성 좋은 객체 생성 방식 제공',
      '리포트 설정, 요청 옵션 등 구성 객체에 적합',
    ],
    sample: `const config = new ReportConfigBuilder()
  .setTitle("주간 리포트")
  .includeChart(true)
  .setFormat("pdf")
  .build();`,
  },
  {
    id: 'facade',
    name: 'Facade',
    category: 'Structural',
    brief: '복잡한 서브시스템을 단순한 인터페이스로 감싸는 구조 패턴.',
    description:
      '로그인, 프로필 조회처럼 여러 서비스가 섞인 기능을 Facade 클래스로 묶어, 클라이언트는 단순한 메서드만 호출하도록 만듭니다.',
    highlights: [
      '클라이언트 코드에서 불필요한 의존성 제거',
      '백엔드/라이브러리 교체 시 영향 최소화',
      '인증, 결제, 외부 API 래핑 등에 자주 사용',
    ],
    sample: `const app = new AppFacade();
const profile = app.loginAndLoadProfile("id", "pw");`,
  },
  {
    id: 'strategy',
    name: 'Strategy',
    category: 'Behavioral',
    brief: '알고리즘을 캡슐화하고 교체 가능하게 만드는 행위 패턴.',
    description:
      '여러 할인/정책/계산 방법을 if-else 대신 별도 전략 클래스로 분리해, 런타임에 손쉽게 교체할 수 있습니다.',
    highlights: [
      '조건문 난립 방지',
      '새 전략 추가 시 기존 코드 수정 최소화',
      '요금제, 할인 정책, 정렬/검색 방식 등에 활용',
    ],
    sample: `const calc = new PriceCalculator(new StudentDiscount());
const total = calc.getTotal(10000); // 8000`,
  },
];

const categories = [
  { label: '생성 패턴 (Creational)', value: 'Creational' as PatternCategory },
  { label: '구조 패턴 (Structural)', value: 'Structural' as PatternCategory },
  { label: '행위 패턴 (Behavioral)', value: 'Behavioral' as PatternCategory },
];

const selectedCategory = ref<PatternCategory>('Creational');
const selectedPattern = ref<Pattern | null>(patterns[0]); // 기본 Builder 선택

const filteredPatterns = computed(() =>
  patterns.filter((p) => p.category === selectedCategory.value),
);

function selectCategory(category: PatternCategory) {
  selectedCategory.value = category;
  selectedPattern.value = filteredPatterns.value[0] ?? null;
}

function selectPattern(pattern: Pattern) {
  selectedPattern.value = pattern;
}
</script>

<style scoped>
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px 40px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 16px;
  margin-bottom: 24px;
}

.header h1 {
  margin: 0;
  font-size: 28px;
  font-weight: 700;
}

.subtitle {
  margin: 4px 0 0;
  font-size: 14px;
  color: var(--text-sub);
}

.tag {
  padding: 6px 14px;
  border-radius: 999px;
  background: var(--primary-soft);
  color: var(--primary);
  font-size: 12px;
  font-weight: 600;
}

.layout {
  display: grid;
  grid-template-columns: 320px minmax(0, 1fr);
  gap: 20px;
}

.sidebar {
  padding: 18px 16px 16px;
  background: rgba(255, 255, 255, 0.92);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border-soft);
  backdrop-filter: blur(10px);
}

.section-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 8px;
}

.section-title.with-caption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
}

.caption {
  font-size: 10px;
  color: var(--text-sub);
}

.tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.tab {
  flex: 1;
  padding: 8px 6px;
  font-size: 11px;
  border-radius: 999px;
  border: 1px solid transparent;
  background: #f3f4ff;
  color: #6b7280;
  cursor: pointer;
  transition: all 0.18s ease;
  white-space: nowrap;
}

.tab.active {
  background: var(--primary-soft);
  border-color: var(--primary);
  color: #111827; /* 선택된 탭 글자 검정색 */
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.15);
}

.tab:hover:not(.active) {
  background: #e5e7ff;
}

.pattern-list {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.pattern-item {
  width: 100%;
  text-align: left;
  padding: 9px 10px;
  border-radius: 14px;
  border: 1px solid transparent;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.16s ease;
}

.pattern-item:hover {
  background: #eff6ff;
  transform: translateY(-1px);
}

.pattern-item.active {
  background: #dbeafe;
  border-color: var(--primary);
  box-shadow: 0 6px 14px rgba(37, 99, 235, 0.22);
}

.pattern-item.active .pattern-name,
.pattern-item.active .pattern-desc {
  color: #111827; /* 선택된 패턴 글자도 검정 */
}

.pattern-name {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-main);
  margin-bottom: 2px;
}

.pattern-desc {
  font-size: 10px;
  color: var(--text-sub);
  line-height: 1.4;
}

/* 오른쪽 영역 */

.content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.card {
  padding: 18px 18px 16px;
  background: var(--bg-elevated);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--border-soft);
}

.pill {
  display: inline-flex;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 10px;
  background: var(--primary-soft);
  color: var(--primary);
  margin-bottom: 6px;
}

.card h2 {
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 600;
}

.content-desc {
  margin: 0 0 8px;
  font-size: 13px;
  color: var(--text-sub);
}

.content-list {
  margin: 0 0 10px 14px;
  padding: 0;
  font-size: 12px;
  color: var(--text-main);
}

.content-list li {
  margin-bottom: 2px;
}

.code-box {
  margin-top: 4px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  overflow: hidden;
}

.code-header {
  padding: 6px 10px;
  font-size: 10px;
  color: var(--text-sub);
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
}

.code {
  margin: 0;
  padding: 8px 10px 10px;
  font-size: 10px;
  font-family: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Monaco,
    Consolas, "Liberation Mono", "Courier New", monospace;
  white-space: pre-wrap;
  line-height: 1.5;
}

.demo-box {
  margin-top: 12px;
  padding: 10px 10px 8px;
  border-radius: 14px;
  border: 1px solid #e5e7eb;
  background: #f9fafb;
}

.demo-box h3 {
  margin: 0 0 4px;
  font-size: 13px;
  font-weight: 600;
  color: var(--text-main);
}

.empty-state h2 {
  font-size: 18px;
  margin-bottom: 4px;
}

.empty-state p {
  font-size: 13px;
  color: var(--text-sub);
}

.note-card {
  padding: 12px 14px;
  font-size: 11px;
  background: #eff6ff;
  border-radius: 14px;
  border: 1px solid #dbeafe;
  color: #1d4ed8;
}

.note-card h3 {
  margin: 0 0 4px;
  font-size: 12px;
  font-weight: 600;
}

.note-card ul {
  margin: 0 0 0 14px;
  padding: 0;
}

.note-card li {
  margin-bottom: 2px;
}

@media (max-width: 820px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
