import React, { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loading from '../components/loading';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function lazyLoader(callback: () => Promise<any>) {
  const Component = lazy(callback);
  return (
    <React.Suspense fallback={<Loading />}>
      <Component />
    </React.Suspense>
  );
}

const Routes: Parameters<typeof useRoutes>[0] = [
  {
    path: '/',
    element: lazyLoader(() => import('../views/Home'))
  },
  {
    path: '/character/:id',
    element: lazyLoader(() => import('../views/Character'))
  },
  {
    path: '/about',
    element: lazyLoader(() => import('../views/About'))
  },
  {
    path: '/admin',
    children: [
      {
        path: '/admin',
        element: lazyLoader(() => import('../views/Admin'))
      },
      {
        path: '/admin/login',
        element: lazyLoader(() => import('../views/Admin/Login'))
      },
      {
        path: '/admin/create',
        element: lazyLoader(() => import('../views/Admin/Create'))
      },
      {
        path: '/admin/edit/:id',
        element: lazyLoader(() => import('../views/Admin/Edit'))
      }
    ]
  }
];

export default Routes;
