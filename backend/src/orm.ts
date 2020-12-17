import { Sequelize } from 'sequelize-typescript';
import { logger } from './logger';
import config from 'config';

const sequelize = new Sequelize({
    logging: logger.debug,
    dialect: 'sqlite',
    storage: config.get('storage.dbPath'),
    models: [__dirname + '/models']
});

sequelize.authenticate()
    .then(() => {
        logger.debug('Connection has been established successfully.')
        sequelize.sync()
    })
    .catch((error) => logger.error('Unable to connect to the database:', error));

export { sequelize }
