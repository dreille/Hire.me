import React from 'react';
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom';

const Navigation = props => {
  const history = useHistory();
  function handleLogout(e) {
    e.preventDefault();
    fetch('/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(res => {
        props.setAuthUser(false);
        history.push('/');
    });
  }
  const authUser = props.authUser;
  const userName = props.userName;
//   return (
//     <Navbar>
//       <Container>
//         <ul>
//           <li><Link to={'/homepage'}>Homepage</Link></li>
//           <li><Link to={'/applicationview'}>ApplicationView</Link></li>
//         </ul>
//         <button type="button" onClick={(e) => handleLogout(e)}>Logout</button>
//       </Container>
//     </Navbar>
//   );
// }
return (
  <nav className="navbar navbar-expand-sm navbar-light bg-light">
    <div className="container-fluid">
      {/* {NAVBAR BRAND} */}
      <Link to={authUser ? '/homepage' : '/'}>
        <button type="button" className="navbar-brand">
          Hire.me
        </button>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        {/* {NAVBAR LEFT} */}
          
        {authUser
            ? (
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to="/homepage" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                  <Link to="/applicationView/0" className="nav-link"> Applications</Link>
                </li>
                <li className="nav-item">
                  <Link to="/archive" className="nav-link"> Archive</Link>
                </li>
              </ul>
            )
            : null}

        {/* {NAVBAR RIGHT} */}

        {authUser
          ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <span disabled className="nav-link">Logged in as {userName}</span>
              </li>
              <li className="nav-item">
                <a className="no-hover nav-link" href="#" onClick={(e) => handleLogout(e)}>Logout</a>
              </li>
            </ul>
          )
          : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">Signup</Link>
              </li>
            </ul>
          )}
      </div>
    </div>
  </nav>
);
};
export default Navigation;
