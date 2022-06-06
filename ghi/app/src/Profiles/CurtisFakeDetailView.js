import React from 'react';

class MyProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
    };
  }

  async getMyDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/users/me`;
    const response = await fetch(url, {
      credentials: 'include',
    });
    if (response.ok) {
      this.setState({
        user: await response.json(),
      });
    }
  }

  componentDidMount() {
    this.getMyDetails();
  }

  render() {
    if (!this.state.user) {
      return null;
    }
    return (
      <div>{this.state.user.username}</div>
    );
  }
}


export default MyProfile;
