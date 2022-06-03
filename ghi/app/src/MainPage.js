import { Link } from 'react-router-dom';
import './App.css';
import React from 'react';

function MainPage() {


  return (
    <div className="px-4 my-5 text-center" >
    <div id="container">
      <div class="col1">
      <h1 className="display-5 fw-bold">OverRated</h1>
      <div class="logo">
      <img src="/images/overratedlogo.png" alt="" class="picture" />
      </div>
      <div>
      <p className="lead mb-4">
          The premiere solution for loneliness!
        </p>
        <p class="termsandconditions">
        By clicking Join, you agree to our Terms. 
        Learn how we process your data in our Privacy Policy and Cookies Policy.
        </p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <Link to="/signup" className="btn btn-primary btn-lg px-4 gap-3">Be Toxic Today!</Link>
            </div>
          </div>
        </div>
        <div class="col2">
        <div class="logo">
      <img src="/images/toxic_couple.jpg" alt="" class="pictures" />
      </div>
        </div>
      </div>
    </div>
  );
}


export default MainPage;
