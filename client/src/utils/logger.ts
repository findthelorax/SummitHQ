import log from 'loglevel';

log.setLevel(import.meta.env.MODE === 'development' ? 'debug' : 'warn');

export default log;