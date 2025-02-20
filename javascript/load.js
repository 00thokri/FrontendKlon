//This file does everything with fetching/loading
const dummy = "https://dummyjson.com";
export function checkLocalStorage()
{

}

export async function getPostsFromDummyJson()
{
    
    const response = await fetch(dummy + "/posts?limit=0"); //?limit=0 gives all posts instead of only 30

    if (!response.ok) {
        throw new Error("Failed to fetch posts.");
    }
    
    const allPosts =await response.json();
    return allPosts.posts;
    
   
}

export async function getUsersFromDummyJson()
{
    const response = await fetch(dummy+"/users?limit=0");

    if(!response.ok)
    {
        throw new Error("Failed to fetch users");
    }
    const allUsers = await response.json();
    return allUsers.users;

}

export async function getCommentsFromDummyJson()
{
    const response = await fetch(dummy+"/comments?limit=0");

    if(!response.ok)
    {
        throw new Error("Failed to fetch comments");
    }
    const allComments = await response.json();
    return allComments.comments;

}