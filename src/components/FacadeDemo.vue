<template>
    <div class="demo">
      <h3>예시: 인증 & 프로필 Facade</h3>
      <p class="hint">
        여러 서비스(AuthService, UserService)를 <b>AppFacade</b>로 감싸
        로그인 + 프로필 조회를 한 번에 처리합니다.
      </p>
  
      <div v-if="!loggedIn" class="form">
        <input v-model="id" placeholder="아이디" />
        <input v-model="password" type="password" placeholder="비밀번호" />
        <button @click="handleLogin">로그인 & 프로필 로드</button>
        <p v-if="error" class="error">{{ error }}</p>
      </div>
  
      <div v-else class="profile">
        <div class="label">로그인 상태</div>
        <div class="name">{{ profile?.name }} ({{ profile?.id }})</div>
        <div class="role">role: {{ profile?.role }}</div>
        <button class="logout" @click="handleLogout">로그아웃</button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { AppFacade } from '../patterns/facade';
  
  const facade = new AppFacade();
  
  const id = ref('student01');
  const password = ref('1234');
  const profile = ref<ReturnType<AppFacade['loginAndLoadProfile']> | null>(null);
  const loggedIn = ref(false);
  const error = ref('');
  
  const handleLogin = () => {
    error.value = '';
    const result = facade.loginAndLoadProfile(id.value, password.value);
    if (!result) {
      error.value = '로그인 실패: 아이디/비밀번호를 확인해주세요.';
      loggedIn.value = false;
      profile.value = null;
      return;
    }
    profile.value = result;
    loggedIn.value = true;
  };
  
  const handleLogout = () => {
    facade.logout();
    loggedIn.value = false;
    profile.value = null;
  };
  </script>
  
  <style scoped>
  /* (여기 스타일 그대로 사용) */
  </style>
  