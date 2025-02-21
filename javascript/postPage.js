import { Post } from "./models/post";
import { User } from "./models/user";
import { Comment } from "./models/comment";

//code to get the postId from the URL
const queryParameters = window.location.search;
const querySplit = queryParameters.split("=");
const productId = Number.parseInt(querySplit[1]);
