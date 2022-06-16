import { NavLink } from 'react-router-dom';
import './nav.css';
import logo from "./logo.png"

function Nav(props) {
  const {token} = props;
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-navColor" >
      <div className="container-fluid">
        <NavLink to="/" className='home-button' ><img className="logo" src={logo} alt="" width="80px" height="50px" /></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse font-face-na sizer" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              { token ?
                <>
                  <li className="nav-item" >
                    <NavLink className="nav-link" aria-current="page" to="/api/random" >Explore</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/api/my-matches">Connections</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/messages">Messages</NavLink>
                  </li>
                  {/* <li className="nav-item">
                    <NavLink className="nav-link" to="/meetups">Meet Ups</NavLink>
                  </li> */}
                </> :
                <>
                </>
              }
          </ul>
          <ul className="navbar-nav ml-auto">
                { token ?
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/my_profile">My Profile</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                  </> :
                  <>
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/login/new">Sign up</NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink className="nav-link" end to="/login">Login</NavLink>
                    </li>
                  </>
                }
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
