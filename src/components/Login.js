import React, {Component} from "react";
import axios from "axios";
export default class Login extends Component{
    constructor(props) {
        super(props);
        this.state={email:"",password:"",loginErrors:""}
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        this.setState({
            [event.target.name]:event.target.value
        })
    }
    handleSubmit(e){
        axios.post(
            "http://127.0.0.1:3001/sessions",
            {user:{
                    email: this.state.email,
                    password: this.state.password,
                }},
            {withCredentials:true}// this will allow browser the cookie
        ).then(response=>{
            if(response.data.logged_in)this.props.handleSuccessfulAuth(response.data)
        }).catch(error=>{
            console.log("login error", error)
        });
        e.preventDefault();
    }
    render(){
        return <div>
            <form onSubmit={this.handleSubmit}>
                <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange} required/>
                <button type="submit">Login</button>
            </form>
        </div>
    }
}