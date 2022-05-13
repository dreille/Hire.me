import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
const JSSoup = require('jssoup').default;

const CreateApplicationForm = (props) => {
  const history = useHistory();

  // Function to autofill form from Indeed link webscrape
  function autoFill(e) {
    console.log('trying to autofill form!');
    e.preventDefault();
    const link = document.getElementById('indeed').value;
    if (link) {
      fetch(`/api/scrape`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({url: link}),
      })
        .then((response) => {
          // console.log('RESPONSE STATUS: ', response.status);
          if (response.status === 200) {
            return response.json();
          }
          throw new Error('Autofill link non-200 status response.');
        }).then((data) => {
          // Add contents to create application form:
          document.getElementById('title').value = data.title;
          document.getElementById('company_name').value = data.company;
          document.getElementById('location').value = data.location;
          document.getElementById('description').value = data.description;
          document.getElementById('link').value = data.link;
        }).catch((err) => {
          console.log('Error when trying to auto-fill app: ', err);
        });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const company_name = document.getElementById('company_name').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;
    const link = document.getElementById('link').value;

    fetch('/api/createApp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        company_name,
        location,
        description,
        link,
      }),
    }).then((response) => {
      // console.log(response);
      // console.log(response.status);
      if (response.status === 200) {
        return response.json();
      }
      throw new Error('Error when trying to create new Application')
    }).then((data) => {
      // console.log('Application data is: ', data);
      props.setAppRefresh(!props.appRefresh);
      // history.push(`/applicationView/0`);
    }).catch((err) => {
      console.log('in error');
      console.log(err);
    });
  }
  
  return (
    <section>
      <div>
        <form id="auto-fill" onSubmit={(e) => autoFill(e)}>
          <label htmlFor="indeed">Indeed Job Post Link:</label>
          <input id="indeed" name="indeed" placeholder="Indeed Link" type="text" />
          <button id="scrape" type="submit">Auto-fill</button>
        </form>
      </div>

      <div id="application-preview">
        <form id="application-form" onSubmit={(e) => handleSubmit(e)}>
          <label htmlFor="title">Title</label>
          <input id="title" name="title" placeholder="title" type="text" />
          <br />
          <label htmlFor="company_name">Company Name</label>
          <input id="company_name" name="company_name" placeholder="company_name" type="text" />
          <br />
          <label htmlFor="location">Location</label>
          <input id="location" name="location" placeholder="location" type="text" />
          <br />
          <label htmlFor="description">Description</label>
          <textarea id="description" name="description" placeholder="description" type="text" />
          <br />
          <label htmlFor="link">Job Posting Url Link</label>
          <input id="link" name="link" placeholder="link" type="text" />
          <br />
          <button className="btn btn-dark" id="submit" formAction="/auth/signup" type="submit">Create Application</button>
        </form>
      </div>
    </section>
  );
};

export default CreateApplicationForm;
