import dotenv from 'dotenv';
import app from './app.mjs';

dotenv.config();

const { PORT = 8000 } = process.env;

const listener = () => console.log(`Listening on Port ${PORT}!`);
app.listen(PORT, listener);

// Log all registered routes to check for issues
app._router.stack.forEach(function(r) {
    if (r.route && r.route.path) {
      console.log(`Registered route: ${r.route.path}`);
    }
  });
  