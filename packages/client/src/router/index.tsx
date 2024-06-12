import React, { lazy } from 'react';

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
function lazyLoader(callback: () => Promise<any>) {
  const Component = lazy(callback);
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
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
    path: '/about',
    element: lazyLoader(() => import('../views/About'))
  }
];
