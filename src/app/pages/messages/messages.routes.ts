import { Routes } from '@angular/router';

export const messagesRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./messages.component').then(m => m.MessagesComponent)
    },
    {
        path: ':msgplayer',
        loadComponent: () => import('./playermessage/playermessage.component').then(m => m.PlayermessageComponent)
    }
]