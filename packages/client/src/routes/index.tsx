import React, { lazy } from 'react'
import Loading from '@/components/Loading'
import { t } from '@/i18n'

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
    title: t`view.home.title`
  },
  {
    path: '/character/:id',
    component: lazyLoader(() => import('@/views/Character')),
    title: t`view.character.title`
  },
  {
    path: '/photos',
    component: lazyLoader(() => import('@/views/Photos')),
    title: t`view.photos.title`
  },
  {
    path: '/admin',
    component: lazyLoader(() => import('@/views/Admin')),
    title: t`view.admin.title`,
    isPrivate: true
  },
  {
    path: '/admin/login',
    component: lazyLoader(() => import('@/views/Admin/Login')),
    title: t`view.login.title`
  },
  {
    path: '/admin/settings',

    component: lazyLoader(() => import('@/views/Admin/Settings')),
    title: t`view.settings.systemSettings`,
    isPrivate: true
  },
  {
    path: '/admin/password',
    component: lazyLoader(() => import('@/views/Admin/Password')),
    title: t`view.password.changePassword`,
    isPrivate: true
  },
  {
    path: '/admin/list',
    component: lazyLoader(() => import('@/views/Admin/List')),
    title: t`view.characterList.title`,
    isPrivate: true
  },
  {
    path: '/admin/create',
    component: lazyLoader(() => import('@/views/Admin/Create')),
    title: t`view.characterCreate.title`,
    isPrivate: true
  },
  {
    path: '/admin/edit/:id',
    component: lazyLoader(() => import('@/views/Admin/Edit')),
    title: t`view.characterEdit.title`,
    isPrivate: true
  },
  {
    path: '/admin/imgs',
    component: lazyLoader(() => import('@/views/Admin/Imgs')),
    title: t`view.imgs.imageUpload`,
    isPrivate: true
  },
  {
    path: '*',
    component: lazyLoader(() => import('@/views/404')),
    title: '404'
  }
]

export default routes
