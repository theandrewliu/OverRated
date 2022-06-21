import React from "react";
import { Navigate, useParams } from "react-router-dom";
import '../Profiles/profile.css';
import { calculateAge, scoreToStar } from "./ConnectionsList";
import { capitalize } from "../Profiles/ProfileDetail";


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
      targetUser: "",
      rating: "",
      redirect: false,
      ratings: "",
      user: "",
      rating_of: "",
    };
    this.handleRatingChange = this.handleRatingChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleRatingChange(event) {
    const value = event.target.value;
    this.setState({ rating: value });
  }

  async handleSubmit(event) {
    event.preventDefault();
    
    const data = { 
      rating: parseInt(this.state.rating),
      rating_of: this.state.targetUser.id
    };

    console.log("the state", data)

    const rating_url = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.props.profile_id}/rating/`;
    const fetchConfig = {
      method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
    };
    const response = await fetch(rating_url, fetchConfig);
    if(response.ok) {
      const new_rating =await response.json();
      console.log(new_rating)
      this.setState({
        rating: "",
        rating_of: ""
      })
    }
  }

  async componentDidMount() {
    const targetURL = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.props.profile_id}`;
    const ratingsURL = `${process.env.REACT_APP_API_HOST}/api/my-ratings`;
    const userURL = `${process.env.REACT_APP_API_HOST}/api/profiles/mine/`;
    
    const targetResponse = await fetch(targetURL, {credentials: 'include'});
    const ratingsResponse = await fetch(ratingsURL, {credentials: 'include'});
    const userResponse = await fetch(userURL, {credentials: 'include'});

    if (targetResponse.ok && ratingsResponse.ok && userResponse.ok) {
      this.setState({
        targetUser: await targetResponse.json(),
        ratings: await ratingsResponse.json(),
        user: await userResponse.json(),
    });

    }else if (targetResponse.status === 401 || ratingsResponse.status === 401 || userResponse.status ===401 ){
      this.setState({redirect: true})
    }
  }

  
  render() {
    if(this.state.redirect === true){
      return <Navigate to = '/login' />;
    }

    let feet = Math.floor(this.state.targetUser.height/12)
    let inch = this.state.targetUser.height%12

    let photo = this.state.targetUser.photo 
    if (this.state.targetUser.photo === null) {
        photo = "/images/blank-profile-pic.png"
    }  
    
    
    let ratingConfirmationMessage = 'd-none'
    let ratingButton = 'btn btn-primary'
    for (let rating in this.state.ratings.ratings) {
      if (this.state.targetUser.id === this.state.ratings.ratings[rating]["rating_of"]) {
        ratingConfirmationMessage = ''
        ratingButton = 'btn btn-primary d-none'
      }
    }

      return (
        <>
        <div className="profileContainer">
          <div className = 'container pic-name' >
              <h1>
                {this.state.targetUser.first_name + " " + this.state.targetUser.last_name}
              </h1>            
              <img src={ photo } alt="pic" width="70%" height="70%" />
          </div>
          <div className="details">
              <h1>
                Details
              </h1>
              <div className><b>Pronouns:</b> {this.state.targetUser.pronouns}</div>
              <div className><b>Age:</b> {calculateAge(this.state.targetUser.date_of_birth)}</div>
              <div className><b>Location:</b> {this.state.targetUser.location}</div>
              <div className><b>Height:</b> { feet } ft { inch } inch</div>
              <div className><b>Job:</b> {this.state.targetUser.job}</div>
              <div className><b>Education:</b> {this.state.targetUser.education}</div>
              <div className><b>Gender:</b> {capitalize(this.state.targetUser.gender)}</div>
              <div className><b>Sexual Orientation:</b> {capitalize(this.state.targetUser.sexual_orientation)}</div>
              <div className><b>Religion:</b> {this.state.targetUser.religion}</div>
              <div className><b>Ethnicity:</b> {this.state.targetUser.ethnicity}</div>
          </div>
          <div className="mySummary">
               <h1>
                About Me
              </h1>
            {this.state.targetUser.about}
          </div>
          <div className="reviews">
              <h1>
                Rating Average
              </h1>
            {scoreToStar(this.state.targetUser.average_rating)}
            <div>
              <h3 className={ratingConfirmationMessage}>Thanks for rating {this.state.targetUser.first_name}!</h3>
              <button className={ratingButton} data-bs-toggle="modal" data-bs-target="#RatingModalCenter">Rate {this.state.targetUser.first_name}</button>
            </div>
          </div>
        </div>



      {/* <!-- Modal --> */}
      <div className="modal fade" id="RatingModalCenter" tabIndex="-1" role="dialog" aria-labelledby="RatingModalCenter" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Rate {this.state.targetUser.first_name} from 1-5 hearts!</h5>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit} id="create-rating">
              <div className="">
                <select onChange={this.handleRatingChange} value={this.state.rating}>
                  <option value="">Select a Rating</option>
                  <option value="1">1 Heart</option>
                  <option value="2">2 Hearts</option>
                  <option value="3">3 Hearts</option>
                  <option value="4">4 Hearts</option>
                  <option value="5">5 Hearts</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary justify-content-end" value="Submit" form="create-rating">Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        </>
      );
    }
  }
  
  export default ConnectionsDetailGrabber;


