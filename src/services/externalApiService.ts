import { Collection, Document, OptionalId } from "mongodb";

export async function fetchAndStoreData(
    usersCollection: Collection<Document>,
    postsCollection: Collection<Document>,
    commentsCollection: Collection<Document>
) {
    try {
        const usersResponse = await fetch("https://jsonplaceholder.typicode.com/users");
        const postsResponse = await fetch("https://jsonplaceholder.typicode.com/posts");
        const commentsResponse = await fetch("https://jsonplaceholder.typicode.com/comments");

        if (!usersResponse.ok || !postsResponse.ok || !commentsResponse.ok) {
            throw new Error("Failed to fetch data from API");
        }

        // Parse JSON response with correct typing
        const users: OptionalId<Document>[] = await usersResponse.json();
        const posts: OptionalId<Document>[] = await postsResponse.json();
        const comments: OptionalId<Document>[] = await commentsResponse.json();

        // Insert data into MongoDB
        await usersCollection.insertMany(users);
        await postsCollection.insertMany(posts);
        await commentsCollection.insertMany(comments);

    } catch (error) {
        console.error("Error fetching and storing data:", error);
    }
}
