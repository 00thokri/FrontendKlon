//This code does everything for the main page/index.html
import { Post } from "./models/post.js";
export let posts = [];

export function addPost(sentPost, username)
{
    /* Goal:
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
   

    const postSection = document.getElementById("postSection");
    
    let div = document.createElement('div');
    div.classList.add("post");

    let postLink = document.createElement('a');
    postLink.href = "post.html?postId=" + sentPost.id;
    postLink.classList.add("link");

    let h1 = document.createElement('h1');
    h1.textContent = sentPost.title;
    
    let user = document.createElement('div');
    user.textContent = username;
    user.classList.add("username");

    let body = document.createElement('p'); //limit to 60 characters
    body.classList.add("postBody");
    body.textContent = sentPost.body;
    checkText(body);
    
    

    let tagSpan = document.createElement('span');
    tagSpan.classList.add("postTags");
    for(const tag of sentPost.tags)
    {
        let tagDiv = document.createElement('div')
        tagDiv.classList.add("tag");
        tagDiv.textContent = tag;
        tagSpan.append(tagDiv);
    }
    div.append(h1);
    div.append(user);
    div.append(body);
    div.append(tagSpan);
    postLink.append(div);
    postSection.append(postLink);

}


function checkText(postText)
{
    if(postText.textContent.length > 57)
    {
        const newText = postText.textContent.slice(0,60);
        postText.textContent = newText+"...";
    }
}



export function createPost(users,posts)
{
    const inputSection = document.getElementById("inputSection");
    const userLabel = document.createElement('label');
    userLabel.innerText = "Select User:";

    const userSelect = document.createElement('select');
    for(let user of users)
    {
        let option = document.createElement('option');
        option.value = user.id;
        option.innerText = user.username;
        userSelect.append(option);
    }
    userSelect.classList.add("formInputs");
    userSelect.name = "users";

    const titleInput = document.createElement('input');
    titleInput.type = "text";
    titleInput.innerText = "Title";
    titleInput.classList.add("formInputs");

    const bodyInput = document.createElement('input');
    bodyInput.type = "text"; 
    bodyInput.innerText = "Text goes here";
    bodyInput.classList.add("formInputs");

    const tagInput = document.createElement('input');
    tagInput.type = "text";
    tagInput.innerText = "Tags go here";
    tagInput.classList.add("formInputs");

    const submitBtn = document.createElement('button');
    submitBtn.innerText = "Submit";
    submitBtn.classList.add("formInputs");
    submitBtn.id = "submitPostBtn";
    submitBtn.addEventListener("click",()=>{
        //Save new post object in localStorage, then add post to page
        const title = titleInput.value;
        const body = bodyInput.value;
        const tags = tagInput.value.split(",");
        const userId = userSelect.value;
        const postId = posts[posts.length-1].id + 1; //Should add 1 to last post id, to create a new id
        const post = new Post(postId,title,body,tags,[0,0],userId);
        addPost(post,users[userId-1].username);
        posts.push(post);
        localStorage.setItem("posts",JSON.stringify(posts));
        alert("Post added to local storage");
        
        userSelect.remove();
        titleInput.remove();
        bodyInput.remove();
        tagInput.remove();
        submitBtn.remove();
    });


    inputSection.append(userLabel);
    inputSection.append(userSelect);
    inputSection.append(titleInput);
    inputSection.append(bodyInput);
    inputSection.append(tagInput);
    inputSection.append(submitBtn);

}
/*
    <label>Select User:</label>
    <select name="users" class="formInputs">
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
        <option value="4">User 4</option>
    </select>
    
    <form>
        <label for="title">Title</label>
        <input type="text" id="title" class="formInputs" name="title" value="Title">
        <label for="inputBody">Text goes here</label>
        <input type="text" id="inputBody" name="inputBody" class="formInputs" value="Text goes here">
        <button id="submitPostBtn" class="formInputs">Submit</button>
    </form>
*/