import { NavLink } from 'react-router-dom';
import './nav.css';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-navColor" >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/" >
            <a href="https://i.imgur.com/hrpMik9.png">
            </a>
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" >
                <NavLink className="nav-link active" aria-current="page" to="/manufacturers">Explore</NavLink>
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
              <li className="nav-item">
                <NavLink className="nav-link" to="automobiles/">My Profile</NavLink>
              </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
