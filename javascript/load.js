//This file does everything with fetching/loading
const dummy = "https://dummyjson.com";
export function checkLocalStorage()
{

}

export async function getPostsFromDummyJson()
{
    
    const response = await fetch(dummy + "/posts?limit=5"); //?limit=0 gives all posts instead of only 30

    if (!response.ok) {
        throw new Error("Failed to fetch posts.");
    }
    
    const allPosts =await response.json();
    return allPosts.posts;
    
   
}