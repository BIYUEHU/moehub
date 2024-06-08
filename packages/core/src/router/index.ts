import Router from 'koa-router';
import routes from './routes';

const router = new Router({ prefix: '/api' }).get('/', () => {
  console.log('Hello World');
});

routes.forEach(({ path, router }) => {
  router.use(router.prefix(path).routes());
});

export default router;
