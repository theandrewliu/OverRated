import React from "react";

class MessageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
        };
    }

async getMyMessage() {
    const url = `${process.env.REACT_APP_API_HOST}/api/messages/${this.props.target_id}`;
    const response = await fetch(url, {
        credentials: 'include',
    });
    if (response.ok) {
        this.setState({
            messages: await response.json(),
        });
    } else {
        throw new Error("Response not ok")
    }
} 

render() {
    return(
        <>
        <h1>hello</h1>
        {console.log(this.state)}
        {/* <><p>{this.state.messages}</p></> */}
        </>
    )
}



}

export default MessageDetail;