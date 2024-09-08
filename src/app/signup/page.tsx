import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import connectDB from "../lib/connnectDB"
import { NextResponse } from "next/server"
import UserModel from "../models/user.model"
import { postUser } from "@/actions"
import { GoogleAction } from "@/components/client/googleActionFooter"
import { auth } from "@/auth"
import { toast } from "sonner"
import SignupForm from "./signup-form"


const Signup = async () => {
    const session = await auth()
    if (session?.user) redirect('/')
    return (
        <SignupForm />
    )
}

export default Signup