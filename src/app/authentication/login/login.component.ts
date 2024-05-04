import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Authentication } from '../auth.interface';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, FloatLabelModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  form!: FormGroup<Authentication>

  constructor() { }

  ngOnInit(): void {
    this.setForm()
    console.log(this.form.value);

  }

  private setForm():void {
    this.form = new FormGroup<Authentication>({
      email: new FormControl('a@gmail.com', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.minLength(8), Validators.maxLength(20),
      Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"),
      Validators.required]),
    })
  }
}
