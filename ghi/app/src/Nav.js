import { NavLink } from 'react-router-dom';
import './nav.css';
import logo from "./logo.png"

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-navColor" >
      <div className="container-fluid">
        <NavLink to="/" className='home-button' ><a href="" className='logo'><img className="logo" src={logo} alt="" width="80px" height="50px" /></a></NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse font-face-na sizer" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" >
                <NavLink className="nav-link active " aria-current="page" to="/manufacturers" >Explore</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/manufacturers/new/">Connections</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/models">Messages</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/models/new">Meet Ups</NavLink>
              </li>
              <li className="nav-thing right-side">
                <NavLink className="nav-link" to="automobiles/">My Profile</NavLink>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
