import React from "react";
import { Navigate, Link } from "react-router-dom";



class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      id: [],
      messages: [],
    };
  }

  async getMyData() {
    
    let url = `${process.env.REACT_APP_API_HOST}/api/messages`;
    let messages = null 
    let matches = null
    let target = null
    let response = await fetch(url, {
      credentials: 'include',
    });
    if (response.ok) {
        messages = await response.json();
    } else if (response.status === 401) {
      this.setState({ redirect: true })
    }
    console.log("set", messages)
    url = `${process.env.REACT_APP_API_HOST}/api/my-matches`;
    response = await fetch(url, {
      credentials: 'include',
    });
    if (response.ok) {
        matches = await response.json();
    } else if (response.status === 401) {
      this.setState({ redirect: true })
    }
    console.log("turbo", matches)
    if(messages && matches){
      for(let message of messages){
        for(let match of matches) {
          console.log("match", match)
          console.log("message", message)
          if (message.match_id === match.match_id){
            target = match.id
            console.log("target in loop", target)

          }
        // target = matches.find(match => match.match_id === message.match_id)
        }
      }
      console.log("target", target)
      this.setState({ messages })
      
    }
  }


  componentDidMount() {
    this.getMyData();

  }


  render() {
    if (this.state.redirect === true) {
      return <Navigate to='/login' />;
    }
    return (
      <>
        <h1><b>Your Messages</b></h1>
        {console.log("pow", this.target)}
        {console.log("pepperochinis", this.state.messages)}
        <div className='message-layout'>{this.state.messages.map(message => {

          let photo = message.photo
          if (message.photo === null) {
            photo = "/images/blank-profile-pic.png"

            
          }
          
          return (

            <div className="message-card" key={message.match_id}>
              <div></div>
              <Link to={`/messages/${message.match_id}/`}>
                <div className="img-fluid rounded-4" >
                  <img className="rounded float-left" src={photo} alt="pic" width="auto" height="150" />
                </div>
              </Link>
              <table className='container' scope='row'>
                <div class="row">
                  <h1 scope="col-sm">
                    <b> {message.first_name + " " + message.last_name} </b>
                  </h1>
                  <tr scope="col-sm">
                    <td>{message.message}</td>
                  </tr>
                </div>
              </table>
            </div>
          )
        })}
        </div>
      </>
    );
  }
}

export default MessageList