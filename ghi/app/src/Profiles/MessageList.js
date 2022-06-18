import React from "react";
import { Navigate, Link } from "react-router-dom";



class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theirprofile: {'messages': []},
      ourprofile: "",
      redirect: false,
      id:[],
      messages: {'messages': []}
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
    this.getMyMessages();
    this.getProfileMatches();

  }


  render() {
    if(this.state.redirect === true){
      return <Navigate to = '/login' />;
    }
    return (
      <>
      <h1><b>Your Messages</b></h1>
      <div className = 'message-layout'>{this.state.messages.messages.map(message => {

        let photo = message.photo
        if (message.photo === null) {
          photo = "/images/blank-profile-pic.png"

          let identifier = message.recipient 
          {this.state.theirprofile.matches.map(match => {
            console.log("fuuck", identifier)
            console.log("Hopefully", message)
            console.log("this works", match)
            if (identifier != match.id){
              identifier = match.id
            }
          })}
          console.log("Post iteration", identifier)
        }
        
        return (
        <div className="container">
          <div className="row">
            <div className="col-sm-3" key = {message.id}>
              <Link to ={`/messages/${message.sender}/`}>
                <div>
                  <img className="rounded-4 float-left" src={ photo } alt="pic" width="auto" height="150" />
                </div>
              </Link>
              <div className="col-sm-9">
                <div className="row">
                  <h2>{message.first_name + " " + message.last_name}</h2>
                </div>
                <div className="row">
                  {message.message}
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      })}
      </div>
      </>
    );
  }
}

export default MessageList