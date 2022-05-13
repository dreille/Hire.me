import React, { useState, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from '../pages/Login.jsx';
import Homepage from '../pages/Homepage.jsx';
import ApplicationView from '../pages/ApplicationView.jsx';
import Signup from '../pages/Signup.jsx';
import Navigation from './Navigation.jsx';
import ApplicationArchive from '../pages/ApplicationArchive.jsx';
// import bootstrap from 'bootstrap';

// import 'bootstrap/dist/css/bootstrap.min.css'
import styles from '../styles/_custom.scss';

const App = (props) => {
  const [appsList, setAppsList] = useState([]);
  const [authUser, setAuthUser] = useState(false);
  const [userName, setUserName] = useState('');
  const [archiveList, setArchiveList] = useState([]);
  const [appRefresh, setAppRefresh] = useState(false);


  useEffect(() => {
    fetch('/api/applications', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setAppsList(res);
        // console.log('2',res);
        // console.log('3',res.body);
      }).catch((err) => {
        console.log(err);
      });
  }, ["", appRefresh]);

  useEffect(() => {
    fetch('/api/archive', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        // console.log(res);
        setArchiveList(res);
      }).catch((err) => {
        console.log(err);
      });
  }, ["", appRefresh]);
 
  // console.log(Cookies.get());
  return (
    <div>
      <Navigation userName={userName} authUser={authUser} setAuthUser={setAuthUser} />
      <Switch>
        <Route exact path="/">
          <Login authUser={authUser} setAuthUser={setAuthUser} setUserName={setUserName} />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/homepage">
          <Homepage appsList={appsList} />
        </Route>
        <Route path="/applicationView/:id">
          <ApplicationView appRefresh={appRefresh} setAppRefresh={setAppRefresh} appsList={appsList} />
        </Route>
        <Route path="/archive">
          <ApplicationArchive archiveList={archiveList} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
