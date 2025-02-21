export class Comment{
    constructor(
        id,
        body,
        postId,
        userId,
    )
    {
        this.id=id;
        this.body = body;
        this.postId = postId;
        this.userId = userId;
    }
}