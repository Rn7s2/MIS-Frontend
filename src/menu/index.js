import { uniqueId } from 'lodash'

/**
 * @description 给菜单数据补充上 path 字段
 * @description https://github.com/d2-projects/d2-admin/issues/209
 * @param {Array} menu 原始的菜单数据
 */
function supplementPath (menu) {
  return menu.map(e => ({
    ...e,
    path: e.path || uniqueId('d2-menu-empty-'),
    ...e.children ? {
      children: supplementPath(e.children)
    } : {}
  }))
}

export const menuHeader = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '库存管理',
    icon: 'folder-o',
    children: [
      { path: '/medicine/page1', title: '查看库存' },
      { path: '/medicine/page2', title: '统计总表' },
      { path: '/medicine/page3', title: '新增新药' },
      { path: '/medicine/page4', title: '确认发药' }
    ]
  },
  {
    title: '病历管理',
    icon: 'folder-o',
    children: [
      { path: '/record/page1', title: '查看病历' },
      { path: '/record/page2', title: '添加病历' },
      { path: '/record/page3', title: '模板管理' }
    ]
  },
  {
    title: '处方管理',
    icon: 'folder-o',
    children: [
      { path: '/prescription/page1', title: '查看处方' },
      { path: '/prescription/page2', title: '添加处方' }
    ]
  }
])

export const menuAside = supplementPath([
  { path: '/index', title: '首页', icon: 'home' },
  {
    title: '库存管理',
    icon: 'folder-o',
    children: [
      { path: '/medicine/page1', title: '查看库存' },
      { path: '/medicine/page2', title: '统计总表' },
      { path: '/medicine/page3', title: '新增新药' },
      { path: '/medicine/page4', title: '确认发药' }
    ]
  },
  {
    title: '病历管理',
    icon: 'folder-o',
    children: [
      { path: '/record/page1', title: '查看病历' },
      { path: '/record/page2', title: '添加病历' },
      { path: '/record/page3', title: '模板管理' }
    ]
  },
  {
    title: '处方管理',
    icon: 'folder-o',
    children: [
      { path: '/prescription/page1', title: '查看处方' },
      { path: '/prescription/page2', title: '添加处方' }
    ]
  }
])
