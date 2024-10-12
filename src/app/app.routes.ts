import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'pages',
        loadComponent: () => import('./page/page.component'),
        children:[
            {
                path: 'singUp',
                title: 'SingUp',
                loadComponent: () => import('./page/singup/singup.component')
            },
            {
                path: 'login',
                title: 'Login',
                loadComponent: () => import('./page/login/login.component')
            },
            {
                path: 'home',
                title: 'Home',
                loadComponent: () => import('./page/inicio/inicio.component')
            },
            {
                path: '',
                redirectTo: 'pages/home',
                pathMatch: 'full'            
            }
        ]
    },
    {
        path: '',
        redirectTo: '/pages',
        pathMatch: 'full'
    }
];
