import { getPostsFromDummyJson, getUsersFromDummyJson } from "./load.js";
import { addPost,createPost } from "./toMainPage.js";
import { Post } from "./models/post.js";
import { User } from "./models/user.js";

export let posts = [];
export let users = [];


function loadUsers()
{
  const usersItem = localStorage.getItem("users");
  if(usersItem !== null)
  {
    console.log("Loaded LocalStorage");
    users = JSON.parse(usersItem);
  }
  else
  {
    getUsersFromDummyJson()
  .then(res=>{
    console.log("Loaded from DummyJson");
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
  

}

function loadPosts()
{ 
  const postsItem = localStorage.getItem("posts");
  if(postsItem !== null)
  {
    posts = JSON.parse(postsItem);
  }
  getPostsFromDummyJson()
  .then(res => {
    posts = res.map(post => new Post(
      post.id,
      post.title,
      post.body,
      post.tags,
      post.reactions,
      post.userId
    ));
    localStorage.setItem("posts",JSON.stringify(posts));
    
  })
  .catch(err => console.error(err));
}


function findUsername(userId)
{
  for(let user of users)
  {
    if(user.id == userId)
    {
      return user.username;
    } 
  }
}

function renderPosts(posts)
{
  for(let post of posts)
  {
    addPost(post,findUsername(post.userId));
  }
}

export function showCreatePost()
{
    const createPostBtn = document.getElementById("createPostBtn");
    createPostBtn.addEventListener("click",()=>{
        createPost(users,posts);
        loadPosts();
    });
    
}

function main()
{
    console.log("Main was called");
   loadPosts();
   loadUsers();
   renderPosts(posts);
   showCreatePost();

}
main();