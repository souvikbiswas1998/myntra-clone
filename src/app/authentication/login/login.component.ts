import { Component, DestroyRef, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationForm, Authentication, LoginApiResponse } from '../auth.interface';
import { AuthService } from '../auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { db } from '../../index.db';
import { CommonService } from '../../common.service';
import { PasswordModule } from 'primeng/password';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, ButtonModule, FormsModule, ReactiveFormsModule, PasswordModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup<AuthenticationForm>

  constructor(private authService: AuthService, private destroyRef: DestroyRef, public commonService: CommonService) { }

  ngOnInit(): void {
    this.setForm()
  }

  private setForm(): void {
    this.loginForm = new FormGroup<AuthenticationForm>({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(20),
      Validators.required]),
    })
  }

  onSubmit(loginFormData: Authentication): void {
    if (this.loginForm.valid) {
      this.authService.loginWithEmailAndPassword((loginFormData.email as string), (loginFormData.password as string))
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
          next: async (res: LoginApiResponse) => {
            await db.resetDatabase()
            db.populate(res)
          },
          error: (err: { error: { errMsg: string; data: { message: string | undefined; }; }; }) => {
            this.commonService.errorToast(err.error.errMsg, err.error?.data?.message)

          },
          complete: () => {
            console.log('Observable completed');
          },
        })
    }
    else {
      if (!this.loginForm.get('email')?.value && !this.loginForm.get('password')?.value) {
        return this.commonService.errorToast('All Fields are required')
      }
      if (this.loginForm.controls.email?.errors) this.commonService.errorToast('Email', 'Either Empty or Invalid')
      if (this.loginForm.controls.password?.errors) this.commonService.errorToast('Password', 'Either Empty or Invalid')
    }
  }
}
