'use server'
import { redirect } from "next/navigation"
import UserModel from "../app/models/user.model"
import connectDB from "@/app/lib/connnectDB"
import { signIn } from "@/auth"
import { AuthError, CredentialsSignin } from "next-auth"
import { compare, compareSync, hash } from "bcryptjs"

export const googleSignIn = async () => {
    return await signIn('google')

}

export const getUser = async (email: string) => {
    await connectDB();
    const user = await UserModel.findOne({ email }).select("+password")
    return user ? user.toObject() : null
}


export const postUser = async (name: string, email: string, password: string) => {
    await connectDB();
    try {
        const newUser = new UserModel({ name, email, password })
        await newUser.save()
        return newUser.toObject()
    }
    catch (e) {
        const error = e as CredentialsSignin
        return error.cause
    }
}

export const googlePostUser = async (name: string, email: string, image: string, id: string) => {
    try {
        return await UserModel.create({ name, email, image, googleId: id })
    } catch (error) {
        const e = error as CredentialsSignin
        return e.cause
    }
}

export const handleLogin = async (email: string, password: string) => {
    if (!email || !password) throw new Error('All fields are required');
    await connectDB();
    try {
        const user = await getUser(email);
        if (!user) throw new Error('Invalid credentials');
        const passMatch = await compare(password, user.password);
        if (passMatch) {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false, // Prevent automatic redirect
            });
            if (result?.error) {
                return result.error;
            }
            return null
        } 
        else {
            return 'Invalid credentials';
        }
    } catch (error: any) {
        return error.toString()
    }
};