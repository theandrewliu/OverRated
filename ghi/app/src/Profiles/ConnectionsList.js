import React from "react";
import { Navigate, Redirect } from "react-router-dom";
import './connections.css';



export function calculateAge(date_of_birth) {
  var bday = new Date(date_of_birth);
  let today = new Date();

  var distance = today.valueOf() - bday.valueOf();
  var daysOld = Math.floor(distance / (1000 * 60 * 60 * 24));
  var yearsOld = Number((daysOld/365).toFixed(0));

    return yearsOld
}

export function profileDetail(id) {
  console.log(id)
  return <Navigate to = {`/api/profiles/${id}`} />;
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
    if(this.state.redirect === true){
      return <Navigate to = '/login' />;
    }
    return (
      <>
      <h1>Your Connections</h1>
      <div className = 'card-layout'>{this.state.theirprofile.matches.map(match => {
                            let photoNull = 'profile-pic d-none'
                            let photoAvailable = 'profile-pic'

                            if (match.photo === null) {
                              photoNull = 'profile-pic'
                              photoAvailable = 'profile-pic d-none'
                            }
                          return (
                            <div className = "connect-card" key = {match.id}>
                            <div className = "profileDetail" onClick = {()=>profileDetail(match.id)}>
                              <img className ={photoAvailable} src={ match.photo } alt="pic" width="auto" height="500" />
                              <img className ={photoNull} src="/images/blank-profile-pic.png" alt="pic" width="auto" height="500" />
                            </div>
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