# Pull the latest code from the main branch
git pull origin main

# build for deployment	
npm run build

# Install any new or updated dependencies
npm install

# Restart the application using PM2
pm2 restart finups-server

# Save the PM2 process list
pm2 save















	
