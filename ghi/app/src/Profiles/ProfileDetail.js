import React from "react";
import { Navigate } from "react-router-dom";
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
        <div>
          <div className = 'container pic-name' >
              <h1>
                {this.state.profile.first_name + " " + this.state.profile.last_name}
              </h1>            
            {this.state.profile.photo}
          </div>
          <div>
              <h1>
                Details
              </h1>
            {this.state.profile.pronouns}
            {this.state.profile.date_of_birth}
            {this.state.profile.location}
            {this.state.profile.height}
            {this.state.profile.job}
            {this.state.profile.education}
            {this.state.profile.gender}
            {this.state.profile.sexual_orientation}
            {this.state.profile.religion}
            {this.state.profile.ethnicity}
          </div>
          <div>
            {this.state.profile.about}
          </div>
          <div>
              <h1>
                About Me
              </h1>
            {this.state.profile.reviews}
          </div>
        </div>
      );
    }
  }
  
  export default ProfileDetail;


