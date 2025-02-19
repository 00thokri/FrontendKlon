import { getPostsFromDummyJson } from "./load.js";
import { addPost } from "./toPage.js";
import { Post } from "./models/post.js";

export let posts = [];

function userCreatedPost()
{
  //Ta emot input och skapa objekt som sedan skickas in i html
  
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
    localStorage.setItem("posts",JSON.stringify(posts))
    renderPosts(posts);
    
  })
  .catch(err => console.error(err));
}

function renderPosts(posts)
{
  for(let post of posts)
  {
    addPost(post);
  }
}

function main()
{
    console.log("Main was called");
   loadPosts();

}
main();