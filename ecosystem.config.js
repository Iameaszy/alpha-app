module.exports = {
  apps: [
    {
      name: 'app',
      script: './dist/main.js',
      instances: 2,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_test: {
        NODE_ENV: 'test',
      },
      env_staging: {
        NODE_ENV: 'staging',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
