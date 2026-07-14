const isProduction = import.meta.env.PROD;

export const logger = {
  info: (...args) => {
    if (!isProduction) console.info(...args);
  },
  warn: (...args) => {
    if (!isProduction) console.warn(...args);
  },
  error: (...args) => {
    console.error(...args);
  },
};
