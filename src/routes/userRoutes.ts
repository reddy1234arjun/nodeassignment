import { Router } from 'express';
import { 
    getUser, 
    createUser, 
    deleteUser, 
    deleteAllUsers, 
    loadUsers, 
} from '../controllers/userController';

const router = Router();

// Load 10 users from JSON Placeholder
router.get('/load', async (req, res, next) => {
    try {
        await loadUsers(req, res);
    } catch (error) {
        next(error);
    }
});

// Get user by ID along with posts & comments
router.get('/users/:userId', async (req, res, next) => {
    try {
        await getUser(req, res);
    } catch (error) {
        next(error);
    }
});

// Create a new user
router.post('/users', async (req, res, next) => {
    try {
        await createUser(req, res);
    } catch (error) {
        next(error);
    }
});

// Delete a specific user
router.delete('/users/:userId', async (req, res, next) => {
    try {
        await deleteUser(req, res);
    } catch (error) {
        next(error);
    }
});

// Delete all users
router.delete('/users', async (req, res, next) => {
    try {
        await deleteAllUsers(req, res);
    } catch (error) {
        next(error);
    }
});

// Update an existing user


export default router;
