
'use client'
import React, { useTransition } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GoogleAction } from '@/components/client/googleActionFooter'
import Link from 'next/link'
import { toast } from 'sonner'
import { hash } from 'bcryptjs';
import { getUser, postUser } from '@/actions'
import { redirect } from 'next/navigation'

const SignupForm = () => {
    const [isPending, startTransition] = useTransition()

    const handleSignup = async (formData: FormData) => {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        if (!name || !email || !password) return toast.error('Bad payload')
        const handleSignupAsync = async (name: string, email: string, password: string) => {
            try {
                const hashedPassword = await hash(password, 10);
                const user = await getUser(email);
                if (user != null) {
                    toast.warning('User already exists');
                    return
                }
                await postUser(name, email, hashedPassword);
                toast.success('User created successfully');
                redirect('/login')
            } catch (error) {
                console.error('Error signing up:', error);
                toast.error('Internal server error');
            }
        };
        startTransition(() => {
            handleSignupAsync(name, email, password);
        });
    }

    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>

                <CardHeader>
                    <CardTitle>Sign up</CardTitle>
                </CardHeader>

                <CardContent>
                    <form action={handleSignup}
                        className="flex flex-col gap-4 w-[500px]">

                        <Input type="text" placeholder="Name" required name='name' />
                        <Input type="email" placeholder="Email" required name='email' />
                        <Input type="password" placeholder="Password" required name='password' />
                        <Button type="submit" className={`${isPending ? 'opacity-50' : ''}`}>Sign Up</Button>

                    </form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4">
                    <GoogleAction />
                    <Link className="mt-2" href="/login">
                        Already have an account? <span className='underline'>Login</span>
                    </Link>
                </CardFooter>

            </Card>

        </div>
    )
}

export default SignupForm