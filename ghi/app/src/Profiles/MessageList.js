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
      <h1>Your Messages</h1>
      <div className = 'message-layout'>{this.state.messages.messages.map(message => {
        let photo = message.photo

        if (message.photo === null) {
          photo = "/images/blank-profile-pic.png"
        }
        return (
        <div className = "message-card" key = {message.id}>
            <Link to ={`/messages/${message.sender}/`}>
          <div className= "img-fluid rounded-4" >
            <img className="rounded float-left" src={ photo } alt="pic" width="auto" height="200" />
        </div>
          </Link>
          <table className ='table-responsive' scope='row'>
            <h1 scope='col'>
            <b> {message.first_name + " " + message.last_name} </b>
            </h1>
            <tr scope='col'>
              <td>{message.message}</td>
            </tr>
          </table>
        </div>
        )
      })}</div>
      </>
    );
  }
}

export default MessageList