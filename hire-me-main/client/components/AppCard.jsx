import React from 'react';
import { Link } from 'react-router-dom';

const AppCard = props => {


    return( 
    // <div id="app-card" className ="app-card card mb-3"> 
        <div className="col-sm-6 col-md-4 col-lg-3 mt-3">
          <div className="card h-100">
            <Link style={{ color: "black", textDecoration: 'none'}}key={props._id} to={`/applicationView/${props._id}`}>
              <div className="card-body">
                <h5 className="card-CompanyName">
                  <strong>Company Name: </strong> 
                  {props.company_name} 
                </h5>
                <p className="card-title">
                  <strong>Title: </strong>
                    {props.title} 
                </p>
                <p className="card-CompanyName">
                  <strong>Location: </strong>
                    {props.location} 
                </p>
                <p className="card-CompanyName" style={{ overflow: 'hidden' }}>
                  <a href={props.link} >Job Posting</a> 
                </p>
              </div>
            </Link>
          </div>
        </div>
    // </div>
)};
export default AppCard;
