import React from "react";
import { Navigate, Link } from "react-router-dom";



class ConnectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theirprofile: {'matches': []},
      ourprofile: "",
      redirect: false,
      id:[],
      messages: []
  };
  }

  async getMyMessages() {
    const url = `${process.env.REACT_APP_API_HOST}/api/messages`;
    const response = await fetch(url, {
      credentials: 'include',
      
    });
    if (response.ok) {
      this.setState({
        messages: await response.json(),
      });
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }

  componentDidMount() {
    this.getMyMessages();
  }


  render() {
    console.log("testarino", this.state.messages)
    if(this.state.redirect === true){
      return <Navigate to = '/login' />;
    }
    return (
      <>
      <h1>Your Messages</h1>
      <div>{this.state.theirprofile.matches.map(match => {
        console.log("print", this.state.ourprofile)
                            let photoNull = 'profile-pic d-none'
                            let photoAvailable = 'profile-pic'

                            if (match.photo === null) {
                              photoNull = 'profile-pic'
                              photoAvailable = 'profile-pic d-none'
                            }
                          return (
                            <div key = {match.id}>
                              <Link to ={`/api/profiles/${match.id}/`}>
                            <div className= "profileDetail" >
                              <img className ={photoAvailable} src={ match.photo } alt="pic" width="auto" height="200" />
                              <img className ={photoNull} src="/images/blank-profile-pic.png" alt="pic" width="auto" height="500" />
                            </div>
                            </Link>
                            <div key={match.first_name}><b> {match.first_name + " " + match.last_name} </b> </div>
                            </div>
                          )
                        })}</div>
      </>
    );
  }
}

export default ConnectionList