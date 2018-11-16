module.exports = {
  apps: [
    {
      name: 'koa-api',
      script: 'app.js',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      // args: 'one two',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      ignore_watch: ['node_modules'],
      max_memory_restart: '100M',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        PORT: 3001,
        NODE_ENV: 'production'
      }
    }
  ],

  deploy: {
    production: {
      key: '~/.ssh/google_rsa',
      user: 'xiawang1024',
      host: '35.194.208.201',
      ref: 'origin/api',
      repo: 'https://github.com/xiawang1024/koa-learn.git',
      path: '/home/xiawang1024/WWW/production/koa-api',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production'
    }
  }
}