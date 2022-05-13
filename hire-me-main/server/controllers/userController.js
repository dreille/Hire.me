const bcrypt = require('bcrypt');
const db = require('../postgresPool');

// bcrypt salt rounds setting
const salty = 10;

const userController = {};

// Adds new user to the database if signup is successfull
userController.createUser = async (req, res, next) => {
  console.log('INSIDE CREATEUSER');
  if (res.locals.error) {
    return next();
  }
  console.log('ehllo');
  // Extracting the information we need from request body
  const { name, email, password } = req.body;
  console.log(name,' ',email,' ',password);
  // Hash the password using bcrypt
  let hash;
  try {
    hash = await bcrypt.hash(password, salty);
  } catch (err) {
    next({
      log: `Error in userController.createUser when trying to hash a password: ERROR: ${err}`,
      message: { err: 'Error hashing new user password' },
    });
  }

  // need to insert hashed password into db
  const createUser = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;';
  const userInfo = [name, email, hash];

  try {
    const { rows } = await db.query(createUser, userInfo);
    console.log('ROWS ARE: ', rows);
    res.locals.user = rows[0];
  } catch (err) {
    next({
      log: `Error in userController.createUser when trying to create a new user: ERROR: ${err}`,
      message: { err: 'Error adding new user to DB' },
    });
  }
  return next();
};

// Checks if email already in use before trying to create new user
userController.checkUser = async (req, res, next) => {
  // Extracting the information we need from request body
  console.log('INSIDE CHECKUSER');
  const { name, email, password } = req.body;
    console.log(name,' ',email,' ',password);

  // Validate form data before continuing
  if (!name || !email || !password) {
    res.locals.error = { message: 'Please enter all signup fields!' };
    return next();
  }

  // Query to check if email already in DB
  const checkUser = 'SELECT * FROM users WHERE email = $1';
  const params = [email];
  try {
    const data = await db.query(checkUser, params);
    if (data.rows[0]) {
      res.locals.error = { message: 'This email is already in use!' };
    }
    return next();
  } catch (err) {
    next({
      log: `Error in userController.createUser when trying to create a new user: ERROR: ${err}`,
      message: { err: 'Error adding new user to DB' },
    });
  }
};

// Takes data provided by login form
userController.verifyUser = async (req, res, next) => {
  console.log('INSIDE VERIFYUSER');
  const { email, password } = req.body;
  console.log(email,': ',password);

  // Validate login information is complete
  if (!email || !password) {
    res.locals.error = { message: ' Please enter all fields!' };
    return next();
  };

  const verifyUser = 'SELECT * FROM users WHERE email = $1';
  const userLogin = [email];

  let userData;
  try {
    const { rows } = await db.query(verifyUser, userLogin);
    console.log('ROWS IN verify user: ', rows);
    if (rows.length) {
      userData = rows[0];
    } else {
      res.locals.error = { message: 'Invalid login credentials!' };
    }
  } catch (err) {
    next({
      log: `Error in userController.verifyUser when trying to verify a user login: ERROR: ${err}`,
      message: { err: 'Error verifying user details in DB' },
    });
  }

  // Compare db password with given password
  try {
    console.log(userData);
    const passwordMatch = await bcrypt.compare(password, userData.password);
    if (passwordMatch) {
      res.locals.user = userData;
    } else {
      res.locals.error = { message: 'Invalid login credentials!' };
    }
    return next();
  } catch (err) {
    next({
      log: `Error in userController.verifyUser when trying to hash a password: ERROR: ${err}`,
      message: { err: 'Error hashing password at login' },
    });
  }
};

module.exports = userController;
