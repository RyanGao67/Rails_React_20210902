import React, {Component} from "react";
import axios from "axios";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
export default class App extends Component {
    constructor() {
        super();
        this.state = {
            loggedInStatus:"NOT_LOGGED_IN",
            user: {}
        }
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleLogin(data){
        console.log("tgao1"+data.user)
        this.setState({loggedInStatus:"LOGGED_IN", user:data.user})
    }
    checkLoginStatus(){
        axios.get("http://localhost:3001/logged_in", {withCredentials:true}).then(response=>{
            console.log(response.data)
            if(response.data.logged_in && this.state.loggedInStatus==="NOT_LOGGED_IN"){
                this.setState({
                    loggedInStatus:"LOGGED_IN",
                    user:response.data.user
                })
            }else if(!response.data.logged_in && this.state.loggedInStatus==="LOGGED_IN"){
                this.setState({
                    loggedInStatus: "NOT_LOGGED_IN",
                    user:{}
                })
            }
        }).catch(error=>{
            console.log("check login error", error);
        });
    }

    componentDidMount() {
        this.checkLoginStatus();
    }


    render(){
    return (
        <div className="app">
            <BrowserRouter>
                <Switch>
                    <Route exact path={"/"} render={
                        props=>(
                            <Home{...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>
                    )}/>
                    <Route exact path={"/dashboard"} render={
                        props=>(
                            <Dashboard{...props} loggedInStatus={this.state.loggedInStatus}/>
                    )}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
  }
}
