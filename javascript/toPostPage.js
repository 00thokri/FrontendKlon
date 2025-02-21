//import { Post } from "./models/post";
//import { User } from "./models/user";
//import { Comment } from "./models/comment";
import { findCommentUsername } from "./postPage.js";

//code to get the postId from the URL



export function showPost(username, onePost)
{
    const postSection = document.getElementById("postSection");
    
    let div = document.createElement('div');
    div.classList.add("post");

    let h1 = document.createElement('h1');
    h1.textContent = onePost.title;
    
    let user = document.createElement('div');
    user.textContent = username;
    user.classList.add("username");

    let body = document.createElement('p'); //limit to 60 characters
    body.classList.add("postBody");
    body.textContent = onePost.body;

    let reactions = document.createElement('div');
    reactions.classList.add("reactions");

    let likes = document.createElement('div');
    likes.textContent = "likes: "+onePost.reactions.likes;
    console.log("likes:"+onePost.reactions.likes);
    let test = onePost.reactions.likes;
    let testupdate = test+1;
    console.log("liketest " + testupdate);

    let dislikes = document.createElement('div');
    dislikes.textContent = "dislikes: "+onePost.reactions.dislikes;
    
  
    let tagSpan = document.createElement('span');
    tagSpan.classList.add("postTags");
    for(const tag of onePost.tags)
    {
        let tagDiv = document.createElement('div')
        tagDiv.classList.add("tag");
        tagDiv.textContent = tag;
        tagSpan.append(tagDiv);
    }
    reactions.append(likes);
    reactions.append(dislikes);
    div.append(h1);
    div.append(user);
    div.append(body);
    div.append(tagSpan);
    div.append(reactions);
    postSection.append(div);

}


export function addComment(comment)
{
    /*
    <div class="comment">
        <div class="username">username</div>
        <p class="commentBody">Example comment that may only be 60 characters long. Will be re</p>
    */
   const commentSection = document.getElementById("commentSection");
   let commentDiv = document.createElement('div');
   commentDiv.classList.add("comment");
   

   let commentBody = document.createElement('p');
    commentBody.classList.add("commentBody");
    commentBody.textContent = comment.body;

    let commentUser = document.createElement('div');
    commentUser.classList.add("username");
    commentUser.textContent = comment.user.username; //?
    commentDiv.appendChild(commentUser);
    commentDiv.appendChild(commentBody);
    commentSection.append(commentDiv);

}







