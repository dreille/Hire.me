import React from 'react';
import { useParams } from 'react-router-dom';
import SplitPane from 'react-split-pane';

import ApplicationsTree from '../components/ApplicationsTree.jsx';
import ApplicationPreview from '../components/ApplicationPreview.jsx';
import ProgressTracker from '../components/ProgressTracker.jsx';


const ApplicationView = props => {

  let { id } = useParams();

  let apptree = props.appsList.map(obj => {
    return { _id: obj._id, title: obj.title }
  })



  console.log(props.appsList);
  console.log(id);
  let applicationfocus = props.appsList.filter((obj) => {
    // console.log(obj);
    // console.log(obj._id);
    // console.log(id,'----');
    let decision = obj._id == id;
    console.log(decision);
    return decision;
  });

  let userId, appId;
  if (applicationfocus.length !== 0) {
    userId = applicationfocus[0].user_id;
    appId = applicationfocus[0]._id;
    console.log('userId: ',userId);
    console.log('appId: ',appId)
  }

  const onDragCallback = () => {
    console.log('dragging');
  }

  console.log('focus: ',applicationfocus);
  return <div id="application-view">
    <SplitPane
      className="SplitPane"
      style={{ overflow: "scroll"}}
      onChange={() => onDragCallback()}
      onDragStarted={() => onDragCallback()} split="vertical" minSize={50} defaultSize={200}>
      <div className="pane">
        <ApplicationsTree appRefresh={props.appRefresh} setAppRefresh={props.setAppRefresh} apptree={apptree} />
      </div>
      <SplitPane split="vertical" style={{ overflow: "scroll", height: "auto"}} defaultSize={300}>
        <div className="pane">
          <ApplicationPreview  appRefresh={props.appRefresh} setAppRefresh={props.setAppRefresh} focus={applicationfocus}/>
        </div>
        <div className="pane">
          <ProgressTracker userId={userId} appId={appId} />
        </div>
      </SplitPane>
    </SplitPane>
  </div>
}

export default ApplicationView;
