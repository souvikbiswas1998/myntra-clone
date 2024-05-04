import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('../app/authentication/auth.routes').then(c => c.authRoutes)
    }
];
