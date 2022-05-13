const express = require('express');
const cookieController = require('../controllers/cookieController');
const appsController = require('../controllers/appsController');

const router = express.Router();

// Returns all applications for users homepage
router.get('/applications',
  cookieController.verifySession,
  appsController.getApps,
  (req, res) => {
    console.log('reached end of applications route');
    return res.status(200).json(res.locals.applications);
  });

// Creates a new application from form posted by user
router.post('/createApp',
  cookieController.verifySession,
  appsController.postApps,
  (req, res) => {
    if (res.locals.error) {
      return res.status(400).json(res.locals.error);
    }
    console.log('reached end of createApp route');
    return res.status(200).json(res.locals.application);
  });

// Gets notes and todos associated with an individual application
router.get('/applications/:appID',
  cookieController.verifySession,
  appsController.appAuth,
  appsController.getNotes,
  appsController.getTodos,
  (req, res) => {
    console.log('reached end of application details route');
    return res.status(200).json(res.locals.details);
  });

// Delete an application, all its associated notes and todos
router.delete('/applications/:appID',
  cookieController.verifySession,
  appsController.appAuth,
  appsController.deleteApp,
  (req, res) => {
    console.log('reached end of delete application route');
    return res.status(200).json(res.locals.application);
  });

// Create a new todo on a specific application
router.post('/applications/:appID/todos',
  cookieController.verifySession,
  appsController.appAuth,
  appsController.postTodo,
  (req, res) => {
    console.log('reached end of create todo route');
    return res.status(200).json(res.locals.todo);
  });

// Toggle the checked status of a todo
router.patch('/applications/:appID/todo/:todoID',
  cookieController.verifySession,
  appsController.appAuth,
  appsController.toggleTodo,
  (req, res) => {
    console.log('reached end of todo toggle route');
    return res.status(200).json(res.locals.todo);
  });

// Delete a todo on an application
router.delete('/applications/:appID/todo/:todoID',
  cookieController.verifySession,
  appsController.appAuth,
  appsController.deleteTodo,
  (req, res) => {
    console.log('reached end of delete todo route');
    return res.status(200).json(res.locals.todo);
  });

// Create a new note on a specific application
router.post('/applications/:appID/notes',
  cookieController.verifySession,
  appsController.appAuth,
  appsController.postNote,
  (req, res) => {
    console.log('reached end of create notes route');
    return res.status(200).json(res.locals.postNote);
  });

// Delete a todo on an application
router.delete('/applications/:appID/note/:noteID',
  cookieController.verifySession,
  appsController.appAuth,
  appsController.deleteNote,
  (req, res) => {
    console.log('reached end of delete note route');
    return res.status(200).json(res.locals.note);
  });

// Gets archived apps
router.get('/archive',
  cookieController.verifySession,
  appsController.getArchive,
  (req, res) => {
    console.log('reached end of get archive route');
    return res.status(200).json(res.locals.archive);
  });

// Adds apps to the archive
router.patch('/archive/:appID',
  cookieController.verifySession,
  appsController.appAuth,
  appsController.toggleArchive,
  (req, res) => {
    console.log('reached end of toggle archive route');
    return res.status(200).json(res.locals.application);
  });

// Scrapes indeed link for data
router.post('/scrape',
  cookieController.verifySession,
  appsController.scrape,
  (req, res) => {
    console.log('reached end of web scraping route');
    return res.status(200).json(res.locals.details);
  });

module.exports = router;
