import type Router from 'koa-router';
import characterRouter from './character.router';
import configRouter from './config.router';

interface RouterConfig {
  path: string;
  router: Router;
}

function defineConfig(config: RouterConfig[]) {
  return config;
}

export default defineConfig([
  {
    path: '/config',
    router: configRouter
  },
  {
    path: '/character',
    router: characterRouter
  }
]);
