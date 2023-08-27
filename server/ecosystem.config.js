module.exports = {
   apps: {
      name: 'JT_Co',
      script: './app.js',
      watch: ['./app.js', './routes', './models', './controllers', './config', './lib'],
      ignore_watch: ['node_modules'],
      instances: 0,
      exec_mode: 'cluster',
      env: {
         NODE_ENV: 'production'
      },
      env_production: {
         NODE_ENV: 'production'
      },
   }
};
