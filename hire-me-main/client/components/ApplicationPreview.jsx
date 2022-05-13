import React, { useState, useEffect } from 'react';

import CreateApplicationForm from './CreateApplicationForm.jsx';
import ContentsView from './ContentsView.jsx';

const ApplicationPreview = (props) => {
  
  console.log('props: ',props)
  console.log(props.focus.length === 0)
  console.log(props.focus);
  return (props.focus.length === 0) ? (
    <div>
      <CreateApplicationForm appRefresh={props.appRefresh} setAppRefresh={props.setAppRefresh} />
    </div>
  )
  : (
    <div><ContentsView appRefresh={props.appRefresh} setAppRefresh={props.setAppRefresh} app={props.focus[0]} /></div>
  )
};

export default ApplicationPreview;
