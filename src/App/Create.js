import React ,{ useEffect, useState } from "react";
import { Redirect, withRouter } from "react-router";
import firebase from "../firebase/config";

const Create = (props) => {
    const [tittle, setTittle] = useState("");
    const [content, setContent] = useState("");
    const [cover, setCover] = useState("");
    const [isBusy, setIsBusy] = useState(false);
    const [routeRedirect, setRedirect] = useState(false);

    const addPost = async(e) => {
        e.preventDefault();
        setIsBusy(true);

        let post = {
            tittle,
            content,
            cover: cover[0]
        }

        await firebase.createPost(post).then(() => {
            console.log("post created succesfully");
            setIsBusy(false);
            setRedirect(true);
        }).catch(err => {
            console.log(err);
            setIsBusy(false);
        });
    }

    useEffect(() => {
        firebase.getUserState().then(user => {
            if(!user){
                props.history.replace("/login");
            }
        })
    })

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }

    let createForm;
    if(isBusy){
        createForm = (
            <div className="processing">
                <p>Request is being processed</p>
                <div className="loader">Loading...</div>
            </div>
        )
    }else{
        createForm = (
            <form onSubmit={addPost}>
                <p>Create a new post</p>

                <label htmlFor="tittle">Post Tittle:</label>
                <input type="text" name="tittle" onChange={(e) => setTittle(e.target.value)}/>

                <label htmlFor="content">Post Content:</label>
                <textarea name="content" onChange={(e) => setContent(e.target.value)}></textarea>

                <label htmlFor="cover">Cover:</label>
                <input type="file" onChange={(e) => setCover(e.target.files)}/>

                <input type="submit" value="create post"/>
            </form>
        )
    }

    return (
        <React.Fragment>
            {createForm}
        </React.Fragment>
    )
}

export default withRouter(Create);