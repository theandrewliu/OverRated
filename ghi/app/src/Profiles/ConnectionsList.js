import React from "react";
import { Navigate } from "react-router-dom";
import './connections.css';

export function calculateAge(date_of_birth) {
  var bday = new Date(date_of_birth);
  let today = new Date();

  var distance = today.valueOf() - bday.valueOf();
  var daysOld = Math.floor(distance / (1000 * 60 * 60 * 24));
  var yearsOld = Number((daysOld/365).toFixed(0));

    return yearsOld
}


class ConnectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theirprofile: {'matches': []},
      ourprofile: "",
      redirect: false,
  };
  }
  
  

  async getProfileMatches() {
    const url = `${process.env.REACT_APP_API_HOST}/api/my-matches`;
    const response = await fetch(url, {
      credentials: 'include',
    });
    console.log(this.state)
    if (response.ok) {
      this.setState({
        theirprofile: await response.json(),
      });
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }

  componentDidMount() {
    this.getProfileMatches();
  }


  render() {
    console.log("says", this.state.theirprofile.matches)
    if(this.state.redirect === true){
      return <Navigate to = '/login' />;
    }
    return (
      <>
      <h1>Your Connections</h1>
      <div className = 'card-layout'>{this.state.theirprofile.matches.map(match => {
                          return (
                            <div className = "connect-card">
                            <img key={match.photo} src={ match.photo } alt="pic" width="70%" height="70%" />
                            <div key={match.first_name}><b> {match.first_name + " " + match.last_name} </b> </div>
                            <div key={match.date_of_birth}><b>Age:</b> { calculateAge(match.date_of_birth) } </div>
                            <div key={match.review}><b>Review Score:</b> {match.average_rating}  </div>
                            <div key={match.location}><b>Location:</b> {match.location}  </div>
                            </div>
                          )
                        })}</div>
      </>
    );
  }
}

export default ConnectionList