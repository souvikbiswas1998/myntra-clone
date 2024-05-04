import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { provideImgixLoader } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [provideImgixLoader("http://localhost:4200/assets/login-signup.webp"),]
})
export class AuthComponent {
}
