import layoutHeaderAside from '@/layout/header-aside'

// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = require('@/libs/util.import.' + process.env.NODE_ENV)

/**
 * 在主框架内显示
 */
const frameIn = [
  {
    path: '/',
    redirect: { name: 'index' },
    component: layoutHeaderAside,
    children: [
      // 首页
      {
        path: 'index',
        name: 'index',
        meta: {
          auth: true
        },
        component: _import('system/index')
      },
      // 页面
      {
        path: 'medicine/page1',
        name: 'medicinePage1',
        meta: {
          title: '查看库存',
          auth: true
        },
        component: _import('medicine/page1')
      },
      {
        path: 'medicine/page2',
        name: 'medicinePage2',
        meta: {
          title: '统计总表',
          auth: true
        },
        component: _import('medicine/page2')
      },
      {
        path: 'medicine/page3',
        name: 'medicinePage3',
        meta: {
          title: '新增新药',
          auth: true
        },
        component: _import('medicine/page3')
      },
      {
        path: 'medicine/page4',
        name: 'medicinePage4',
        meta: {
          title: '确认发药',
          auth: true
        },
        component: _import('medicine/page4')
      },
      {
        path: 'record/page1',
        name: 'recordPage1',
        meta: {
          title: '查看病历',
          auth: true
        },
        component: _import('record/page1')
      },
      {
        path: 'record/page2',
        name: 'recordPage2',
        meta: {
          title: '添加病历',
          auth: true
        },
        component: _import('record/page2')
      },
      {
        path: 'record/page3',
        name: 'recordPage3',
        meta: {
          title: '模板管理',
          auth: true
        },
        component: _import('record/page3')
      },
      {
        path: 'prescription/page1',
        name: 'prescriptionPage1',
        meta: {
          title: '查看处方',
          auth: true
        },
        component: _import('prescription/page1')
      },
      {
        path: 'prescription/page2',
        name: 'prescriptionPage2',
        meta: {
          title: '添加处方',
          auth: true
        },
        component: _import('prescription/page2')
      },
      {
        path: 'prescription/page3',
        name: 'prescriptionPage3',
        meta: {
          title: '添加处方',
          auth: true
        },
        component: _import('prescription/page3')
      },
      // 系统 前端日志
      {
        path: 'log',
        name: 'log',
        meta: {
          title: '前端日志',
          auth: true
        },
        component: _import('system/log')
      },
      // 刷新页面 必须保留
      {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: _import('system/function/refresh')
      },
      // 页面重定向 必须保留
      {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: _import('system/function/redirect')
      }
    ]
  }
]

/**
 * 在主框架之外显示
 */
const frameOut = [
  // 登录
  {
    path: '/login',
    name: 'login',
    component: _import('system/login')
  }
]

/**
 * 错误页面
 */
const errorPage = [
  {
    path: '*',
    name: '404',
    component: _import('system/error/404')
  }
]

// 导出需要显示菜单的
export const frameInRoutes = frameIn

// 重新组织后导出
export default [
  ...frameIn,
  ...frameOut,
  ...errorPage
]
