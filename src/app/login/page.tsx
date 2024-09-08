import Link from "next/link"
import { auth } from "@/auth"
import { LoginForm } from "@/components/client/form"
import { redirect } from "next/navigation"
import { GoogleAction } from "@/components/client/googleActionFooter"

const Login = async() => {
    const session = await auth()
    if(session?.user) redirect('/')
    return <LoginForm/>
}

export default Login