import React from 'react';

class ReviewForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            review: '',
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleReviewChange = this.handleReviewChange.bind(this); 
        this.handleSubmit = this.handleSubmit.bind(this);  
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};

        const review_formURL = 'http://localhost:8090/api/salesperson/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(review_formURL, fetchConfig);
        if(response.ok){
            const new_salesperson = await response.json();
            console.log(new_salesperson);
            this.setState({
                username: '',
                review: '',
            });
        }
    }


    handleUsernameChange(event) {
        const value = event.target.value;
        this.setState({ username: value });
    }

    handleReviewChange(event) {
        const value = event.target.value;
        this.setState({ review: value });
    }
    
    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>How Toxic can You Be?</h1>
                        <form onSubmit={this.handleSubmit} id="create-form">
                        <div className="form-floating mb-3">
                            <input onChange={this.handleUsernameChange} placeholder="Username" required type="text" name="username" id="username" className="form-control" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input onChange={this.handleReviewChange} placeholder="Review" required type="text" name="review" id="review" className="form-control" />
                            <label htmlFor="review">Review</label>
                        </div>
                        <button type="submit" className="btn btn-primary" value="Submit" form="create-form">Fatality</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }

}


export default ReviewForm