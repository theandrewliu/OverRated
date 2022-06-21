import React from "react";
import { Navigate, Link } from "react-router-dom";
import './profile.css';
import { calculateAge, scoreToStar } from "../Connections/ConnectionsList";

export function capitalize(s) {
  return String(s).charAt(0).toUpperCase() + String(s).slice(1);
}

export function list_separate(list) {
  let output = ""
  for (let i = 0; i < list?.length; i++){
    output += (capitalize(list[i]) + "s ")
  }
  return output
}

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
      console.log("LOOK HERE", this.state)
      if(this.state.redirect === true){
        return <Navigate to = '/login' />;
      }
      
      let feet = Math.floor(this.state.profile.height/12)
      let inch = this.state.profile.height%12

      let photo = this.state.profile.photo 
      if (this.state.profile.photo === null) {
          photo = "/images/blank-profile-pic.png"
      }
      
      

      return (
        <>
        <Link className = 'buttonA' to='/profiles/myself'>Profile Settings</Link>
        <Link className = 'buttonB' to='/accounts/myself'>Account Settings</Link>
        <div className="container">
          <div className="row">
            <div className = "col-sm border border-light rounded-3">
                <h1>
                  {this.state.profile.first_name + " " + this.state.profile.last_name}
                </h1>            
                <img src={ photo } className="img-fluid rounded-4" alt="pic" width="70%" height="70%" />
            </div>
            <div className="col-sm">
              <table className="table table-condensed table-sm table-hover">
                  <h1>
                    Details
                  </h1>
                  <tbody>
                    <tr>
                    </tr>
                    <tr>
                      <td><b>Pronouns:</b> {this.state.profile.pronouns}</td>
                    </tr>
                    <tr>
                      <td><b>Age:</b> {calculateAge(this.state.profile.date_of_birth)}</td>
                    </tr>
                    <tr>
                      <td><b>Location:</b> {this.state.profile.location}</td>
                    </tr>
                    <tr>
                      <td><b>Height:</b> { feet } ft { inch } inch</td>
                    </tr>
                    <tr>
                      <td><b>Job:</b> {this.state.profile.job}</td>
                    </tr>
                    <tr>
                      <td><b>Education:</b> {this.state.profile.education}</td>
                    </tr>
                    <tr>
                      <td><b>Interested In:</b> {list_separate(this.state.profile.interested)}</td>
                    </tr>
                    <tr>
                      <td><text><b>Gender:</b> {capitalize(this.state.profile.gender)}</text></td>
                    </tr>
                    <tr>
                      <td><b>Sexual Orientation:</b> {capitalize(this.state.profile.sexual_orientation)}</td>
                    </tr>
                    <tr>
                      <td><b>Religion:</b> {this.state.profile.religion}</td>
                    </tr>
                    <tr>
                      <td><b>Ethnicity:</b> {this.state.profile.ethnicity}</td>
                    </tr>
                  </tbody>
                </table>
            </div>
          </div>
          <div className="row">
            <div className="col-sm">
                  <h1>
                    About Me
                  </h1>
                {this.state.profile.about}
              </div>
              <div className="col-sm">
                  <h1>
                    Rating Average
                  </h1>
                  {scoreToStar(this.state.profile.average_rating)}
              </div>
            </div>
          </div>
        </>
      );
    }
  }
  
  export default ProfileDetail;


