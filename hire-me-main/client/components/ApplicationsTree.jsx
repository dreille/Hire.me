import React from 'react';
import { useHistory } from 'react-router-dom';

const ApplicationsTree = props => {
  const history = useHistory();

  const handleOnClick = function (e) {
    e.preventDefault();
    history.push('applicationView/0');
  };

  const handleChangeAppView = function (e, id) {
    e.preventDefault();
    history.push(`/applicationView/${id}`);
  };

  const handleAppDelete = function(e, id) {
    fetch(`/api/applications/${id}`, {
      method: 'DELETE',
      headers: {
        'Contnent-Type': 'application/json',
      }
    })
      .then(res => {
        if (res.status === 200) {
          // history.push('/applicationView/0')
          props.setAppRefresh(!props.appRefresh);
        }
      })
      .catach(err => {
        console.log(err);
      })
  }

  const tree = props.apptree.map((obj, index) => {
    return (
      <a key={index} onClick={(e) => handleChangeAppView(e, obj._id)} href={obj._id}>
        {obj.title}
        <button type="button" onClick={(e) => handleAppDelete(e, obj._id)}>X</button>
      </a>
    );
  })

  return <div id="applications-tree">
    {tree}
    <button className="btn btn-dark" type="button" onClick={(e) => handleOnClick(e)}>create new application</button>
  </div>
}

export default ApplicationsTree;
