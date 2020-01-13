import React, {useEffect} from "react";
import {Link, withRouter} from "react-router-dom";
import firebase from "../firebase/config";
import "../index.css";

import { Posts } from "../Context/postsContext";

const Main = () => {

    const { state, dispatch } = React.useContext(Posts);

    const getPosts = async() => {
       // let _posts = [];
        const postsArray = await firebase.getPosts().catch(err => {
            console.log(err);
            return err;
        });
        /*
        postsArray.forEach(doc => {
            _posts.push({id:doc.id, data:doc.data});
        });
        */

        return dispatch({
            type: "FETCH_POSTS",
            payload: postsArray
        });
    }

    useEffect(() => {
        getPosts();
    }, [])

    return (
        <React.Fragment>

            <header>
                <div>
                    <h1>React <br/> Factorial <br/> App</h1>
                </div>
            </header>

            <div className="posts">
                {state.posts.map(post => {
                    return (
                        <div className="post" key={post.id}>
                            <Link to={"post/" + post.id}>
                                <div style={{backgroundImage: "url(" + post.data.cover +")"}}/>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </React.Fragment>
    );
}

export default withRouter(Main);