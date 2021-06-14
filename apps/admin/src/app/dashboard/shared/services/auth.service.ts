import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthService {
  get token() {
    return localStorage.getItem("token");
  }

  set token(value) {
    localStorage.setItem("token", value);
  }

  get isAuthenticated() {
    return !!this.token;
  }

  logout() {
    localStorage.removeItem("token");
  }

  getUserNameFromToken(): string {
    const decoded = this.parseToken();
    if (decoded) {
      return decoded["userName"];
    }
  }

  parseToken() {
    const token = this.token;
    if (!token) {
      return null;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
  }
}
