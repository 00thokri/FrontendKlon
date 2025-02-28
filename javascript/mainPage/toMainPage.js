//This code does everything for the main page/index.html
import { Post } from "../models/post.js";
//import { showCreatePost } from "./main.js";
export let posts = [];

export function addPost(sentPost, username) {

    const postSection = document.getElementById("postSection");

    let div = document.createElement('div');
    div.classList.add("post");

    let postLink = document.createElement('a');
    console.log("ID IS: sentPost.id");
    postLink.href = "post.html?postId=" + sentPost.id;
    postLink.classList.add("link");

    let h1 = document.createElement('h1');
    h1.textContent = sentPost.title;

    let user = document.createElement('div');
    user.textContent = username;
    user.classList.add("username");

    let body = document.createElement('p'); //limit to 60 characters
    body.textContent = sentPost.body;
    checkText(body);

    let tagSpan = document.createElement('span');
    tagSpan.classList.add("postTags");
    for (const tag of sentPost.tags) {
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


function checkText(postText) {
    if (postText.textContent.length > 57) {
        const newText = postText.textContent.slice(0, 60);
        postText.textContent = newText + "...";
    }
}



export function createPost(users, posts) {

    const createButton = document.getElementById("createPostBtn");
    createButton.remove();

    const inputSection = document.getElementById("inputSection");
    const userLabel = document.createElement('label');
    userLabel.innerText = "Select User:";

    const userSelect = document.createElement('select');
    for (let user of users) {
        let option = document.createElement('option');
        option.value = user.id;
        option.innerText = user.username;
        userSelect.append(option);
    }
    userSelect.classList.add("formInputs");
    userSelect.name = "users";

    const titleLabel = document.createElement('label');
    titleLabel.innerText = "Title:";

    const titleInput = document.createElement('input');
    titleInput.type = "text";
    titleInput.innerText = "Title";
    titleInput.classList.add("formInputs");

    const bodyInput = document.createElement('textarea');
    bodyInput.placeholder = "Post content goes here";
    bodyInput.classList.add("formInputs");

    const tagLabel = document.createElement('label');
    tagLabel.innerText = "Tags:";

    const tagInput = document.createElement('input');
    tagInput.type = "text";
    tagInput.innerText = "Tags go here";
    tagInput.classList.add("formInputs");

    const submitBtn = document.createElement('button');
    submitBtn.innerText = "Submit";
    submitBtn.classList.add("formInputs");
    submitBtn.id = "submitPostBtn";
    submitBtn.addEventListener("click", () => {
        //Save new post object in localStorage, then add post to page
        const title = titleInput.value;
        const body = bodyInput.value;
        console.log(body);
        const tags = tagInput.value.split(",");
        const userId = userSelect.value;
        const reactions = { likes: 0, dislikes: 0 };
        const postId = posts[posts.length - 1].id + 1; //Should add 1 to last post id, to create a new id
        const post = new Post(postId, title, body, tags, reactions, userId);
        addPost(post, users[userId - 1].username);
        posts.push(post);
        localStorage.setItem("posts", JSON.stringify(posts));
        alert("Post added to local storage");

        userSelect.remove();
        titleInput.remove();
        bodyInput.remove();
        tagInput.remove();
        submitBtn.remove();
        titleLabel.remove();
        userLabel.remove();
        tagLabel.remove();
        inputSection.append(createButton);
    });


    inputSection.append(userLabel);
    inputSection.append(userSelect);

    inputSection.append(titleLabel);
    inputSection.append(titleInput);

    inputSection.append(bodyInput);

    inputSection.append(tagLabel);
    inputSection.append(tagInput);

    inputSection.append(submitBtn);

}
