import React, {useState, useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import firebase from "../firebase/config";
import {Auth} from "../Context/authContext";

const Nav = (props) => {

    const [userState, setUserState] = useState(null);
    const [userEmail, setUserEmail] = useState("");

    const {state, dispatch} = React.useContext(Auth);

    useEffect(() => {

        firebase.getUserState().then(user => {
            if(user){
                setUserState(user);
                setUserEmail(user.email);
            }
        });
    });

    const logout = () => {
        firebase.logout();
        setUserState(null);
        props.history.replace("/login");
        return dispatch({
            type: "LOGOUT",
            payload: {}
        });
    }

    let buttons;
    if(userState != null || state.user.hasOwnProperty("user")){
        buttons = (
            <React.Fragment>
                <li>{userEmail}</li>
                <li><button className="logout" onClick={logout}>LogOut</button></li>
            </React.Fragment>
        )
    }else{
        buttons = (
            <React.Fragment>
                <li><Link to="/signin">SignIn</Link></li>
                <li><Link to="/login">LogIn</Link></li>
            </React.Fragment>
        )
    }


    return(
        <nav>
            <ul>
                <li><Link to="/">Factorial</Link></li>
            </ul>
            <ul>
                <li><Link to="/create">New Post</Link></li>
                {buttons}
            </ul>
        </nav>
    )
}

export default withRouter(Nav);