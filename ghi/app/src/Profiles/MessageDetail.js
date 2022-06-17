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
            profiles: "",
            input: "",
            redirect: false,
        };
    }

    componentDidMount() {
        this.getMyMessages();
        this.getTargetInfo();
    }

    async handleSubmit(event) {
        event.preventDefault();

        const url = ''

    }

    async getTargetInfo() {
        const url = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.props.target_id}`;
        const response = await fetch(url, {
            credentials: 'include',
        });
        if (response.ok) {
            this.setState({
                profiles: await response.json(),
            });
        } else if (response.status === 401) {
            this.setState({redirect: true})
        }
    }

    async getMyMessages() {
        const url = `${process.env.REACT_APP_API_HOST}/api/messages/${this.props.target_id}`;
        const response = await fetch(url, {
            credentials: 'include',
        });
        if (response.ok) {
            this.setState({
                messages: await response.json(),
            });
        } else if (response.status === 401) {
            this.setState({redirect: true})
        }
    } 

    render() {
        return(
            <>
            <h1>Chat with {this.state.profiles.first_name}</h1>
            {/* {console.log("inside return statement")} */}
            {console.log("first", this.state.messages.messages)}
            {console.log("did this work", this.state.profiles)}
            <div>
                {this.state.messages.messages.map(message => {
                    return (<>
                        {console.log(message)}
                        <div>
                            Time: {message.sent}
                        </div>
                        <div>
                            Message: {message.message}
                        </div>
                        <div>
                            Photo: {this.state.profiles.photo}
                        </div>
                        <div>
                            Name: {this.state.profiles.first_name} {this.state.profiles.last_name}
                        </div>
                        </>
                    )
                })}
            </div> 
            </>
        );
    }
}

export default MessagesDetailGrabber;