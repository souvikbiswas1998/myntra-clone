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
    private destroyRef: DestroyRef) { }

  ngOnInit(): void {
    this.setForm()
  }

  private setForm(): void {
    this.loginForm = new FormGroup<AuthenticationForm>({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(20),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
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
          })
        })
    }
    else {

    }
  }

}
