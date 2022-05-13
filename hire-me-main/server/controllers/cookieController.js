const db = require('../postgresPool');
const nOnce = require('../helpers/getNonce');

const cookieController = {};

// Initialise placeholder row in sessions table on signup
cookieController.initSession = async (req, res, next) => {
  if (res.locals.error) {
    return next();
  }
  console.log('INSIDE INITSESSION');
  const userID = res.locals.user._id;

  const sessionQ = 'INSERT INTO sessions (user_id, ssid) VALUES ($1, $2)';

  try {
    await db.query(sessionQ, [userID, userID]);
  } catch (err) {
    next({
      log: `Error in cookieController.initSession when trying to initialise a new user session: ERROR: ${err}`,
      message: { err: 'Error adding session to DB' },
    });
  }

  return next();
};

// Generates unique random SSID for user identification, and inserts it into DB
cookieController.generateSSID = async (req, res, next) => {
  if (res.locals.error) {
    return next();
  }
  let SSID = false;

  while (!SSID) {
    const trialSSID = nOnce();

    // Check if DB contains the trial SSID already:
    const SSIDQ = 'SELECT * FROM sessions WHERE ssid = $1';
    try {
      const { rows } = await db.query(SSIDQ, [trialSSID]);
      console.log('Rows returned from DB in generateSSID: ', rows);
      // If SSID is unique then add SSID to DB for user
      if (!rows.length) {
        SSID = true;
        const insertSSIDQ = 'UPDATE sessions SET ssid = $1 WHERE user_id = $2';
        await db.query(insertSSIDQ, [trialSSID, res.locals.user._id]);
        res.locals.ssid = trialSSID;
        return next();
      }
    } catch (err) {
      next({
        log: `Error in sessionController.generateSSID when trying to generate a new unique user ssid: ERROR: ${err}`,
        message: { err: 'Error adding SSID to DB' },
      });
    }
  }
};

// Adds SSID Cookie to response when user logs in
cookieController.setCookie = (req, res, next) => {
  if (res.locals.error) {
    return next();
  }
  res.cookie('ssid', res.locals.ssid, { httpOnly: true });
  return next();
};

// Checks if SSID Cookie from request is valid and authorises user
cookieController.verifySession = async (req, res, next) => {
  // console.log('TRYING TO VERIFY USER SESSION', req.cookies, req.cookies.ssid);

  // Check cookies exist:
  if (!req.cookies || !req.cookies.ssid) {
    res.locals.error = { message: 'No auth cookie on request - redirect to login. ' };
    return res.status(401).json(res.locals.error);
  }

  // Check cookie is valid in sessions table:
  const cookieQ = `
  SELECT * FROM sessions
  JOIN users ON sessions.user_id = users._id
  WHERE sessions.ssid = $1`;

  try {
    let { rows } = await db.query(cookieQ, [req.cookies.ssid]);
    // If no result then session is not valid:
    // console.log('VERIFY SESSION DB RESULT: ', rows);
    if (!rows.length) {
      res.locals.error = { message: 'Invalid ssid cookie - redirect to login' };
      return res.status(401).json(res.locals.error);
    }

    res.locals.user = { _id: rows[0].user_id, name: rows[0].name, email: rows[0].email };
    // console.log('Authorised user: ', res.locals.user);
    return next();
  } catch (err) {
    next({
      log: `Error in sessionController.verifySession when trying find a users session details: ERROR: ${err}`,
      message: { err: 'Error finding user session from ssid' },
    });
  }
};

module.exports = cookieController;
