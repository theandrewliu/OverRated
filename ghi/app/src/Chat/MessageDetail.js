import React from "react";
import { useParams } from "react-router-dom";
import './MessageDetail.css';
import blankpic from "../blank-profile-pic.png"


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
        const userURL = `${process.env.REACT_APP_API_HOST}/api/profiles/mine`;

        const targetResponse = await fetch(targetURL, {credentials: 'include'});
        const userResponse = await fetch(userURL, {credentials: 'include'});
        
        if (targetResponse.ok && userResponse.ok) {
            this.setState({
                target: await targetResponse.json(),
                user: await userResponse.json(),
            });
        } else if (targetResponse.status === 401 || userResponse.status === 401) {
            this.setState({redirect: true})
        }

        await this.getMessages()
        this.scrollToBottom();
        this.timer = setTimeout(() => this.getMessages(),100)
    }
    componentWillUnmount() {
        clearTimeout(this.timer)
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

        const url = `${process.env.REACT_APP_API_HOST}/api/messages`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        };
        const response = await fetch(url, fetchConfig);
        if(response.ok) {
            this.setState({
                message: "",
                reload: false
            })
            this.getMessages()
        }
    }

    async getMessages() {
        const messagesURL = `${process.env.REACT_APP_API_HOST}/api/messages/${this.props.target_id}`;
        const messageResponse = await fetch(messagesURL, {credentials: 'include'});
        if (messageResponse.ok) {
            this.setState({
                messages: await messageResponse.json(), 
            })
        };
        this.timer = setTimeout(() => this.getMessages(),100)
    }
    

    handleMessageChange(event) {
        const value = event.target.value;
        this.setState({ message: value })
    }

    render() {
        let photoSRC = this.state.target.photo
        if (this.state.target.photo === null) {
            photoSRC = blankpic
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
                                            <a href={`${process.env.PUBLIC_URL}/profiles/${this.state.target.id}`} className="nav-link chat-link">
                                                <div className="avatar">
                                                    <img src={photoSRC} className="avatarPhoto img-fluid rounded-circle" alt='photoSRC' />
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


                            {this.state.messages.messages.map(message => {
                                let photoSRC = ''
                                let textAlign = ''
                                let targetAvatar = ''
                                let userAvatar = ''
                            
                                if (message.sender === this.state.target.id) {
                                    photoSRC = this.state.target.photo
                                    textAlign = "d-flex align-items-baseline mb-4"
                                    targetAvatar = "position-relative avatar"
                                    userAvatar = "position-relative avatar d-none"

                                }
                                if (message.sender === this.state.user.id) {
                                    photoSRC = this.state.user.photo
                                    textAlign = "d-flex align-items-baseline text-end justify-content-end mb-4"
                                    userAvatar = "position-relative avatar"
                                    targetAvatar = "position-relative avatar d-none"
                                
                                }
                                if (message.sender === this.state.target.id && this.state.target.photo === null) {
                                    photoSRC = blankpic
                                } 

                                if (message.sender === this.state.user.id && this.state.user.photo === null) {
                                    photoSRC = blankpic
                                } 


                            
                            return (<>
                                <div className={textAlign} key={message.id}>
                                    <div className={targetAvatar}>
                                        <img src={photoSRC} class="avatarPhoto img-fluid rounded-circle" alt="photoSRC"/>
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
                                        <img src={photoSRC} class="avatarPhoto img-fluid rounded-circle" alt="photoSRC"/>
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


