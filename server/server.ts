import express, { Request, Response, Application } from "express";
const morgan = require('morgan');
const PORT = process.env.PORT || 9001;
const path = require('path');
const api = require('./routes/api');
const app: Application = express();

// Middleware:
/* istanbul ignore next */
process.env.NODE_ENV === 'production'
  ? app.use(morgan('common'))
  : app.use(morgan('dev'));

// Tell node where to serve static files from
app.use(express.static(path.join(__dirname, '../client/public')));
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// API routes
app.use('/api', api);

app.use(function (req: Request, res: Response) {
  res.status(404).send("That's a 404 folks...");
});

const server = app.listen(PORT).on('listening', () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

module.exports = server; // Export for testing