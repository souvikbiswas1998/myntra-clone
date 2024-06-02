import { Component, DestroyRef } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Authentication, AuthenticationForm, LoginApiResponse } from '../auth.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { CommonService } from '../../common.service';
import { db, Users } from '../../index.db';
import { UsersService } from '../../users.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, ButtonModule, FormsModule, ReactiveFormsModule],
  providers: [AuthService],

  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signUpForm!: FormGroup<AuthenticationForm>

  constructor(private authService: AuthService, private authenticatedUserData: UsersService,
    private destroyRef: DestroyRef, public commonService: CommonService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.setForm()
  }

  private setForm(): void {
    this.signUpForm = new FormGroup<AuthenticationForm>({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.email, Validators.required]),
      phoneNumber: new FormControl(null, [Validators.minLength(10), Validators.maxLength(10), Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(20),
      Validators.required]),
    })
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      console.log('valid', this.signUpForm.value);
      this.signUpForm.reset()

      // this.authService.loginWithEmailAndPassword((signUpFormData.email as string), (signUpFormData.password as string))
      //   .pipe(takeUntilDestroyed(this.destroyRef)).subscribe(async (res: LoginApiResponse) => {
      //     await db.resetDatabase()
      //     db.populate(res).then(() => {
      //       this.authenticatedUserData.user$.subscribe((userTableData: Users[]) => {

      //       })
      //     }, (c) => this.commonService.showError('Error', 'Internal Error'))
      //   }, (err) => {
      //     this.commonService.showError(err.error.errMsg, err.error?.data?.message)
      //   })
    }
    else {
      let data = this.signUpForm.controls
      console.log('invalid', this.signUpForm.value);

      if (data.email?.errors) this.commonService.showError('Email', 'Either Empty or Invalid')
      if (data.password?.errors) this.commonService.showError('Password', 'Either Empty or Invalid')
    }
  }
}
