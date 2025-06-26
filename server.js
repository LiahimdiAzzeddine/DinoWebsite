// server.js (ESM compatible)
import express from 'express';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';

// __dirname equivalent in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
