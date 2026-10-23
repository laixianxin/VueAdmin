import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '欢迎', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    alwaysShow: true,
    meta: { title: '客服', icon: 'el-icon-service' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '工单管理', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '客服分类', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: '/form/parameter',
    alwaysShow: true,
    meta: { title: 'APP 配置', icon: 'el-icon-setting' },
    children: [
      {
        path: 'parameter',
        name: 'ParameterConfiguration',
        component: () => import('@/views/parameter/index'),
        meta: { title: '参数配置', icon: 'el-icon-document' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    alwaysShow: true,
    name: 'Nested',
    meta: {
      title: '财务',
      icon: 'el-icon-money'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: '财务概览' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: '账单管理' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: '结算管理' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: '收支明细' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: '结算记录' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: '财务报表' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: '账户管理' }
      }
    ]
  },

  {
    path: '/affiliate',
    component: Layout,
    redirect: '/affiliate/index',
    alwaysShow: true,
    name: 'Affiliate',
    meta: { title: 'Affiliate 推广', icon: 'el-icon-s-promotion' },
    children: [
      {
        path: 'index',
        name: 'AffiliateCampaigns',
        component: () => import('@/views/table/index'),
        meta: { title: '推广管理', icon: 'table' }
      },
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: '推广文档', icon: 'link' }
      }
    ]
  },

  {
    path: '/system',
    component: Layout,
    redirect: '/system/index',
    alwaysShow: true,
    name: 'System',
    meta: { title: '系统设置', icon: 'el-icon-setting' },
    children: [
      {
        path: 'index',
        name: 'SystemSettings',
        component: () => import('@/views/form/index'),
        meta: { title: '基础设置', icon: 'form' }
      }
    ]
  },

  {
    path: '/statistics',
    component: Layout,
    redirect: '/statistics/index',
    alwaysShow: true,
    name: 'Statistics',
    meta: { title: '运营统计', icon: 'el-icon-s-data' },
    children: [
      {
        path: 'index',
        name: 'OperationStatistics',
        component: () => import('@/views/table/index'),
        meta: { title: '数据报表', icon: 'table' }
      }
    ]
  },

  {
    path: '/lines',
    component: Layout,
    redirect: '/lines/index',
    alwaysShow: true,
    name: 'Lines',
    meta: { title: '线路管理', icon: 'el-icon-share' },
    children: [
      {
        path: 'index',
        name: 'LineManagement',
        component: () => import('@/views/tree/index'),
        meta: { title: '线路列表', icon: 'tree' }
      }
    ]
  },

  {
    path: '/external-link',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
