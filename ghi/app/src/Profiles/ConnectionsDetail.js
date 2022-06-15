import React from "react";
import { Navigate, useParams } from "react-router-dom";
import './profile.css';
import { calculateAge } from "./ConnectionsList";


function ConnectionsDetailGrabber(){
  const params = useParams();
  const profile_id = params.id;
  return <ConnectionsDetail profile_id = {profile_id}></ConnectionsDetail>
}


class ConnectionsDetail extends React.Component {
  constructor(props) {
    super(props);
    // this.review = this.review.bind(this)
    this.state = {
      theirprofile: "",
      redirect: false,
  };
  }

  async getTheirDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.props.profile_id}`;
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

  componentDidMount() {
    this.getTheirDetails();
  }
  
    render() {
      if(this.state.redirect === true){
        return <Navigate to = '/login' />;
      }
      let feet = Math.floor(this.state.theirprofile.height/12)
      let inch = this.state.theirprofile.height%12
      return (
        <>
        <div className="profileContainer">
          <div className = 'container pic-name' >
              <h1>
                {this.state.theirprofile.first_name + " " + this.state.theirprofile.last_name}
              </h1>            
              <img src={ this.state.theirprofile.photo } alt="pic" width="70%" height="70%" />
          </div>
          <div className="details">
              <h1>
                Details
              </h1>
              <div className><b>Pronouns:</b> {this.state.theirprofile.pronouns}</div>
              <div className><b>Age:</b> {calculateAge(this.state.theirprofile.date_of_birth)}</div>
              <div className><b>Location:</b> {this.state.theirprofile.location}</div>
              <div className><b>Height:</b> { feet } ft { inch } inch</div>
              <div className><b>Job:</b> {this.state.theirprofile.job}</div>
              <div className><b>Education:</b> {this.state.theirprofile.education}</div>
              <div className><b>Gender:</b> {this.state.theirprofile.gender}</div>
              <div className><b>Sexual Orientation:</b> {this.state.theirprofile.sexual_orientation}</div>
              <div className><b>Religion:</b> {this.state.theirprofile.religion}</div>
              <div className><b>Ethnicity:</b> {this.state.theirprofile.ethnicity}</div>
          </div>
          <div className="mySummary">
               <h1>
                About Me
              </h1>
            {this.state.theirprofile.about}
          </div>
          <div className="reviews">
              <h1>
                Review Score
              </h1>
            {this.state.theirprofile.average_rating}
          </div>
          <button>Review {this.state.theirprofile.first_name}</button>
        </div>
        </>
      );
    }
  }
  
  export default ConnectionsDetailGrabber;


