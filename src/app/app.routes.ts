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
                path:'admin',
                title: 'Admin',
                loadComponent: () => import('./page/admin/admin.component'),
                children:[
                  {
                    path: 'inicio-admin',
                    title: 'Incio Admin',
                    loadComponent: () => import('./page/admin/inicio-admin/inicio-admin.component')
                  },
                  {
                    path: 'formulario',
                    title: 'Formulario',
                    loadComponent: () => import('./page/admin/formulario/formulario.component'),
                    children:[
                        {
                            path: 'crear-product',
                            title: 'Crear Producto',
                            loadComponent: () => import('./page/admin/formulario/crear-producto/crear-producto.component')
                        },
                        {
                            path: 'crear-categoria',
                            title: 'Crear Categoria',
                            loadComponent: () => import('./page/admin/formulario/crear-categoria/crear-categoria.component')
                        },
                        {
                            path: 'crear-user',
                            title: 'Crear User',
                            loadComponent: () => import('./page/admin/formulario/crear-user/crear-user.component')
                        }
                    ]
                  },
                  {
                    path: 'tablas',
                    title: 'Tablas',
                    loadComponent:() => import('./page/admin/tablas/tablas.component')
                  }
                ]
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
        redirectTo: '/pages/home',
        pathMatch: 'full'
    }
];
