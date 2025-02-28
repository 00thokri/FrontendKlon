
import { showCommentWindow, showPost } from "./toPostPage.js";
import { addComment } from "./toPostPage.js";
import { Comment } from "../models/comment.js";
import { User } from "../models/user.js";
import { getAllCommentsFromDummyJson, getUsersFromDummyJson } from "../load.js";
//import {sendUsers, sendComments } from "./main.js";
const queryParameters = window.location.search;
const querySplit = queryParameters.split("=");
const postId = Number.parseInt(querySplit[1]);

let comments = [];
let users = [];

function loadUsers() {
  const usersItem = localStorage.getItem("users");
  if (usersItem !== null) {
    console.log("Loaded users from LocalStorage");
    users = JSON.parse(usersItem);
  }
  else {
    getUsersFromDummyJson()
      .then(res => {
        console.log("Loaded from DummyJson");
        users = res.map(user => new User(
          user.id,
          user.firstName,
          user.lastName,
          user.username,
        ));
        localStorage.setItem("users", JSON.stringify(users));
      })
      .catch(err => console.error(err));
  }
}

function loadComments() {
  const commentsItem = localStorage.getItem("comments");

  if (commentsItem !== null) {
    //potentially fetch all comments and sort them here instead
    comments = JSON.parse(commentsItem);
    console.log("got all comments from local storage");
  }
  else {
    getAllCommentsFromDummyJson()
      .then(res => {
        comments = res.map(comment => new Comment(
          comment.id,
          comment.body,
          comment.postId,
          comment.userId,
          comment.user,
        ));
        console.log("Loaded all comments");
        localStorage.setItem("comments", JSON.stringify(comments));

      })
      .catch(err => console.error(err));
  }

}

//gets post from the postID sent in the URL
function loadPost() {
  //Posts should already be stored in local storage
  const postsItems = localStorage.getItem("posts");

  const posts = JSON.parse(postsItems);
  //Find the post that matches the sent post id
  for (let post of posts) {
    if (post.id === postId) {
      //comments=[];
      return post;
    }
  }
}

//comments should have already been filtered, shows all comments relevant to post
function renderComments(comments) {
  for (const comment of comments) {
    addComment(comment);
  }
}

//finds the usernames linked to the comments
export function findCommentUsername(userId) {
  for (let user of users) {
    if (user.id == userId) {
      return user.username;
    }
  }
}

export function updatePost(postObject) {
  const postItem = localStorage.getItem("posts");
  const posts = JSON.parse(postItem);
  for (let post of posts) {
    if (post.id == postId) {
      //Update post with new reactions
      post.reactions = postObject.reactions;
      //Update posts in local storage with updated post object
      localStorage.setItem("posts", JSON.stringify(posts));
      return;
    }
  }

}
export function getUserFromId(userId) {
  for (let user of users) {
    if (user.id == userId) {
      return user;
    }
  }
}

function main() {
  //get the post
  let postToLoad = loadPost();
  loadUsers();
  loadComments();
  showCommentWindow(users, comments, postId);
  //display the post, send its userid and the post object
  showPost(findCommentUsername(postToLoad.userId), postToLoad);
  //when post is loaded, get its comments
  comments = comments.filter(comment => comment.postId === postId); //filter comments to only show comments relevant to post
  renderComments(comments);
}
main();