import React from 'react';

const ContentsView = props => {

  const handleArchive = function(e, id) {
    e.preventDefault();
    fetch(`/api/archive/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        archived: true,
      })
    })
      .then(res => {
        if (res.status === 200) {
          props.setAppRefresh(!props.appRefresh)
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div id="contents-view">
      <label htmlFor="cv-checkbox">Archive</label>
      <input id="cv-checkbox" type="checkbox" onClick={(e) => handleArchive(e, props.app._id)}></input>
      <h5>Title:</h5>
      {props.app.title}
      <br />
      <h5>Location:</h5>
      {props.app.location}
      <br />
      <h5>Company</h5>
      {props.app.company_name}
      <br />
      <h5>Description:</h5>
      {/* {props.app.description} */}
      <div dangerouslySetInnerHTML={{__html: props.app.description}} />
      <br />
      <h5>Link:</h5>
      {props.app.link}
      <br />
    </div>
  )
}

export default ContentsView;