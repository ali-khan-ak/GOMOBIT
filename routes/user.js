import express from 'express';

import {signup, login, addUser, fetchUsers, userDetails} from '../controllers/user.js'

const router = express.Router();

router.post('/signup',signup);
router.post('/login',login);
router.post('/adduser', addUser)
router.get('/fetchusers',fetchUsers)
router.get('/getdetails/:id',userDetails)

export default router;