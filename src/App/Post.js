import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router";
import firebase from "../firebase/config";

const Post = (props) => {

    const [timer, setTimer] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [userState, setUserState] = useState(false);
    const [isBusy, setIsBusy] = useState(false);
    const [post, setPost] = useState("");

    const tittleRef = useRef(null);
    const contentRef = useRef(null);
    const fileRef = useRef(null);

    const [postid, setPostId] = useState("");
    const [routeRedirect, setRedirect] = useState(false);

    const getPost = async(postid) =>{
        const _post = await firebase.getPost(postid).catch(err => {
            console.log(err);
            return err;
        });

        setPost(_post);
    }

    useEffect(() => {
        setTimer(true);
        setPostId(props.match.params.id);
        getPost(props.match.params.id);

        firebase.getUserState().then(user => {
            if(user){
                setUserState(user);
            }
        });

        setTimeout(() => setTimer(false), 1000);

    }, [props.match.params.id]);

    const redirect = routeRedirect;
    if(redirect){
        return <Redirect to="/" />  
    }


    let currentPost;
    let editButton;
    let deleteButton;

    const updateCurrentPost = (e) => {
        e.preventDefault();
        setIsBusy(true);

        const _post = {
            tittle: tittleRef.current.value,
            content: contentRef.current.value
        }

        if(fileRef.current.files.length > 0){
            _post["cover"] = fileRef.current.files[0];
            _post["oldcover"] = post.fileref;
        }

        firebase.updatePost(postid, _post).then(() => {
            console.log("Post Updated");
            setIsBusy(false);
            setRedirect(true);
        }).catch(err => {
            console.log(err);
        });

    }

    const toggleEditMode = () => {
        setEditMode(!editMode);
    }

    const deleteCurrentPost = () => {
        //delete post
        firebase.deletePost(postid, post.fileref)
        .then(() => {
            setRedirect(true);
        }).catch(err => {
            console.log(err);
        });
    }

    let updateForm;
    if(editMode){
        deleteButton = <button className="delete" onClick={(e) => deleteCurrentPost()}>Delete Post</button>

        if(isBusy){
            updateForm = (
                <div className="processing">
                 <p>Request is being processed</p>
                 <div className="loader">Loading...</div>
            </div>
            )
        }else{updateForm = (
            <React.Fragment>
             <form className="editForm" onSubmit={updateCurrentPost}>
                <p>Update the current post</p>

                <label htmlFor="tittle">Post Tittle:</label>
                <input type="text" name="tittle" ref={tittleRef} defaultValue={post.tittle}/>

                <label htmlFor="content">Post Content:</label>
                <textarea name="content" ref={contentRef} defaultValue={post.content}></textarea>

                <label htmlFor="cover">Cover:</label>
                <input type="file" ref={fileRef}/>

                <input type="submit" value="update post"/>
             </form>

             {deleteButton}
            </React.Fragment>
         )
       }
    }

    if(timer){
        currentPost = (
            <div className="processing">
             <p>Request is being processed</p>
             <div className="loader">Loading...</div>
        </div>
        )
    }else{

        if(userState){
            editButton = <button className="edit" onClick={(e) => toggleEditMode()}>Edit Post</button>
        }

        currentPost = (
        <div className="single">
            <img src={post.cover} alt="post cover"/>
            <h2>{post.tittle}</h2>
            <div>{post.content}</div>
            {editButton}
            {updateForm}
        </div>
     )
   }

    return(
        <React.Fragment>
            {currentPost}
        </React.Fragment>
    )
}

export default Post; 