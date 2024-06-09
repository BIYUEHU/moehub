import createApplication from './app';
import config from './config';

const app = createApplication();

app.listen(config.port, () => {
  app.logger.info(`Server is running on port ${config.port}`);
});
