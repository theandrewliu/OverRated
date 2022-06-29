import React from "react";
import { Navigate } from "react-router-dom";
import '../Profiles/profile.css';
import { calculateAge, scoreToStar } from "./ConnectionsList";
import { capitalize } from "../Profiles/ProfileDetail";
import blankpic from "../blank-profile-pic.png"


class ProfileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.likes = this.likes.bind(this)
    this.dislikes = this.dislikes.bind(this)
    this.state = {
      theirprofile: "",
      ourprofile: "",
      redirect: false,
  };
  }

  async getTheirDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/api/random`;
    const response = await fetch(url, {
      credentials: 'include',
      
    });
    if (response.ok) {
      this.setState({
        theirprofile: await response.json(),
      });
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }

  async getMyDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/mine`;
    const response = await fetch(url, {
      credentials: 'include',
      
    });
    if (response.ok) {
      this.setState({
        ourprofile: await response.json(),
      });
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }



  async likes() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.state.theirprofile.id}/liked`;
    // const form = new FormData();
    // form.append('active_id', this.state.ourprofile.id);
    const form = {'target_user_id': this.state.theirprofile.id};
    const response = await fetch(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(form),
      headers: {
          'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
        window.location.reload(false);
    }
    let error = await response.json();
    return error.detail;
  }

  async dislikes() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.state.theirprofile.id}/disliked`;
    // const form = new FormData();
    // form.append('active_id', this.state.ourprofile.id);
    const form = {'target_user_id': this.state.theirprofile.id};
    const response = await fetch(url, {
      method: 'post',
      credentials: 'include',
      body: JSON.stringify(form),
      headers: {
          'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
        window.location.reload(false);
    }
    let error = await response.json();
    return error.detail;
  }


  componentDidMount() {
    this.getMyDetails();
    this.getTheirDetails();
  }
  
    render() {
      if(this.state.redirect === true){
        return <Navigate to = '/login' />;
      }
      let feet = Math.floor(this.state.theirprofile.height/12)
      let inch = this.state.theirprofile.height%12

      let photo = this.state.theirprofile.photo 
      if (this.state.theirprofile.photo === null) {
          photo = blankpic
      }    
      return (
        <>
        <div className="container">
          <div className="row">
            <div className = "col-sm border border-light rounded-3">
                <h1>
                  {this.state.theirprofile.first_name + " " + this.state.theirprofile.last_name}
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
                      <td><b>Pronouns:</b> {this.state.theirprofile.pronouns}</td>
                    </tr>
                    <tr>
                      <td><b>Age:</b> {calculateAge(this.state.theirprofile.date_of_birth)}</td>
                    </tr>
                    <tr>
                      <td><b>Location:</b> {this.state.theirprofile.location}</td>
                    </tr>
                    <tr>
                      <td><b>Height:</b> { feet } ft { inch } inch</td>
                    </tr>
                    <tr>
                      <td><b>Job:</b> {this.state.theirprofile.job}</td>
                    </tr>
                    <tr>
                      <td><b>Education:</b> {this.state.theirprofile.education}</td>
                    </tr>
                    <tr>
                      <td><text><b>Gender:</b> {capitalize(this.state.theirprofile.gender)}</text></td>
                    </tr>
                    <tr>
                      <td><b>Sexual Orientation:</b> {capitalize(this.state.theirprofile.sexual_orientation)}</td>
                    </tr>
                    <tr>
                      <td><b>Religion:</b> {this.state.theirprofile.religion}</td>
                    </tr>
                    <tr>
                      <td><b>Ethnicity:</b> {this.state.theirprofile.ethnicity}</td>
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
                {this.state.theirprofile.about}
              </div>
              <div className="col-sm">
                  <h1>
                    Rating Average
                  </h1>
                  {scoreToStar(this.state.theirprofile.average_rating)}
              </div>
        </div>
        <button className = 'dislikebutton' onClick={ this.dislikes}>Dislike</button>
          <button className = 'likebutton' onClick={ this.likes}>Like</button>
        </div>
        </>
      );
    }
  }
  
  export default ProfileDetail;


