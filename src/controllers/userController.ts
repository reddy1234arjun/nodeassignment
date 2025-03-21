import { Request, Response } from "express";
import connectDB from "../db";
import { fetchAndStoreData } from "../services/externalApiService";


async function loadUsers(req: Request, res: Response) {
    try {
        const db = await connectDB();
        await fetchAndStoreData(
            db.collection("users"),
            db.collection("posts"),
            db.collection("comments")
        );
        res.status(200).send();  // Empty response
    } catch (error) {
        res.status(500).json({ error: "Error loading users" });
    }
}


async function deleteAllUsers(req: Request, res: Response) {
    const db = await connectDB();
    await db.collection("users").deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
}

async function deleteUser(req: Request, res: Response) {
    const db = await connectDB();
    const result = await db.collection("users").deleteOne({ id: parseInt(req.params.userId) });

    if (result.deletedCount === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
}

async function getUser(req: Request, res: Response) {
    const db = await connectDB();
    const user = await db.collection("users").findOne({ id: parseInt(req.params.userId) });

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    const posts = await db.collection("posts").find({ userId: user.id }).toArray();
    for (const post of posts) {
        post.comments = await db.collection("comments").find({ postId: post.id }).toArray();
    }
    
    user.posts = posts;
    res.status(200).json(user);
}

async function createUser(req: Request, res: Response) {
    const db = await connectDB();
    const existingUser = await db.collection("users").findOne({ id: req.body.id });

    if (existingUser) {
        return res.status(409).json({ error: "User already exists" });
    }

    await db.collection("users").insertOne(req.body);
    res.status(201).json({ message: "User created successfully" });
}

export { loadUsers, deleteAllUsers, deleteUser, getUser, createUser };
