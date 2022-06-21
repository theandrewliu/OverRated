import React from 'react';


function MessageRow(props) {
  const when = new Date(props.message.timestamp);
  return (
    <tr>
      <td>{props.message.username}</td>
      <td>{when.toLocaleString()}</td>
      <td>{props.message.content}</td>
    </tr>
  )
}
// Front End

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      profile: null,
      connected: false,
      message: '',
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
  }

  async getMyDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/mine`;
    const response = await fetch(url, {
      credentials: 'include',
      
    });
    if (response.ok) {
      const profile = await response.json();
      this.setState({
        profile: profile,
      });
      this.connect(profile);
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }

  connect(profile) {
    if (this.loading && !this.state.connected) {
      return;
    }
    this.loading = true;
    // Should be an environment variable in the future
    const url = `ws://localhost:8000/chat/${profile.username}`;
    this.socket = new WebSocket(url);
    this.socket.addEventListener('open', () => {
      this.setState({ connected: true });
      this.loading = false;
    });
    this.socket.addEventListener('close', () => {
      this.setState({ connected: false });
      this.loading = false;
      setTimeout(() => {
        this.connect();
      }, 1000);
    });
    this.socket.addEventListener('error', () => {
      this.setState({ connected: false });
      this.loading = false;
      setTimeout(() => {
        this.connect();
      }, 1000);
    });
    this.socket.addEventListener('message', message => {
      this.setState({
        messages: [
          JSON.parse(message.data),
          ...this.state.messages,
        ],
      });
    });
  }

  componentDidMount() {
    this.getMyDetails();
  }    

  sendMessage(e) {
    e.preventDefault();
    this.socket.send(this.state.message);
    this.setState({ message: '' });
  }

  updateMessage(e) {
    this.setState({ message: e.target.value });
  }

  render() {

    if (this.state.profile == null){
      return "Loading..."
    }

    return (
      <>
      <div className="chat-window">
      <div className="chat-header">
        <p>Poison Room</p>
        <h2>Your ID: {this.state.profile.username}</h2>
        <h2>Messages</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Date/Time</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {this.state.messages.map(message => (
              <MessageRow key={message.profile.username + message.timestamp}
                          message={message} />
            ))}
          </tbody>
        </table>
        <form onSubmit={this.sendMessage}>
            <input value={this.state.message}
                   className="form-control"
                   type="text"
                   id="messageText"
                   autoComplete="off"
                   onChange={this.updateMessage}/>
            <button disabled={!this.state.connected}
                    className="btn btn-primary">
              &#9658;
            </button>
        </form>
        </div>
      </div>
      </>
    )
  }
}

export default Chat;