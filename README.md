# 디자인 패턴 실습 과제

Vue 3 + TypeScript 기반으로 **생성 / 구조 / 행위 패턴**을 각각 1개씩 구현한 데모 프로젝트입니다.
과제용 설명 페이지 + 각 패턴에 대한 간단한 인터랙티브 예제를 포함합니다.

---

## 1. 기술 스택

* Vue 3
* TypeScript (`<script setup lang="ts">`)
* (프로젝트 생성: Vue CLI + TypeScript 플러그인 기준)

---

## 2. 실행 방법

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm run serve

# 브라우저에서 안내된 로컬 주소 접속
# (예: http://localhost:8080)
```

---

## 3. 폴더 구조

```text
src/
  App.vue               # 메인 페이지 (UI + 패턴 설명 + 데모 연결)
  main.ts               # 엔트리 포인트
  style.css             # 전역 스타일
  components/
    BuilderDemo.vue     # Builder 패턴 데모
    FacadeDemo.vue      # Facade 패턴 데모
    StrategyDemo.vue    # Strategy 패턴 데모
  patterns/
    builder.ts          # Builder 패턴 핵심 로직
    facade.ts           # Facade 패턴 핵심 로직
    strategy.ts         # Strategy 패턴 핵심 로직
```

---

## 4. 구현한 디자인 패턴

### 4.1 생성 패턴: Builder

**파일**: `patterns/builder.ts`, `components/BuilderDemo.vue`

* 복잡한 리포트 설정 객체를 단계적으로 구성하는 `ReportConfigBuilder` 구현.
* 메서드 체이닝으로 옵션을 쌓은 뒤 `build()`로 최종 설정 생성.
* 목적: 생성자 인자 난잡함 감소, 가독성 향상.

---

### 4.2 구조 패턴: Facade

**파일**: `patterns/facade.ts`, `components/FacadeDemo.vue`

* `AuthService`, `UserService`를 숨기고 `AppFacade`에서
  `loginAndLoadProfile(id, pw)` 한 메서드로 로그인 + 프로필 조회 처리.
* 클라이언트는 내부 서비스 호출 순서를 알 필요 없이 Facade만 사용.
* 목적: 복잡한 서브시스템에 대한 단순화된 인터페이스 제공.

---

### 4.3 행위 패턴: Strategy

**파일**: `patterns/strategy.ts`, `components/StrategyDemo.vue`

* `DiscountStrategy` 인터페이스와
  `NoDiscount`, `StudentDiscount`, `BlackFridayDiscount` 전략 클래스 구현.
* `PriceCalculator`에 전략을 주입하여 같은 금액에 다른 할인 정책 적용.
* 목적: 할인/정책 로직을 교체 가능하게 분리하고, 조건문 분기를 제거.

---

## 5. 페이지 구성 특징

* 좌측:

  * 패턴 종류(생성/구조/행위) 탭
  * 각 분류별 선택된 1개 패턴 버튼 (Builder / Facade / Strategy)
* 우측:

  * 선택한 패턴의 개념 설명, 핵심 포인트, 간단한 코드 스니펫
  * 실제 동작하는 Vue + TypeScript 데모 컴포넌트
* 선택된 탭/버튼은 배경과 테두리로 강조되며, 텍스트는 검정색으로 가독성 유지.

