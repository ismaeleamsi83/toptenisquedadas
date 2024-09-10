import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
    
    {
        path: '',
        loadComponent: () => import('./profile.component').then(m => m.ProfileComponent)
    },
    {
        path: 'data',
        loadComponent: () => import('./changedata/changedata.component').then(m => m.ChangedataComponent)
    },
    {
        path: 'pass',
        loadComponent: () => import('./changepass/changepass.component').then(m => m.ChangepassComponent)
    },
    {
        path: 'notifications',
        loadComponent: () => import('./notifications/notifications.component').then(m => m.NotificationsComponent)
    }
];