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
                path: 'inicio',
                title: 'Inicio',
                loadComponent: () => import('./page/inicio/inicio.component')
            },
            {
                path: 'producCategory/:nombre',
                title: 'Producto x Categoria',
                loadComponent: () => import('./page/productox-categoria/productox-categoria.component')
            },
            {
                path: 'detallePro/:id',
                title: 'Producto x Categoria',
                loadComponent: () => import('./page/producto-detalles/producto-detalles.component')
            },
            {
                path: 'carrito',
                title: 'Carrito',
                loadComponent: () => import('./page/carrito/carrito.component')
            },
            {
                path: 'comprar',
                title: 'comprar',
                loadComponent: () => import('./page/detalle-compra/detalle-compra.component')
            },
            {
                path: 'response',
                title: 'response',
                loadComponent: () => import('./page/response/response.component')
            },
            {
                path: 'perfil',
                title: 'perfil',
                loadComponent: () => import('./page/perfil/perfil.component'),
            },
            {
                path: 'misCompras',
                title: 'Mis Compras',
                loadComponent: () => import('./page/mis-compras/mis-compras.component'),
            },
            {
                path: 'detalleOrden/:id',
                title: 'Detalle Orden',
                loadComponent: () => import('./page/detalle-orden/detalle-orden.component')
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
                    path: 'transacciones',
                    title: 'Transacciones',
                    loadComponent: () => import('./page/admin/transacciones/transacciones.component')
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
                        },
                        {
                            path: 'updateUser/:id',
                            title: 'Update User',
                            loadComponent: () => import('./page/admin/formulario/update-user/update-user.component')
                        },
                        {
                            path: 'updateProducto/:Pid',
                            title: 'Update Producto',
                            loadComponent: () => import('./page/admin/formulario/update-producto/update-producto.component')
                        },
                        {
                            path: 'updateCategoria/:Cid',
                            title: 'Update Categoriar',
                            loadComponent: () => import('./page/admin/formulario/update-categoria/update-categoria.component')
                        }
                    ]
                  },
                  {
                    path: 'tablas',
                    title: 'Tablas',
                    loadComponent:() => import('./page/admin/tablas/tablas.component'),
                    children:[
                        {
                            path: 'userlist',
                            title: 'Lista de Usuarios',
                            loadComponent: () => import('./page/admin/tablas/userlist/userlist.component')
                        },
                        {
                            path: 'productolist',
                            title: 'Lista de Usuarios',
                            loadComponent: () => import('./page/admin/tablas/productolist/productolist.component')
                        },
                        {
                            path: 'categorialist',
                            title: 'Lista de Usuarios',
                            loadComponent: () => import('./page/admin/tablas/categorialist/categorialist.component')
                        }
                    ]
                  }
                ]
            },
            {
                path: '',
                redirectTo: 'pages/inicio',
                pathMatch: 'full'            
            }
        ]
    },
    {
        path: '',
        redirectTo: '/pages/inicio',
        pathMatch: 'full'
    }
];
