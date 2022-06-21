import React from "react";
import { Navigate } from "react-router-dom";



class ReviewList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: "",
      reviews: "",
  };
  }
  async getMyDetails() {
    // Waiting for Reviews table
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
        return <Navigate to = '/review' />;
      }
      return (
        <div>
          <div className = 'container_review' >
              <h1>
                {this.state.profile.first_name + " " + this.state.profile.last_name}
              </h1>            
            {this.state.profile.photo}
          </div>
          <div>
              <h1>
                Reviews
              </h1>
            {/* {this.state.profile.stars} */}
            {this.state.profile.reviews}
          </div>
        </div>
      );
    }
  }


  export default ReviewList;






