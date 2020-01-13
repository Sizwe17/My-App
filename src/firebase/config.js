import * as firebase from "firebase";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';


const config = {
// firebase sdk snippet
}

class Firebase{

  constructor(){
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
    this.storage = firebase.storage();
  }

  //Login
  async login(email, password){
    const user = await firebase.auth().signInWithEmailAndPassword(email, password).catch(err => {
      console.log(err);
      return err;
    });
    return user;
  }

  //Signin
  async signin(email, password){
    const user = await firebase.auth().createUserWithEmailAndPassword(email, password).catch(err => {
      console.log(err);
      return err;
    });
    return user;
  }

  //LogOut
  async logout(){
    const logout = await firebase.auth().signOut().catch(err => {
      console.log(err);
      return err;
    });
    return logout;
  }

  async getUserState(){
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  async getPosts(){
    let postsArray = [];
    const posts = await firebase.firestore().collection("Posts").get();
    posts.forEach(doc => {
      postsArray.push({id:doc.id, data:doc.data()});
    });
    return postsArray;
  }

  async getPost(postid){
    const post = await firebase.firestore().collection("Posts").doc(postid).get();
    const postData = post.data();
    return postData;
  }

  

  async createPost(post){
    const storageRef = firebase.storage().ref();
    const storageChild = storageRef.child(post.cover.name);
    const postCover = await storageChild.put(post.cover);//upload
    const downloadURL = await storageChild.getDownloadURL();//download
    const fileRef = postCover.ref.location.path;

    let newPost = {
      tittle: post.tittle,
      content: post.content,
      cover: downloadURL,
      fileref: fileRef
    }

    const firestorePost = await firebase.firestore().collection("Posts").add(newPost).catch(err => {
      console.log(err);
      return err;
    });
    return firestorePost;
  }

  async updatePost(postid, postData){
    if(postData["cover"]){

    const storageRef = firebase.storage().ref();
    const storageChild = storageRef.child(postData.cover.name);
    const postCover = await storageChild.put(postData.cover);//upload
    const downloadURL = await storageChild.getDownloadURL();//download
    const fileRef = postCover.ref.location.path;

    await storageRef.child(postData["oldcover"]).delete().catch(err => {
      console.log(err);
    });

    let updatedPost = {
      tittle: postData.tittle,
      content: postData.content,
      cover: downloadURL,
      fileref: fileRef

    }

    const post = await firebase.firestore().collection("Posts").doc(postid).set(updatedPost, {merge: true}).catch(err => {
      console.log(err);
    });
    return post;
    
    }else{
      const post = await firebase.firestore().collection("Posts").doc(postid).set(postData, {merge: true}).catch(err => {
        console.log(err);
      });
      return post;
    }
  }

  async deletePost(postid, fileref){
    const storageRef = firebase.storage().ref();
    await storageRef.child(fileref).delete().catch(err => {
      console.log(err);
    });
    console.log("Image Deleted");
    const post = await firebase.firestore().collection("Posts").doc(postid).delete().catch(err => {
      console.log(err)
    });
    console.log("Post Deleted");

    return post;
  }

}





export default new Firebase();

