import { Link } from 'react-router-dom';
import './CSS/App.css';
import React from 'react';



function MainPage() {

  return (
    <div className='mainpage'>
    <div id="container">
      <div className="content">
      <h1 className="display-5 fw-bold" id='mainover'>OverRated</h1>
      <div className="logo">
      <p className="description">
          The premiere solution for loneliness!
        </p>
      <br></br>
      </div>
      <footer>
            <div id="terms">
              <div>
        <p className="termsandconditions">
        By clicking Join, you agree to our Terms. 
        Learn how we process your data in our Privacy Policy and Cookies Policy.
        </p>
        </div>
        <div className="link">
            <Link to="/login/new" className="mainlink">Find your Love Today!</Link>
            </div>
          </div>
    </footer>
        </div>
      </div>
    </div>
  );
}


export default MainPage;
