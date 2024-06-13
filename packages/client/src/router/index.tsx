import React, { lazy } from 'react';
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

export default [
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
  }
];
