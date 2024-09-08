'use client';

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { handleLogin } from "@/actions";
import { redirect, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { GoogleAction } from "./googleActionFooter";
import Link from "next/link";

export const LoginForm = () => {
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget.form as HTMLFormElement);
        const email = formData.get('email') as string | undefined;
        const password = formData.get('password') as string | undefined;

        if (!email || !password) return toast.error('All fields are required');

        const toastID = toast.loading('Logging in...');
        startTransition(async () => {
            const error = await handleLogin(email, password);
            if (error == null) {
                toast.success('Login successful', { id: toastID });
                router.push('/')
            } else {
                toast.error(error, { id: toastID });
            }
        });
    };
    return (
        <div className="flex justify-center items-center h-dvh">
            <Card>
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="flex flex-col gap-4 w-[500px]">
                        <Input type="email" placeholder="Email" name="email" />
                        <Input type="password" placeholder="Password" name="password" />
                        <Button onClick={handleSubmit} className={`${isPending ? 'opacity-50' : ''}`}>Login</Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col gap-4">
                    <GoogleAction />
                    <Link className="mt-2" href="/signup">
                        Dont have an account? <span className='underline'>Sign up</span>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    );
};