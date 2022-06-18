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
      redirect: false,
  };
  }

  async getMyData() {
    
    const messagesUrl = `${process.env.REACT_APP_API_HOST}/api/messages`;
    let user = null
    let matches = null
    let messages = null
    let messagesResponse = await fetch(messagesUrl, {
      credentials: 'include',
    });
    if (messagesResponse.ok) {
        messages = await messagesResponse.json();
    } else if (messagesResponse.status === 401) {
      this.setState({ redirect: true })
    }
    console.log("set", messages)
    const matchesUrl = `${process.env.REACT_APP_API_HOST}/api/my-matches`;
    let matchesResponse = await fetch(matchesUrl, {
      credentials: 'include',
    });
    if (matchesResponse.ok) {
        matches = await matchesResponse.json();
    } else if (matchesResponse.status === 401) {
      this.setState({ redirect: true })
    }
    console.log("turbo", matches)
    const MyUrl = `${process.env.REACT_APP_API_HOST}/api/profiles/mine`;
    let MyResponse = await fetch(MyUrl, {
      credentials: 'include',
    });
    if (MyResponse.ok) {
        user = await MyResponse.json();
    } else if (MyResponse.status === 401) {
      this.setState({ redirect: true })
    }
    console.log("userinfopull", user.id)  
  }
//   async componentDidMount() {
//     const targetURL = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.props.target_id}`;
//     const messagesURL = `${process.env.REACT_APP_API_HOST}/api/messages/${this.props.target_id}`;
//     const userURL = `${process.env.REACT_APP_API_HOST}/api/profiles/mine/`;

//     const targetResponse = await fetch(targetURL, {credentials: 'include'});
//     const messageResponse = await fetch(messagesURL, {credentials: 'include'});
//     const userResponse = await fetch(userURL, {credentials: 'include'});
    
//     if (targetResponse.ok && messageResponse.ok && userResponse.ok) {
//         this.setState({
//             target: await targetResponse.json(),
//             messages: await messageResponse.json(),
//             user: await userResponse.json(),
//         });
//     } else if (targetResponse.status === 401 || messageResponse.status === 401 || userResponse.status === 401) {
//         this.setState({redirect: true})
//     }
// }


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
        {console.log("state ", this.state)}
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