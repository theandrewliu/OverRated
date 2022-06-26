import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import '../CSS/login.css';


const containerStyle= {
    width: '100vw',
    height: '100vh',
    backgroundImage: `url($'{/bike.JPG'})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
}

class LoginForm extends React.Component{
    state={
        username:'',
        password:'',
        showPassword: false,
        error: '',
    }

    handleChange = (e) =>{
        const {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const error = await this.props.login(this.state.username, this.state.password);
        this.setState({ error: error })
        this.setState({
            username: '',
            password: '',
            showPassword: false,
        });
    }

    validForm() {
        return this.state.password.length >= 8 &&
               this.state.username
    }
    render(){

        if (this.props.token) {
            return <Navigate to="/my_profile" />;
        }

        return(
    
            <div className="row_login" style={containerStyle}>
                <div className="offset-3 col-6" id="wrapper" >
                    <div className="shadow p-4 mt-4" id="outbox" >
                        <div dangerouslySetInnerHTML={{__html: this.state.error}} />
                        <form onSubmit={this.handleSubmit} id="login-form" >
                            <h1>Welcome Back!</h1>
                            <p>Hello World</p>
                            <hr/>
                        
                            <div className="form-floating mb-3">
                                <input type='text' id="loginusername" name='username' placeholder='Username' 
                                    required onChange={this.handleChange} />
                            </div>
                            <div className="form-floating mb-3" >
                                <input type={this.state.showPassword ? "text" : "password"} id="loginpagepass" name='password' placeholder='●●●●●●●●' 
                                    required onChange={this.handleChange} />
                                    
                                <button className='input-group-text bg-dark text-light' type="button"
                                    onClick={() => this.setState({showPassword: !this.state.showPassword})}>Show Password
                                </button>
                            </div>
                            <hr/>
                            <div>
                                <button 
                                    type="submit" name='loginbutton'
                                    disabled={!this.validForm()} 
                                    className="btn btn-primary" form="login-form">Log In
                                </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <Link to='/login/new'>Forgot Password?</Link> 
                            </div>
                            <ul class="social-links">
                                <li class="google">
                                    <svg viewBox="0 0 18.005 18.005">
                                    <g transform="translate(-40 -40)">
                                        <path d="M57.83,47.239H57.1V47.2H49v3.6H54.09a5.406,5.406,0,1,1-1.5-5.834l2.546-2.546A8.993,8.993,0,1,0,58,49,9.059,9.059,0,0,0,57.83,47.239Z" fill="#fff" />
                                    </g>
                                    </svg>
                                </li>
                                <li class="facebook">
                                    <svg viewBox="0 0 18 17.909">
                                    <path d="M9,0A8.995,8.995,0,0,0,7.655,17.889v-6.5H5.429V9.02H7.655V7.444c0-2.6,1.269-3.75,3.434-3.75a12.915,12.915,0,0,1,1.846.112V5.871H11.458c-.92,0-1.24.873-1.24,1.854v1.3h2.7l-.366,2.365H10.219v6.524A9,9,0,0,0,9,0Z" fill="#fff" />
                                    </svg>
                                </li>
                                <li class="twitter">
                                    <svg viewBox="0 0 18 14.499">
                                    <g transform="translate(-59.969 -90)">
                                        <path d="M77.969,91.714a7.492,7.492,0,0,1-2.123.581,3.689,3.689,0,0,0,1.625-2.029,7.408,7.408,0,0,1-2.346.888,3.683,3.683,0,0,0-6.289,3.34,10.524,10.524,0,0,1-7.611-3.827,3.648,3.648,0,0,0,1.142,4.891,3.759,3.759,0,0,1-1.674-.457v.043a3.671,3.671,0,0,0,2.961,3.59,3.68,3.68,0,0,1-.97.131,3.91,3.91,0,0,1-.7-.068,3.7,3.7,0,0,0,3.449,2.543,7.463,7.463,0,0,1-4.587,1.567,7.267,7.267,0,0,1-.88-.052A10.554,10.554,0,0,0,65.63,104.5,10.388,10.388,0,0,0,76.138,94.083c0-.159,0-.317-.012-.472a7.267,7.267,0,0,0,1.843-1.9" fill="#fff" />
                                    </g>
                                    </svg>
                                </li>
                                <li class="yahoo">
                                    <svg viewBox="0 0 18.019 13.949">
                                    <g transform="translate(-386.983 -220.194)">
                                        <path d="M36.77,33.078a17.093,17.093,0,0,1-3.523.11c-1.294.012-2.588.121-3.882.127a.28.28,0,0,0-.266.144.246.246,0,0,0-.081.116.445.445,0,0,0-.035.341V34.2a.354.354,0,0,0,.375.323c.739-.035,1.484-.012,2.224.012-.393.422-.809.826-1.2,1.248-.1.1-.2.219-.306.347a9.817,9.817,0,0,0-1.144.855c-.012-.012-.017-.029-.029-.04a1.3,1.3,0,0,1-.127-.271c-.075-.139-.156-.277-.237-.416q-.217-.364-.451-.71c-.312-.474-.635-.947-.988-1.386-.479-.606-1.04-1.149-1.554-1.733,0-.006.006-.017.006-.023.589-.04,1.184-.069,1.773-.133.474-.046.9-.289.855-.768a.378.378,0,0,0-.41-.555,17.093,17.093,0,0,1-3.523.11c-1.294.012-2.588.121-3.882.127a.28.28,0,0,0-.266.144.246.246,0,0,0-.081.116.445.445,0,0,0-.035.341v.289a.354.354,0,0,0,.375.323c.607-.029,1.213-.017,1.819,0a.145.145,0,0,0,.023.04,4.08,4.08,0,0,0,.751.762,5.64,5.64,0,0,1,.838,1.045c.514.745,1.149,1.4,1.652,2.155.393.589.768,1.2,1.121,1.819-.191,1.64.271,3.316.283,4.962V43.7h-1.71a.341.341,0,0,0-.081.012.361.361,0,0,0-.364.555,1.3,1.3,0,0,0-.046.3.354.354,0,0,0,.375.323.311.311,0,0,0,.15-.052.382.382,0,0,0,.081.006c.947,0,1.889.029,2.836.029.924,0,1.837-.069,2.755-.15.323-.029.653-.069.982-.069a3.131,3.131,0,0,0,.659-.046c.491-.1.768-.491.5-.936a.368.368,0,0,0-.612-.173c-.017.006-.035.006-.04.012a.9.9,0,0,0-.121.023c-.266.04-.531.058-.8.075-.427.029-.855.046-1.282.058a.391.391,0,0,0,.012-.087c0-.092.006-.185.006-.277a5.556,5.556,0,0,0-.006-.93,23.813,23.813,0,0,0-.092-2.8c-.006-.1-.006-.2-.012-.295a.312.312,0,0,0,.087-.127.08.08,0,0,0,.017-.023l.156-.173c.144-.156.295-.3.445-.451a9.746,9.746,0,0,1,.762-.7c.277-.214.514-.52.774-.762s.543-.508.814-.768a8.547,8.547,0,0,0,.762-.82,3.417,3.417,0,0,1,.7-.82,1.006,1.006,0,0,0,.081-.069c.56-.035,1.132-.069,1.692-.127.474-.046.9-.289.855-.768A.394.394,0,0,0,36.77,33.078Z" transform="translate(367.014 189.252)" fill="#fff" />
                                        <path d="M72.62,48.448a.658.658,0,0,0-.179-.156c-.427-.064-.861-.1-1.288-.139a1.308,1.308,0,0,0-.15.006,5.373,5.373,0,0,1-1.427-.035.282.282,0,0,0-.2.254c-.1.942.069,1.883.052,2.83-.012.456-.023.918-.035,1.375v.2a1.687,1.687,0,0,0,.012.659,2.459,2.459,0,0,1-.035.289c0,.006-.006.017-.006.023l-.012.116a.241.241,0,0,0,.116.254l.231.035.058-.017a.153.153,0,0,0,.035.029c.323.04.658.058.988.069a.946.946,0,0,0,.127-.012.694.694,0,0,0,.508-.358c.26-1.225.67-2.409.993-3.61a5.545,5.545,0,0,1,.225-.913c.046-.208.087-.422.127-.63A.831.831,0,0,0,72.62,48.448Z" transform="translate(332.244 177.151)" fill="#fff" />
                                        <path d="M70.963,70.13a.307.307,0,0,0-.277-.306,3.792,3.792,0,0,0-1.421.006.293.293,0,0,0-.191.416c-.035.347-.035.693-.075,1.034a.3.3,0,0,0,.358.3c.433-.087.988.3,1.34-.127A2.048,2.048,0,0,0,70.963,70.13Z" transform="translate(332.485 161.915)" fill="#fff" />
                                    </g>
                                    </svg>

                                </li>
                                </ul>
                                <p>
                                    Don't have an Account? <Link to='/login/new'>Create Account</Link> 
                                </p>
                        </form>
                    </div>
                </div>
            </div>
       
        )
    }
       
}


export default LoginForm
