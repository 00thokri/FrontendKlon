//Loads the information for the website
const dummy = "https://dummyjson.com";
export function checkLocalStorage()
{

}

export async function loadPostsFromDummyJson()
{
    const response = await fetch(dummy + "/posts?limit=0"); //?limit=0 gives all posts instead of only 30

    if (!response.ok) {
        throw new Error("Failed to fetch posts.");
    }

    const post = await response.json();
    return post;
}