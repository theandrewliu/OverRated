import React from "react";
import { Navigate } from "react-router-dom";
import './connections.css';


class ConnectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theirprofile: {'matches': []},
      ourprofile: "",
      redirect: false,
  };
  }

  async getProfileMatches() {
    const url = `${process.env.REACT_APP_API_HOST}/api/my-matches`;
    const response = await fetch(url, {
      credentials: 'include',
    });
    console.log(this.state)
    if (response.ok) {
      this.setState({
        theirprofile: await response.json(),
      });
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }

  componentDidMount() {
    this.getProfileMatches();
  }


  render() {
    console.log("says", this.state.theirprofile.matches)
    if(this.state.redirect === true){
      return <Navigate to = '/login' />;
    }
    return (
      <>
      <h1>this is a tests</h1>
      <div>{this.state.theirprofile.matches.map(match => {
                          return (
                            <p key={match.first_name}> {match.first_name}  </p>
                          )
                        })}</div>
      </>
    );
  }
}

export default ConnectionList