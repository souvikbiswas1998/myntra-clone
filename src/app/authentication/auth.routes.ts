import { Routes } from '@angular/router';

export const authRoutes: Routes = [
    {
        path : 'sign-up',
        loadComponent: () => import('../authentication/sign-up/sign-up.component').then(c => c.SignUpComponent)
    },
    {
        path : 'login',
        loadComponent: () => import('../authentication/login/login.component').then(c => c.LoginComponent)
    },
    {
        path : 'reset-password',
        loadComponent: () => import('../authentication/reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
    }
];
