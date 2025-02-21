import { getUsersFromDummyJson,getCommentsFromDummyJson } from "./load.js"
import { User } from "./models/user.js";
import { Comment } from "./models/comment.js";
import {showPost} from "./toPostPage.js";
import {addComment} from "./toPostPage.js";

const queryParameters = window.location.search;
const querySplit = queryParameters.split("=");
const postId = Number.parseInt(querySplit[1]);

let comments = [];

export let users = [];


function loadUsers()
{
  const usersItem = localStorage.getItem("users");
  if(usersItem !== null)
  {
    users = JSON.parse(usersItem);
  }
  getUsersFromDummyJson()
  .then(res=>{
    users = res.map(user => new User(
      user.id,
      user.firstName,
      user.lastName,
      user.username,
    ));
    localStorage.setItem("users",JSON.stringify(users));
  })
  .catch(err => console.error(err));

}
//gets post from the postID sent in the URL
function loadPost() {
    //Posts should already be stored in local storage
    const postsItems = localStorage.getItem("posts");
    const posts = JSON.parse(postsItems);
    for (let post of posts ) {
      console.log(post);
        if (post.id === postId)
        {
            return post;
        }
    }
}


function loadComments() {
  const commentsItem = localStorage.getItem("comments");

  if(commentsItem !== null)
  {
    comments = JSON.parse(commentsItem);
  }
  getCommentsFromDummyJson(postId)
  .then(res => {
    comments = res.map(comment => new Comment(
      comment.id,
      comment.body,
      comment.postId,
      comment.userId,
      comment.user,
    ));
    localStorage.setItem("comments",JSON.stringify(comments));
    
  })
  .catch(err => console.error(err));
}

function renderComments(comments)
{
    for(const comment of comments)
    {
        addComment(comment);
    }

}
export function findCommentUsername(userId)
{
  for(let user of users)
  {
    if(user.id == userId)
    {
      return user.username;
    } 
  }
}

function main() {
    loadUsers();
    loadComments();
    let postToLoad = loadPost();
    showPost(findCommentUsername(postToLoad.userId), postToLoad);
    renderComments(comments);
}
main();