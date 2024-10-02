import { Routes } from '@angular/router';

export const profileRoutes: Routes = [
    
    {
        path: ':name',
        loadComponent: () => import('./profile.component').then(m => m.ProfileComponent)
    },
    {
        path: ':name/edit',
        loadComponent: () => import('./editprofile/editprofile.component').then(m => m.EditprofileComponent)
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