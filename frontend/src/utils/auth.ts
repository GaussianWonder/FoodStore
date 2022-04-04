export interface User {
  username: string;
  isAdmin: boolean;
  // ... not of interest
}

export type AuthResponse = User & {
  token: string;
}

class Auth {
  private jwt: string | null;
  private user: User | null;

  constructor() {
    this.jwt = null;
    this.user = null;

    // TODO serialize & deserialize cookies
  }

  set token(token: string) {
    this.jwt = token;
  }

  get token() {
    return this.jwt ?? '';
  }

  get isAuthenticated() {
    return !!this.jwt;
  }

  get userDetails() {
    return this.user;
  }

  set userDetails(user: User | null) {
    this.user = user;
  }

  get isAdmin() {
    return this.user?.isAdmin ?? false;
  }

  set fromResponse(response: AuthResponse) {
    this.token = response.token;
    this.userDetails = response;
  }
}

export default new Auth();
