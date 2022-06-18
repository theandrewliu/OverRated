import React from "react";
import { Navigate, Link } from "react-router-dom";


class MessageList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          messages: {'messages': []},
          matches: {'matches': []},
          user: "",
          message: "",
          redirect: false,
      };
  }

  async componentDidMount() {
      const matchesURL = `${process.env.REACT_APP_API_HOST}/api/my-matches/`;
      const messagesURL = `${process.env.REACT_APP_API_HOST}/api/messages/`;
      const userURL = `${process.env.REACT_APP_API_HOST}/api/profiles/mine/`;

      const matchesResponse = await fetch(matchesURL, {credentials: 'include'});
      const messageResponse = await fetch(messagesURL, {credentials: 'include'});
      const userResponse = await fetch(userURL, {credentials: 'include'});
      
      if (matchesResponse && messageResponse.ok && userResponse.ok) {
          this.setState({
              matches: await matchesResponse.json(),
              messages: await messageResponse.json(),
              user: await userResponse.json(),
          });
      } else if (matchesResponse.status === 401 || messageResponse.status === 401 || userResponse.status === 401) {
          this.setState({redirect: true})
      }
  }

  render() {
    if (this.state.redirect === true) {
      return <Navigate to='/login' />;
    }
    return (
      <>
        <h1><b>Your Messages</b></h1>

        {console.log("corey test:", this.state)}
        {console.log("matches", this.state.matches.matches)}
        {console.log("messages", this.state.messages.messages)}
        {console.log("user", this.state.user)}

        <div className='message-layout'>
          {this.state.messages.messages.map(message => {

            let photo = message.photo
            if (message.photo === null) {
              photo = "/images/blank-profile-pic.png"
            }
            
            let targetID = message.recipient
            if (targetID === this.state.user.id) {
                targetID = message.sender
            } 

          return (
            <div className="message-card" key={message.match_id}>
              {console.log("user id:", this.state.user.id)}
              <div></div>
              <Link to={`/messages/${targetID}/`}>
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

export default MessageList;