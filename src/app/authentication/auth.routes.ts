import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';

export const authRoutes: Routes = [
    {
        path: '',
        component: AuthComponent, children: [
            {
                path: 'sign-up',
                loadComponent: () => import('../authentication/sign-up/sign-up.component').then(c => c.SignUpComponent)
            },
            {
                path: 'login',
                loadComponent: () => import('../authentication/login/login.component').then(c => c.LoginComponent)
            },
            {
                path: 'reset-password',
                loadComponent: () => import('../authentication/reset-password/reset-password.component').then(c => c.ResetPasswordComponent)
            }
        ]
    }

];
