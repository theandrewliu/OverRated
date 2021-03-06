import React from 'react';
import { useParams } from 'react-router-dom';

function ReviewIDGrabber(){
    const params = useParams();
    const target_id = params.id;
    return <ReviewForm target_id = {target_id}></ReviewForm>
  }

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

        const review_formURL = `${process.env.REACT_APP_API_HOST}/api/profiles/${this.props.target_id}/rating`;
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            credentials: "include",
            },
        };
        const response = await fetch(review_formURL, fetchConfig);
        if(response.ok){
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
                        <h1>Review</h1>
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


export default ReviewIDGrabber