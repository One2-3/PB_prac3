// src/patterns/facade.ts

interface UserProfile {
    id: string;
    name: string;
    role: 'student' | 'admin';
  }
  
  class AuthService {
    private token: string | null = null;
  
    login(id: string, password: string): boolean {
      // 실제라면 서버 요청. 여기선 데모용 단순 로직.
      if (id && password) {
        this.token = 'fake-token-' + id;
        return true;
      }
      return false;
    }
  
    logout(): void {
      this.token = null;
    }
  
    isAuthenticated(): boolean {
      return this.token !== null;
    }
  
    getToken(): string | null {
      return this.token;
    }
  }
  
  class UserService {
    fetchProfile(token: string | null): UserProfile | null {
      if (!token) return null;
      // 데모용 더미 데이터
      return {
        id: '20250001',
        name: '홍길동',
        role: 'student',
      };
    }
  }
  
  // Facade
  export class AppFacade {
    private auth = new AuthService();
    private user = new UserService();
  
    loginAndLoadProfile(id: string, password: string): UserProfile | null {
      const ok = this.auth.login(id, password);
      if (!ok) return null;
      return this.user.fetchProfile(this.auth.getToken());
    }
  
    logout(): void {
      this.auth.logout();
    }
  
    isLoggedIn(): boolean {
      return this.auth.isAuthenticated();
    }
  }
  