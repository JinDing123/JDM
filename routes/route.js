const routes = [
    {
        path: '/',
        component: () => import('pages/home/Home')
    },
    {
        path: '/product',
        component: () => import('pages/product/product-manage/Product')
    },
    {
        path: '/product/detail/:id',
        component: () => import('pages/product/product-manage/Product-Detail'),
        props: (route) => { 
            return {
                id: route.params.id
            };
        }
    },
    {
        path: '/product/edit/:id',
        component: () => import('pages/product/product-manage/Product-Edit'),
        props: (route) => { 
            return {
                id: route.params.id
            };
        }
    },
    {
        path: '/product/add',
        component: () => import('pages/product/product-manage/product-add')
    },
    {
        path: '/category',
        component: () => import('pages/product/category-manage/Category')
    },
    {
        path: '/category/children/:id',
        component: () => import('pages/product/category-manage/Category-Children'),
        props: (route) => {
            return {
                id: route.params.id
            };
        },
        
    },
    {
        path: '/order',
        component: () => import('pages/order/Order')
    },
    {
        path: '/order/detail/:id',
        props: (route) => {
            return {
                id: route.params.id
            };
        },
        component: () => import('pages/order/Order-detail')
    },
    {
        path: '/login',
        component: () => import('pages/login/Login')
    },
    {
        path: '/user',
        component: () => import('pages/user/User')
    },
];

export default routes;