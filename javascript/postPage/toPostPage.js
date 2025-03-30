//import { Post } from "./models/post";
//import { User } from "./models/user";
import { Comment } from "../models/comment.js";
import { getUserFromId, updatePost } from "./postPage.js";



export function showPost(username, onePost) {
    const postSection = document.getElementById("selectedPostSection");

    const div = document.createElement('div');
    div.classList.add("post");

    const h1 = document.createElement('h1');
    h1.textContent = onePost.title;

    const user = document.createElement('div');
    user.textContent = username;
    user.classList.add("username");

    const body = document.createElement('p');
    body.classList.add("postBody");
    body.textContent = onePost.body;

    const reactions = document.createElement('div');
    reactions.classList.add("reactions");

    const likes = document.createElement('div');
    likes.classList.add("reactionButton");

    const likeAmount = document.createElement('p');
    likeAmount.textContent = onePost.reactions.likes;
    const likeButton = document.createElement('button');
    likeButton.id = "likeButton";
    likeButton.textContent = "Like"
    likeButton.addEventListener("click", () => {
        onePost.reactions.likes++;
        likeAmount.textContent = onePost.reactions.likes;
        updatePost(onePost);
    });
    likes.append(likeButton);
    likes.append(likeAmount);

    const dislikes = document.createElement('div');
    dislikes.classList.add("reactionButton");

    const dislikeAmount = document.createElement('p');
    dislikeAmount.textContent = onePost.reactions.dislikes;

    const dislikeButton = document.createElement('button');
    dislikeButton.id = "dislikeButton";
    dislikeButton.textContent = "dislike";
    dislikeButton.addEventListener("click", () => {
        onePost.reactions.dislikes++;
        dislikeAmount.textContent = onePost.reactions.dislikes;
        updatePost(onePost);
    });
    dislikes.append(dislikeButton);
    dislikes.append(dislikeAmount);

    const tagSpan = document.createElement('span');
    tagSpan.classList.add("postTags");
    for (const tag of onePost.tags) {
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


export function addComment(comment) {
    const commentSection = document.getElementById("commentSection");
    let commentDiv = document.createElement('div');
    commentDiv.classList.add("comment");


    let commentBody = document.createElement('p');
    commentBody.classList.add("commentBody");
    commentBody.textContent = comment.body;

    let commentUser = document.createElement('div');
    commentUser.classList.add("username");
    console.log("comment.user.username: " + comment.user.username);
    commentUser.textContent = comment.user.username; 
    commentDiv.appendChild(commentUser);
    commentDiv.appendChild(commentBody);
    commentSection.append(commentDiv);

}

export function showCommentWindow(users, comments, postId) {
    const inputSection = document.getElementById("inputSection");

    const commentWindow = document.createElement('textarea');
    commentWindow.placeholder = "Enter your comment here";
    commentWindow.id = "inputBody";
    commentWindow.classList.add("formInputs");

    const userLabel = document.createElement('label');
    userLabel.textContent = "Select User: ";
    const userSelect = document.createElement('select');
    for (let user of users) {
        let option = document.createElement('option');
        option.value = user.id;
        option.innerText = user.username;
        userSelect.append(option);
    }
    userSelect.classList.add("formInputs");
    userSelect.name = "users";

    const submitComment = document.createElement('button');
    submitComment.textContent = "Submit Comment";
    submitComment.id = "submitCommentBtn";
    submitComment.addEventListener("click", () => {

        const commentBody = document.getElementById("inputBody").value;
        if (commentBody === "") {
            alert("You need to write something, comment not added");
            return;
        }
        commentWindow.value = " ";
        const userId = userSelect.value;
        const commentId = comments.length + 1;

        const newComment = new Comment(commentId, commentBody, postId, userId, getUserFromId(userId));
        addComment(newComment);
        comments.push(newComment);
        localStorage.setItem("comments", JSON.stringify(comments));
    });

    inputSection.append(commentWindow);
    inputSection.append(userLabel);
    inputSection.append(userSelect);
    inputSection.append(submitComment);

}







