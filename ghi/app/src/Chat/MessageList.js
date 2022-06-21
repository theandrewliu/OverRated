import React from "react";
import { Navigate } from "react-router-dom";
import { formatDateTime } from "./MessageDetail";

class MessageList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: { messages: [] },
      matches: { matches: [] },
      user: "",
      message: "",
      redirect: false,
    };
  }

  async componentDidMount() {
    const matchesURL = `${process.env.REACT_APP_API_HOST}/api/my-matches/`;
    const messagesURL = `${process.env.REACT_APP_API_HOST}/api/messages/`;
    const userURL = `${process.env.REACT_APP_API_HOST}/api/profiles/mine/`;

    const matchesResponse = await fetch(matchesURL, { credentials: "include" });
    const messageResponse = await fetch(messagesURL, {
      credentials: "include",
    });
    const userResponse = await fetch(userURL, { credentials: "include" });

    if (matchesResponse && messageResponse.ok && userResponse.ok) {
      this.setState({
        matches: await matchesResponse.json(),
        messages: await messageResponse.json(),
        user: await userResponse.json(),
      });
    } else if (
      matchesResponse.status === 401 ||
      messageResponse.status === 401 ||
      userResponse.status === 401
    ) {
      this.setState({ redirect: true });
    }
  }

  render() {
    if (this.state.redirect === true) {
      return <Navigate to="/login" />;
    }
    return (
      <>
        <h1>
          <b>Your Messages</b>
        </h1>

        {console.log("corey test:", this.state)}
        {console.log("matches", this.state.matches.matches)}
        {console.log("messages", this.state.messages.messages)}
        {console.log("user", this.state.user)}

        <div className="message-layout">
          {this.state.messages.messages.map((message) => {
            let photo = message.photo;
            if (message.photo === null) {
              photo = "/images/blank-profile-pic.png";
            }

            let targetID = message.recipient;
            if (targetID === this.state.user.id) {
              targetID = message.sender;
            }

            return (
              <ul className="list-unstyled mb-0" key={message.match_id}>
                <li className="p-2 border-bottom" style={{backgroundColor: 'eee'}} >
                  <a href={`/messages/${targetID}`} className="d-flex justify-content-between" style={{textDecoration: 'none'}}>
                    <div className="d-flex flex-row">
                      <img src={photo} alt="avatar"
                        className="rounded-circle d-flex align-self-center me-3 shadow-1-strong" width="60" />
                      <div className="pt-1">
                        <p className="fw-bold mb-0">{message.first_name} {message.last_name}</p>
                        <p className="small text-muted">{message.message}</p>
                      </div>
                    </div>
                    <div className="pt-1">
                      <p className="small text-muted mb-1">{formatDateTime(message.sent)}</p>
                      {/* <span className="badge bg-danger float-end">1</span> */}
                    </div>
                  </a>
                </li>
              </ul>
            );
          })}
        </div>
      </>
    );
  }
}

export default MessageList;
