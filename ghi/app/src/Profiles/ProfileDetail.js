import React from "react";
import { Navigate } from "react-router-dom";


class ProfileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      about: "",
      redirect: false,
  };
  }

  async getMyDetails() {
    const url = `${process.env.REACT_APP_API_HOST}/api/profiles/mine`;
    const response = await fetch(url, {
      credentials: 'include',
      
    });
    if (response.ok) {
      this.setState({
        about: await response.json(),
      });
    }else if (response.status === 401){
      this.setState({redirect: true})
    }
  }

  componentDidMount() {
    this.getMyDetails();
  }
    // constructor(props) {
    //   super(props);
    //   this.setState({
    //     photo: "",
    //     about: "",
    //     height: "",
    //     job: "",
    //     education: "",
    //     gender: "",
    //     sexual_orientation: "",
    //     religion: "",
    //     pronouns: "",
    //     user: "",
    // });
    // }
    
  //   async getMyDetails() {
  //     const url = `${process.env.REACT_APP_API_HOST}/users/me`;
  //     const response = await fetch(url, {
  //       credentials: 'include',
  //     });
  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data)
  //       this.setState({
  //         about: data.about
          
  //       });

  //     }
  //   }
  
  //   async componentDidMount() {
  //     const url = "http://localhost:3000/api/my_profile/";
  //     const response = await fetch(url);
  //     console.log(response)
  
  //     if (response.ok) {
  //         const data = await response.json();
  //         console.log(data)
  //         this.setState({ about: data.about})
  //     }
  // }
    
  
    render() {
      console.log(this.state)
      if(this.state.redirect === true){
        return <Navigate to = '/login' />;
      }
      return (
        <div>{this.state.about.id}</div>
      );
    }
  }
  
  export default ProfileDetail;


