import React, { useState, useEffect } from 'react';
import AppCard from '../components/AppCard.jsx';
import { Link } from 'react-router-dom';

const Homepage = (props) => {
  
  function handleSubmit(e) {
    e.preventDefault();
  }

  const displayApps = props.appsList.map((obj, index) => {
    console.log(obj);
    return (
    // <Link key={index} to={`/applicationView/${obj._id}`}>
      <AppCard  _id={obj._id} title={obj.title} company_name={obj.company_name} location={obj.location} description={obj.description} link={obj.link} hoverable />
    // </Link>\
    );
  });

  return (
    <div id="homepage-container">
      <h1>Current Applications</h1>

      <div id="cards-view">
        <div className="row">
          {displayApps}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
