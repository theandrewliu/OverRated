import React from "react";
import { useParams } from "react-router-dom";


function MessagesDetailGrabber(){
    const params = useParams();
    const target_id = params.id;
    return <MessageDetail target_id = {target_id}></MessageDetail>
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
        };

        this.handleMessageChange = this.handleMessageChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
    }

    
    async handleSubmit(event) {
        event.preventDefault();

        const data = this.input;

        const url = `${process.env.REACT_APP_API_HOST}/api/messages/`
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if(response.ok) {
            const test = await response.json();
            this.setState({
                message: "",
            })
        }

    }
    

    handleMessageChange(event) {
        const value = event.target.value;
        this.setState({ message: value })
    }

    render() {
        return(
            <>
            <h1>Chat with {this.state.target.first_name}</h1>
            {/* {console.log("inside return statement")} */}
            {console.log("first", this.state.messages.messages)}
            {console.log("target", this.state.target)}
            {console.log("user", this.state.user)}
            <div>
                {this.state.messages.messages.map(message => {
                    let photoNull = 'profile-pic d-none'
                    let photoAvailable = 'profile-pic'

                    if (this.state.target.photo === null) {
                        photoNull = 'profile-pic'
                        photoAvailable = 'profile-pic d-none'
                    }
                    return (<>
                        {console.log(message)}
                        <div>
                            Time: {message.sent}
                        </div>
                        <div>
                            Message: {message.message}
                        </div>
                        <div>
                            Photo:
                            <img className ={photoAvailable} src={ this.state.target.photo } alt="pic" width="auto" height="100" />
                            <img className ={photoNull} src="/images/blank-profile-pic.png" alt="pic" width="auto" height="100" />
                        </div>
                        <div>
                            Name: {this.state.target.first_name} {this.state.target.last_name}
                        </div>
                        </>
                    )
                })}
                <form onSubmit={this.handleSubmit} id="create-message">
                    <input onChange={this.handleMessageChange} value ={this.state.message} placeholder="Chat Here" type="text"/><button className="btn btn-primary">Send</button>
                </form>
            </div> 
            </>
        );
    }
}

export default MessagesDetailGrabber;