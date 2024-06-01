import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { AuthenticationForm, Authentication, LoginApiResponse } from '../auth.interface';
import { AuthService } from '../auth.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { UsersService } from '../../users.service';
import { Users, db } from '../../index.db';
import { CommonService } from '../../common.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, ButtonModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<AuthenticationForm>

  constructor(private authService: AuthService, private authenticatedUserData: UsersService,
    private destroyRef: DestroyRef, public commonService: CommonService, private messageService: MessageService) { }

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
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async (res: LoginApiResponse) => {
          await db.resetDatabase()
          db.populate(res).then(() => {
            this.authenticatedUserData.user$.subscribe((userTableData: Users[]) => {

            })
          }, (c) => this.commonService.showError('Error', 'Internal Error'))
        }, (err) => {
          this.commonService.showError(err.error.errMsg, err.error?.data?.message)
        })
    }
    else {
      if (this.loginForm.controls.email?.errors) this.commonService.showError('Email', 'Either Empty or Invalid')
      if (this.loginForm.controls.password?.errors) this.commonService.showError('Password', 'Either Empty or Invalid')
    }
  }

}
