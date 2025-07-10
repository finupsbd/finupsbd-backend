import { Server } from 'http';
import app from './app';
import { ConfigFile } from './config';
import { logger } from './app/utils/error-logs/logger';


let server: Server;

function main() {
  server = app.listen(ConfigFile.PORT, () => {
    console.log(`Server is running on port ${ConfigFile.PORT}`);
  });

  server.on('error', (error) => {
    console.error('Server startup error:', error);
    process.exit(1);
  });
}

main();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const shutdown = (reason: string, details: any) => {
  console.log(`${reason}! Shutting down the server...`);
  if (details) {
    console.log(details);
  }
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};


// Handle unhandled promise rejections
process.on('unhandledRejection', (reason) => {

  shutdown('Unhandled Promise Rejection', reason);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error("Uncaught Exception:", err);
  shutdown('Uncaught Exception', err);
});