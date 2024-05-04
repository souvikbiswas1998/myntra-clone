import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('../app/authentication/auth.routes').then(c => c.authRoutes)
    }
];
