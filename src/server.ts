
import { Server } from 'http';
import app from './app';
import { ConfigFile } from './config';


let server: Server;

async function main() {
  try {
    server = app.listen(ConfigFile.PORT, () => {
      console.log(`Server is running on port ${ConfigFile.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();



// Handle uncaught exceptions
process.on('unhandledRejection', (reason) => {
    console.log('Unhandled Promise Rejection! Shutting down the server...');
    console.log(reason);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });

// Handle unhandled promise rejections
  process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception! Shutting down the server...');
    console.log(err.name, err.message);
    if (server) {
      server.close(() => {
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });