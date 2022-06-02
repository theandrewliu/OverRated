import React from "react";


class UsersForm extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            email: "",
            first_name: "",
            last_name: "",
            photo: "",
            about: "",
            height: "",
            job: "",
            education: "",
            gender: "",
            sexual_orientation: "",
            religion: "",
            ethnicity: "",
            pronouns: "",
        }
    }
}

export default UsersForm