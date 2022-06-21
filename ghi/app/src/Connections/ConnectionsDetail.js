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
      rating: '',
      redirect: false,
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
    const data = {...this.state};

    const rating_url = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.props.target_id}/rating/`;
    const fetchConfig = {
      method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            credentials: "include",
            },
    };
    const response = await fetch(rating_url, fetchConfig);
    if(response.ok) {
      const new_rating =await response.json();
      console.log(new_rating)
    }
  }

  async getTheirDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.props.profile_id}`;
    const response = await fetch(url, {
      credentials: 'include',
      
    });
    if (response.ok) {
      this.setState({
        targetUser: await response.json(),
    });

    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }
  
  componentDidMount() {
    this.getTheirDetails();
  }
  
  heart1Click(){
    // let fullHeart = "bi bi-heart-fill" 
    // let emptyHeart = "bi bi-heart"
    // return(fullHeart)
    return <i className="bi bi-heart"></i>
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
              <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#RatingModalCenter">Rate {this.state.targetUser.first_name}</button>
            </div>
          </div>
        </div>



      {/* <!-- Modal --> */}
      <div className="modal fade" id="RatingModalCenter" tabIndex="-1" role="dialog" aria-labelledby="RatingModalCenter" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLongTitle">Rate {this.state.targetUser.first_name} from 1-5 hearts!</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={this.handleSubmit} id="create-rating">
              <span>
                <i className="bi bi-heart" id="heart1" onClick={(this.heart1Click())} value = "1"></i>
                <i className="bi bi-heart" id="heart2" value = "2"></i>
                <i className="bi bi-heart" id="heart3" value = "3"></i>
                <i className="bi bi-heart" id="heart4" value = "4"></i>
                <i className="bi bi-heart" id="heart5" value = "5"></i>
              </span>
              <button type="submit" className="btn btn-primary" value="Submit" form="create-rating">Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
        </>
      );
    }
  }
  
  export default ConnectionsDetailGrabber;


