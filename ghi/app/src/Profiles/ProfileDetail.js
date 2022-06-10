import React from "react";
import { Navigate, Link } from "react-router-dom";
import './profile.css';


class ProfileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: "",
      redirect: false,
  };
  }

  async getMyDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/mine`;
    const response = await fetch(url, {
      credentials: 'include',
      
    });
    if (response.ok) {
      this.setState({
        profile: await response.json(),
      });
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }


  componentDidMount() {
    this.getMyDetails();
  }
  
    render() {
      console.log(this.state)
      if(this.state.redirect === true){
        return <Navigate to = '/login' />;
      }
      return (
        <>
        <Link className = 'buttonA' to='/api/profiles/myself'>Profile Settings</Link>
        <Link className = 'buttonB' to='/api/accounts/myself'>Account Settings</Link>
        <div className="profileContainer">
          <div className = 'container pic-name' >
              <h1>
                {this.state.profile.first_name + " " + this.state.profile.last_name}
              </h1>   
              <img src={ this.state.profile.photo } alt="pic" width="70%" height="70%" />        
          </div>
          <div className="details">
              <h1>
                Details
              </h1>
              <div className><b>Pronouns:</b> {this.state.profile.pronouns}</div>
              <div className><b>Birthday:</b> {this.state.profile.date_of_birth}</div>
              <div className><b>Location:</b> {this.state.profile.location}</div>
              <div className><b>Height:</b> {this.state.profile.height}</div>
              <div className><b>Job:</b> {this.state.profile.job}</div>
              <div className><b>Education:</b> {this.state.profile.education}</div>
              <div className><b>About Me:</b> {this.state.profile.about}</div>
              <div className><b>Interested In:</b> {this.state.profile.interested}</div>
              <div className><b>Gender:</b> {this.state.profile.gender}</div>
              <div className><b>Sexual Orientation:</b> {this.state.profile.sexual_orientation}</div>
              <div className><b>Religion:</b> {this.state.profile.religion}</div>
              <div className><b>Ethnicity:</b> {this.state.profile.ethnicity}</div>
          </div>
          <div className="mySummary">
               <h1>
                About Me
              </h1>
            {this.state.profile.about}
          </div>
          <div className="reviews">
              <h1>
                Rating Average
              </h1>
              {this.state.profile.average_rating}
          </div>
        </div>
        </>
      );
    }
  }
  
  export default ProfileDetail;


