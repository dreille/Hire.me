const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/authRouter');
const apiRouter = require('./routes/apiRouter');

// Create express App and define PORT to listen on
const app = express();
const PORT = 3000;

app.options(cors());

// Parse request body onto req.body
// Parse request body onto req.body, and urlencoded params into params:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// parses cookies to req.cookies
app.use(cookieParser());

// Only serve bundle and initial html in when in production
if (process.env.NODE_ENV === 'production') {
  // Serve webpackfile bundle from dist folder:
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  // Serve main html page
  app.use('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
  });
}

// Router
app.use('/api', apiRouter);

// Authentication Router for signup/login/logout etc.
app.use('/auth', authRouter);

// Invalid Route Error Handler:
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

// Global Middleware Error Handler:
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// App listens on PORT 3000
app.listen(PORT, () => console.log('Listening on port:', PORT));
