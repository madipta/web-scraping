import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { AuthService } from "../dashboard/shared/services/auth.service";
import { UserService } from "../dashboard/shared/services/user.service";

@Component({
  selector: "web-scraping-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent {
  @ViewChild("txtUsername") txtUsername: ElementRef;
  @ViewChild("txtPassword") txtPassword: ElementRef;
  error$ = new Subject<string>();

  constructor(
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  async login(ev: UIEvent) {
    ev.preventDefault();
    const val = {
      userName: this.txtUsername.nativeElement["value"],
      password: this.txtPassword.nativeElement["value"],
    };
    if (!val || !val.userName) {
      return;
    }
    const res = await this.userService.login(val);
    if (!res.ok) {
      this.error$.next(res.error);
    } else {
      this.authService.token = res.token;
      this.router.navigate(["/dashboard"]);
    }
  }
}
