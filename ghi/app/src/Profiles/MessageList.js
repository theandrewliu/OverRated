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


  componentDidMount() {
    this.getMyMessages();

  }


  render() {
    console.log(this.state.messages)
    if(this.state.redirect === true){
      return <Navigate to = '/login' />;
    }
    return (
      <>
      <h1>Your Connections</h1>
      <div className = 'message-layout'>{this.state.messages.messages.map(message => {
        let photoNull = 'profile-pic d-none'
        let photoAvailable = 'profile-pic'

        if (message.photo === null) {
          photoNull = 'profile-pic'
          photoAvailable = 'profile-pic d-none'
        }
        return (
        <div className = "message-card" key = {message.id}>
            <Link to ={`/messages/${message.recipient}/`}>
          <div className= "profileDetail" >
            <img className ={photoAvailable} src={ message.photo } alt="pic" width="auto" height="200" />
            <img className ={photoNull} src="/images/blank-profile-pic.png" alt="pic" width="auto" height="200" />
        </div>
          </Link>
        <div><b> {message.first_name + " " + message.last_name} </b> </div>
        <div>{message.message}</div>
        </div>
        )
      })}</div>
      </>
    );
  }
}

export default MessageList