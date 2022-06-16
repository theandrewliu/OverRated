import React from "react";
import { Navigate, Link } from "react-router-dom";

class MessageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            target_id: 0
        }
    }
}

async getMyMessage() {
    const url = `${process.env.REACT_APP_API_HOST}/api/messages/${this.props.target_id}`
    const response = await fetch(url, {
        credentials: 'include',
    });
    if (response.ok) {
        this.setState({
            messages: await response.json(),
        })
    }
}