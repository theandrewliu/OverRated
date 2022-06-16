import React from "react";
import { Navigate, Link } from "react-router-dom";
import './connections.css';



export function calculateAge(date_of_birth) {
  var bday = new Date(date_of_birth);
  let today = new Date();

  var distance = today.valueOf() - bday.valueOf();
  var daysOld = Math.floor(distance / (1000 * 60 * 60 * 24));
  var yearsOld = Number((daysOld/365).toFixed(0));

    return yearsOld
}

export function scoreToStar(score) {
    let emptyHeart = "bi bi-heart"
    let halfHeart = "bi bi-heart-half"
    let fullHeart = "bi bi-heart-fill"
    let rating = score

    if (rating === null){
      return(<><span><i className={emptyHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i></span></>)
     } else if (score >= .5 && score < 1) {
      return(<><span><i className={halfHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i></span></>)
     } else if (score >= 1 && score < 1.5) {
      return(<><span><i className={fullHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i></span></>)
     } else if (score >= 1.5 && score < 2) {
      return(<><span><i className={fullHeart}></i><i className={halfHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i></span></>)
     } else if (score >= 2 && score < 2.5) {
      return(<><span><i className={fullHeart}></i><i className={fullHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i></span></>)
     } else if (score >= 2.5 && score < 3) {
      return(<><span><i className={fullHeart}></i><i className={fullHeart}></i><i className={halfHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i></span></>)
     } else if (score >= 3 && score < 3.5) {
      return(<><span><i className={fullHeart}></i><i className={fullHeart}></i><i className={fullHeart}></i><i className={emptyHeart}></i><i className={emptyHeart}></i></span></>)
     } else if (score >= 3.5 && score < 4) {
      return(<><span><i className={fullHeart}></i><i className={fullHeart}></i><i className={fullHeart}></i><i className={halfHeart}></i><i className={emptyHeart}></i></span></>)
     } else if (score >= 4 && score < 4.5) {
      return(<><span><i className={fullHeart}></i><i className={fullHeart}></i><i className={fullHeart}></i><i className={fullHeart}></i><i className={emptyHeart}></i></span></>)
     } else if (score >=4.5){
      return(<><span><i className={fullHeart}></i><i className={fullHeart}></i><i className={fullHeart}></i><i className={fullHeart}></i><i className={fullHeart}></i></span></>)
     }
    }


// export function scoreToStar(score) {
//    let rating = score
//    if (score == null){
//     return(`<i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i>`)
//    } else if (score >= .5 && score < 1) {
//     return(`<i className="bi bi-heart-half"></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i>`)
//    } else if (score >= 1 && score < 1.5) {
//     return(`<i className="bi bi-heart-fill"></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i>`)
//    } else if (score >= 1.5 && score < 2) {
//     return(`<i className="bi bi-heart-fill"></i><i className="bi bi-heart-half"></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i>`)
//    } else if (score >= 2 && score < 2.5) {
//     return(`<i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i>`)
//    } else if (score >= 2.5 && score < 3) {
//     return(`<i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className="bi bi-heart-half"></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i>`)
//    } else if (score >= 3 && score < 3.5) {
//     return(`<i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className={"bi bi-heart"}></i><i className={"bi bi-heart"}></i>`)
//    } else if (score >= 3.5 && score < 4) {
//     return(`<i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className="bi bi-heart-half"></i><i className={"bi bi-heart"}></i>`)
//    } else if (score >= 4 && score < 4.5) {
//     return(`<i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className={"bi bi-heart"}></i>`)
//    } else if (score >=4.5){
//     return(`<i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i><i className="bi bi-heart-fill"></i>`)
//    }
// }

class ConnectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theirprofile: {'matches': []},
      ourprofile: "",
      redirect: false,
      id:[]
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
                              <Link to ={`/api/profiles/${match.id}/`}>
                            <div className= "profileDetail" >
                              <img className ={photoAvailable} src={ match.photo } alt="pic" width="auto" height="500" />
                              <img className ={photoNull} src="/images/blank-profile-pic.png" alt="pic" width="auto" height="500" />
                            </div>
                            </Link>
                            <div key={match.first_name}><b> {match.first_name + " " + match.last_name} </b> </div>
                            <div key={match.date_of_birth}><b>Age:</b> { calculateAge(match.date_of_birth) } </div>
                            <div key={match.review}><b>Rating Average:</b> {scoreToStar(match.average_rating)} </div>
                            <div key={match.location}><b>Location:</b> {match.location}  </div>
                            {/* <i className="bi bi-heart"></i> */}
                            </div>
                          )
                        })}</div>
      </>
    );
  }
}

export default ConnectionList