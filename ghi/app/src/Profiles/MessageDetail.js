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
            redirect: false,
        };
    }

    componentDidMount() {
        this.getMyMessages();
    }


    async getMyMessages() {
        const url = `${process.env.REACT_APP_API_HOST}/api/messages/${this.props.target_id}`;
        const response = await fetch(url, {
            credentials: 'include',
        });
        console.log("hello here")
        if (response.ok) {
            console.log("response is ok")
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
            <h1>Chat with -Name Here-</h1>
            {/* {console.log("inside return statement")} */}
            {console.log("first", this.state.messages.messages)}
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
                        </>
                    )
                })}
            </div>
            {/* <p>{this.state.messages.message}</p> */}
            </>
        );
    }
}

export default MessagesDetailGrabber;