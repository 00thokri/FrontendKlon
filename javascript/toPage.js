//This code does everything for the main page/index.html
export let posts = [];

export function addPost(sentPost, username, fullPost)
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
    //looped in real application
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
    if(fullPost == false)
    {
        checkText(body);
    }
    

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

export function displayUsers()
{

}

function checkText(postText)
{
    if(postText.textContent.length > 57)
    {
        const newText = postText.textContent.slice(0,60);
        postText.textContent = newText+"...";
    }
}