import logger from '@kotori-bot/logger';
import app from './app';
import config from './config';

app.listen(config.port, () => {
  logger.info(`Server is running on port ${config.port}`);
});
