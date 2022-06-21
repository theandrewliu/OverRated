import React from "react";
import { useParams } from "react-router-dom";
import './MessageDetail.css';


function MessagesDetailGrabber(){
    const params = useParams();
    const target_id = params.id;
    return <MessageDetail target_id = {target_id}></MessageDetail>
  }

export function formatDateTime(dateTime){
    let newFormat = Date.parse(dateTime)
    const d = new Date(newFormat)
    return d.toLocaleString('en-US', {month:'long', day:'numeric', year:'numeric', hour:'numeric', minute:'numeric'})
}

class MessageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: {'messages': []},
            target: "",
            user: "",
            message: "",
            redirect: false,
            dateTime: new Date().toISOString(),
            recipient: null, 
            reload: false,
        };

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "auto" });
      }

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

        this.scrollToBottom();

    }

    async componentDidUpdate() {
        this.scrollToBottom();
    }

    
    async handleSubmit(event) {
        event.preventDefault();
        
        this.setState({ reload: true });
        
        const data = {
            recipient: this.state.target.id,
            sent: this.state.dateTime,
            message: this.state.message
        };

        console.log("data:", data)

        const url = `${process.env.REACT_APP_API_HOST}/api/messages/`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        };
        const response = await fetch(url, fetchConfig);
        console.log("response:", response)
        if(response.ok) {
            const newMessage = await response.json();
            console.log("hello", newMessage)
            this.setState({
                message: "",
                reload: false
            })
            const messagesURL = `${process.env.REACT_APP_API_HOST}/api/messages/${this.props.target_id}`;
            const messageResponse = await fetch(messagesURL, {credentials: 'include'});
            if (messageResponse.ok) {
                this.setState({
                    messages: await messageResponse.json(), 
                })
            };
        }
    }
    

    handleMessageChange(event) {
        const value = event.target.value;
        this.setState({ message: value })
    }

    render() {
        let photoSRC = this.state.target.photo
        if (this.state.target.photo === null) {
            photoSRC = "/images/blank-profile-pic.png"
        }
        return(
            <>
                <h1>Chat with {this.state.target.first_name}</h1>
                <div className="container mt-4">
                
                        <div className="card mx-auto" style={{maxWidth: 500}} key={this.state.target.id}>
                            <div className="card-header bg-transparent">
                                <div className="navbar navbar-expand p-0">
                                    <ul className="navbar-nav me-auto align-items-center">
                                        <li className="nav-item">
                                            <a href="#!" className="nav-link chat-link">
                                                <div className="avatar">
                                                    <img src={photoSRC} class="img-fluid rounded-circle" />
                                                </div>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#!" className="nav-link chat-link">{this.state.target.first_name} {this.state.target.last_name}</a>
                                        </li>
                                    </ul>
                                    <ul className="navbar-nav ms-auto">
                                        <li className="nav-item">
                                            <a href="#!" className="nav-link chat-link">
                                                <i className="fas fa-phone-alt"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#!" className="nav-link chat-link">
                                                <i className="fas fa-video"></i>
                                            </a>
                                        </li>
                                        <li className="nav-item">
                                            <a href="#!" className="nav-link chat-link">
                                                <i className="fas fa-times"></i>
                                            </a>
                                        </li>
                                    </ul>                            
                                </div>
                            </div>
                            <div className="card p-4 chat-box pb-4 mb-4">


                            {console.log("messages", this.state.messages.messages)}
                            {console.log("target", this.state.target)}
                            {console.log("user", this.state.user)}

                            {this.state.messages.messages.map(message => {
                                let photoSRC = ''
                                let senderName = ''
                                let textAlign = ''
                                let targetAvatar = ''
                                let userAvatar = ''
                            
                                if (message.sender === this.state.target.id) {
                                    senderName = this.state.target.first_name
                                    photoSRC = this.state.target.photo
                                    textAlign = "d-flex align-items-baseline mb-4"
                                    targetAvatar = "position-relative avatar"
                                    userAvatar = "position-relative avatar d-none"

                                }
                                if (message.sender === this.state.user.id) {
                                    senderName = this.state.user.first_name
                                    photoSRC = this.state.user.photo
                                    textAlign = "d-flex align-items-baseline text-end justify-content-end mb-4"
                                    userAvatar = "position-relative avatar"
                                    targetAvatar = "position-relative avatar d-none"
                                
                                }
                                if (message.sender === this.state.target.id && this.state.target.photo === null) {
                                    photoSRC = "/images/blank-profile-pic.png"
                                } 

                                if (message.sender === this.state.user.id && this.state.user.photo === null) {
                                    photoSRC = "/images/blank-profile-pic.png"
                                } 


                            
                            return (<>
                                <div className={textAlign} key={message.id}>
                                    <div className={targetAvatar}>
                                        <img src={photoSRC} class="img-fluid rounded-circle" />
                                    </div>
                                    <div className="pe-2">
                                        <div>
                                            <div className="card card-text d-inline-block p-2 px-3 m-1">
                                                {message.message}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="small">
                                                {formatDateTime(message.sent)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={userAvatar}>
                                        <img src={photoSRC} class="img-fluid rounded-circle" />
                                    </div>
                                </div>
                            </>
                            )
                            })}
                                <div>
                            <div className="MessageContainer" >
                                <div className="MessagesList">
                                </div>
                                <div style={{ float:"left", clear: "both" }}
                                    ref={(el) => { this.messagesEnd = el; }}>
                                </div>
                            </div>
                            </div>
                            </div>
                            <div className="card-footer bg-white position-absolute w-100 bottom-0 m-0 p-1">
                                <div className="input-group">
                                    <div className="input-group-text bg-transparent border-0">
                                        <button className="btn btn-light text-secondary">
                                            <i className="fas fa-paperclip"></i>
                                        </button>
                                    </div>
                                    <form onSubmit={this.handleSubmit} id="create-message" className="form-control border-0">
                                        <input onChange={this.handleMessageChange} className="form-control border-0" value ={this.state.message} type="text"  placeholder="Write a message..." />
                                    </form>
                                    <div className="input-group-text bg-transparent border-0">
                                        <button className="btn btn-light text-secondary">
                                            <i className="fas fa-smile"></i>
                                        </button>
                                    </div> 
                                    <div className="input-group-text bg-transparent border-0">
                                        <button className="btn btn-light text-secondary">
                                            <i className="fas fa-microphone"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </>
        );
    }
}

export default MessagesDetailGrabber;


