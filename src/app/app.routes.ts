import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: 'profile',
        loadChildren: () => import('./profile/profile.routes').then(m => m.profileRoutes)
    },
    {
        path: 'players',
        loadChildren: () => import('./pages/players/players.routes').then(m => m.playersRoutes)
    },
    {
        path: 'messages',
        loadChildren: () => import('./pages/messages/messages.routes').then(m => m.messagesRoutes)
    },
    {
        path: '**',
        redirectTo: ''
    },
];
