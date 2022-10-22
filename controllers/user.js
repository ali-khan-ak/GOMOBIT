import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

export const signup = async (req, res) => {
    const { username, email, password,age,phonenumber } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(404).json({ message: "User already exist" });

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ email, password: hashedPassword, username,age,phonenumber })

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result, token });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went wrong. ' });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email })
        console.log(existingUser)

        if (!existingUser) return res.status(404).json({ message: "User doesn't exists" });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid Credential" });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });

    } catch {
        res.status(500).json({ message: 'Something went wrong. ' });
    }

}

export const addUser = async (req, res) => {
    const { username, email, password, phonenumber, age } = req.body;
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(404).send({ message: "User already exist" , message: false});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ username, email, password: hashedPassword,phonenumber, age })

        console.log(result)

        const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

        res.status(200).send({ result, token });

    } catch {
        res.status(500).send({ message: 'Something went wrong. ' });
    }

}
export const fetchUsers = async (req, res) => {
    try {
        const userData = await User.find();

        res.status(200).json(userData);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const userDetails = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No User with id: ${id}`);

        const user = await User.findById(id);
        console.log(user)
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}