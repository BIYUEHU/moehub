import React, { lazy } from 'react'
import Loading from '@/components/Loading'

export interface RouteConfig {
  path: string
  component: JSX.Element
  title: string
  isPrivate?: boolean
}

// biome-ignore lint:
function lazyLoader(callback: () => Promise<any>) {
  // doc
  const Component = lazy(callback)
  return (
    <React.Suspense fallback={<Loading />}>
      <Component />
    </React.Suspense>
  )
}

const routes: RouteConfig[] = [
  {
    path: '/',
    component: lazyLoader(() => import('@/views/Home')),
    title: '首页'
  },
  {
    path: '/character/:id',
    component: lazyLoader(() => import('@/views/Character')),
    title: '角色详情'
  },
  {
    path: '/about',
    component: lazyLoader(() => import('@/views/About')),
    title: '关于'
  },
  {
    path: '/admin',
    component: lazyLoader(() => import('@/views/Admin')),
    title: '管理中心',
    isPrivate: true
  },
  {
    path: '/admin/login',
    component: lazyLoader(() => import('@/views/Admin/Login')),
    title: '后台登录'
  },
  {
    path: '/admin/settings',

    component: lazyLoader(() => import('@/views/Admin/Settings')),
    title: '系统设置',
    isPrivate: true
  },
  {
    path: '/admin/list',
    component: lazyLoader(() => import('@/views/Admin/List')),
    title: '角色列表',
    isPrivate: true
  },
  {
    path: '/admin/create',
    component: lazyLoader(() => import('@/views/Admin/Create')),
    title: '角色创建',
    isPrivate: true
  },
  {
    path: '/admin/edit/:id',
    component: lazyLoader(() => import('@/views/Admin/Edit')),
    title: '角色编辑',
    isPrivate: true
  }
]

export default routes
