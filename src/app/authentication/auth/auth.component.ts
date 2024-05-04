import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';
import { provideImgixLoader } from '@angular/common';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule, NgOptimizedImage],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [provideImgixLoader("http://localhost:4200/assets/login-signup.webp"),]
})
export class AuthComponent {
}
