
import { User, BiddingRequest } from '../types';
import { mockBiddingRequests } from '../data/mockData';

const KEYS = {
  USERS: 'jb_users',
  CURRENT_USER: 'jb_current_user',
  BIDDING_REQUESTS: 'jb_bidding_requests'
};

/**
 * dbService는 향후 Supabase 클라이언트로 교체하기 용이하도록
 * 모든 메서드를 비동기(Promise)로 처리합니다.
 */
export const dbService = {
  init: async () => {
    if (!localStorage.getItem(KEYS.USERS)) {
      localStorage.setItem(KEYS.USERS, JSON.stringify([]));
    }
    if (!localStorage.getItem(KEYS.BIDDING_REQUESTS)) {
      localStorage.setItem(KEYS.BIDDING_REQUESTS, JSON.stringify(mockBiddingRequests));
    }
    return Promise.resolve();
  },

  // 유저 관리 (Supabase auth.users 시뮬레이션)
  getUsers: async (): Promise<User[]> => {
    return Promise.resolve(JSON.parse(localStorage.getItem(KEYS.USERS) || '[]'));
  },

  saveUser: async (user: User): Promise<{ data: User | null; error: any }> => {
    try {
      const users = await dbService.getUsers();
      users.push(user);
      localStorage.setItem(KEYS.USERS, JSON.stringify(users));
      return { data: user, error: null };
    } catch (e) {
      return { data: null, error: e };
    }
  },

  updateUser: async (updatedUser: User): Promise<{ data: User | null; error: any }> => {
    try {
      const users = await dbService.getUsers();
      const index = users.findIndex(u => u.id === updatedUser.id);
      if (index !== -1) {
        users[index] = updatedUser;
        localStorage.setItem(KEYS.USERS, JSON.stringify(users));
        
        const currentUser = dbService.getCurrentUser();
        if (currentUser && currentUser.id === updatedUser.id) {
          localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(updatedUser));
        }
        window.dispatchEvent(new Event('jb_points_updated'));
        return { data: updatedUser, error: null };
      }
      throw new Error("User not found");
    } catch (e) {
      return { data: null, error: e };
    }
  },

  addPoints: async (userId: string, amount: number) => {
    const users = await dbService.getUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      user.points += amount;
      await dbService.updateUser(user);
    }
    return Promise.resolve();
  },

  deductPoints: async (userId: string, amount: number): Promise<boolean> => {
    const users = await dbService.getUsers();
    const user = users.find(u => u.id === userId);
    if (user && user.points >= amount) {
      user.points -= amount;
      await dbService.updateUser(user);
      return Promise.resolve(true);
    }
    return Promise.resolve(false);
  },

  // 인증 (Supabase auth.signInWithPassword 시뮬레이션)
  login: async (email: string, pass: string): Promise<User | null> => {
    const users = await dbService.getUsers();
    const user = users.find(u => u.email === email && u.password === pass);
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
      window.dispatchEvent(new Event('jb_auth_changed'));
      window.dispatchEvent(new Event('jb_points_updated'));
      return Promise.resolve(user);
    }
    return Promise.resolve(null);
  },

  logout: () => {
    localStorage.removeItem(KEYS.CURRENT_USER);
    window.dispatchEvent(new Event('jb_auth_changed'));
    window.dispatchEvent(new Event('jb_points_updated'));
  },

  getCurrentUser: (): User | null => {
    const user = localStorage.getItem(KEYS.CURRENT_USER);
    return user ? JSON.parse(user) : null;
  }
};
