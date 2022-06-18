import React from "react";
import { Navigate, Link, useParams } from "react-router-dom";

function MessagesListGrabber(){
  const params = useParams();
  const target_id = params.id;
  return <MessageList target_id = {target_id}></MessageList>
}

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: {'messages': []},
      target: "",
      user: "",
      message: "",
      redirect: false,
  };
  }

  // async getMyData() {
    
  //   let url = `${process.env.REACT_APP_API_HOST}/api/messages`;
  //   let messages = null 
  //   let user = null
  //   let matches = null
  //   let target = null
  //   let response = await fetch(url, {
  //     credentials: 'include',
  //   });
  //   if (response.ok) {
  //       messages = await response.json();
  //   } else if (response.status === 401) {
  //     this.setState({ redirect: true })
  //   }
  //   console.log("set", messages)
  //   url = `${process.env.REACT_APP_API_HOST}/api/my-matches`;
  //   response = await fetch(url, {
  //     credentials: 'include',
  //   });
  //   if (response.ok) {
  //       matches = await response.json();
  //   } else if (response.status === 401) {
  //     this.setState({ redirect: true })
  //   }
  //   console.log("turbo", matches)
  //   url = `${process.env.REACT_APP_API_HOST}/api/profiles/mine`;
  //   response = await fetch(url, {
  //     credentials: 'include',
  //   });
  //   if (response.ok) {
  //       user = await response.json();
  //   } else if (response.status === 401) {
  //     this.setState({ redirect: true })
  //   }
  //   console.log("userinfopull", user)

  //   if(messages && matches){
  //     for(let message of messages){
  //       for(let match of matches) {
  //         console.log("match", match)
  //         console.log("message", message)
  //         if (message.match_id === match.match_id){
  //           target = match.id
  //           console.log("target in loop", target)

  //         }
  //       // target = matches.find(match => match.match_id === message.match_id)
        
  //       }
  //     }
  //     console.log("target", target)
  //     this.setState({ messages })
      
  //   }
    
  // }
  async componentDidMount() {
    const targetURL = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.props.target_id}`;
    const messagesURL = `${process.env.REACT_APP_API_HOST}/api/messages/${this.props.target_id}`;
    const userURL = `${process.env.REACT_APP_API_HOST}/api/profiles/mine/`;

    const targetResponse = await fetch(targetURL, {credentials: 'include'});
    const messageResponse = await fetch(messagesURL, {credentials: 'include'});
    const userResponse = await fetch(userURL, {credentials: 'include'});
    
    if (targetResponse.ok && messageResponse.ok && userResponse.ok) {
        this.setState({
            target: await targetResponse.json(),
            messages: await messageResponse.json(),
            user: await userResponse.json(),
        });
    } else if (targetResponse.status === 401 || messageResponse.status === 401 || userResponse.status === 401) {
        this.setState({redirect: true})
    }
}


  // componentDidMount() {
  //   this.getMyData();

  // }


  render() {
    if (this.state.redirect === true) {
      return <Navigate to='/login' />;
    }
    return (
      <>
      {console.log("messages", this.state.messages.messages)}
      {console.log("target", this.state.target)}
      {console.log("user", this.state.user)}
        <h1><b>Your Messages</b></h1>
        {console.log("state messages", this.state.messages)}
        <div className='message-layout'>{this.state.messages.messages.map(message => {
          console.log("message map", message)

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

export default MessagesListGrabber;