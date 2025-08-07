// AuthService placeholder. Implement register, login, getUserById methods here.
export class AuthService {
  static async register(data: any) {
    // TODO: Implement registration logic
    return { user: { id: 1, ...data } };
  }
  static async login(data: any) {
    // TODO: Implement login logic
    return { token: 'fake-jwt-token', user: { id: 1, ...data } };
  }
  static async getUserById(id: number) {
    // TODO: Implement get user by id logic
    return { id, name: 'Test User' };
  }
}
