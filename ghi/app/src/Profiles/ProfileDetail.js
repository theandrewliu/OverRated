import React from "react";




class ProfileDetail extends React.Component {
    constructor(props) {
      super(props);
      this.setState({
        photo: "",
        about: "",
        height: "",
        job: "",
        education: "",
        gender: "",
        sexual_orientation: "",
        religion: "",
        pronouns: "",
        interested_in: "",
    });
    }
    
  
    async getMyDetails() {
      console.log("test", this.state)
      const url = `${process.env.REACT_APP_API_HOST}/users/me`;
      const response = await fetch(url, {
        credentials: 'include',
      });
      if (response.ok) {
        this.setState({
          about: await response.json(),
        });
      }
    }
  
    componentDidMount() {
      this.getMyDetails();
    }
  
    render() {
      return (
        <div>{this.state}</div>
      );
    }
  }
  
  export default ProfileDetail;