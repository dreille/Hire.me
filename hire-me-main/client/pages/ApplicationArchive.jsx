import React, { useState, useEffect } from 'react';
import AppCard from '../components/AppCard.jsx';

const Archive = (props) => {

  const archivedApps = props.archiveList.map((obj, index) => {
    console.log('archive: ',obj);
    return <AppCard key={index} 
    title={obj.title} 
    company_name={obj.company_name} 
    location={obj.location} 
    description={obj.description} 
    link={obj.link} />;
  });


  return (
    <div id="archive-container">
      <h1>Archived Applications</h1>
      <div id="cards-view">
        {archivedApps}
      </div>
    </div>
  )
}

export default Archive;