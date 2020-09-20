import React, {Component} from 'react';
import {authenticateUser} from '../util/apiServiceUtil';

class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {"password": ""};
        this.state = {"username": ""};


    }


    changeText(e) {

        let name = e.target.name;
        let value = e.target.value;

        let o = {};

        o[name] = value;

        this.setState(o);

    }


     setSession(user)
    {


        sessionStorage.setItem("user_id", user.user.user_id);
        sessionStorage.setItem("firstName", user.user.first);
        sessionStorage.setItem("lastName", user.user.last);
        sessionStorage.setItem("q1Name", user.user.q1Name);
        sessionStorage.setItem("q2Name", user.user.q2Name);
        sessionStorage.setItem("q3Name", user.user.q3Name);
        sessionStorage.setItem("q4Name", user.user.q4Name);

        this.props.onLogon();
    }

    login()
    {

        let authOb = {};
        authOb.username = this.state.username;
        authOb.password = this.state.password;

        authenticateUser(authOb,(user) => {

                this.setSession(user);
            },
            (error) => {

                console.log("ERROR in getAllUsers =  " + error);
                this.setState({"error": error});
            })
    }


    render() {


        return (
            <div className={"loginHolder"}>

                <div>
                    UserName: <input type={'text'} name={"username"} value={this.state.username}
                                     onChange={(event) => this.changeText(event)}/>
                </div>

                <div>
                    Password: <input id={"1"} type={'password'} name={"password"} value={this.state.password || ''}
                                     onChange={(event) => this.changeText(event)}/>
                </div>


                <button onClick={() => this.login()}>Login</button>
            </div>
        );
    }
}

export default Login;
