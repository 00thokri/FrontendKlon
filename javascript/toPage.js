import { Post } from "./models/post";
export let posts = [];
export function addPost(sentPost)
{
    /*
    <section id="postSection">
<div class="post">
    <h1>Post Title</h1>
    <div class="username">username</div>
    <p class="postBody">Example post that may only be 60 characters long. Will be re</p>
    <span class="postTags">
        <div class="tag">Tag 1</div>
        <div class="tag">Tag 2</div>
        <div class="tag">Tag 3</div>
    </span>
</div>
    */
    
    let div = document.createElement('div');
    let h1 = document.createElement('h1');
    h1.textContent = "";
    let user = document.createElement('div');
    let body = document.createElement('p'); //limit to 60 characters
    let tagSpan = document.createElement('span');
    //loop tags



}