import React from "react";
import { Switch, Route } from "react-router-dom";

//App Components
import Main from "./App/Main";
import Signin from "./App/Signin";
import Login from "./App/Login";
import Create from "./App/Create";
import Post from "./App/Post";

const Routes = () => (

    <Switch>
        <Route exact path="/" component = {Main} /> 
        <Route exact path="/signin" component = {Signin} /> 
        <Route exact path="/login" component = {Login} /> 
        <Route exact path="/create" component = {Create} />
        <Route exact path="/post/:id" component = {Post} />
    </Switch>
);

export default Routes;