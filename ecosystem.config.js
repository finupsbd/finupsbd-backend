module.exports = {
  apps: [
    {
      name: "finups-api",
      script: "dist/app.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],

  deploy: {
    production: {
      user: "finups",                            // Your server user
      host: "123.136.30.206",                    // Replace with your server IP or domain
      ref: "origin/main",                        // Branch to deploy
      repo: "git@github.com:yourname/finupsbd-backend.git",  // Replace with your repo SSH URL
      path: "/home/finups/finups/finupsbd-backend",           // Your deployment path
      ssh_options: "StrictHostKeyChecking=no",
      'post-deploy': "npm install && npm run build && pm2 reload ecosystem.config.js --env production",
    },
  },
};
