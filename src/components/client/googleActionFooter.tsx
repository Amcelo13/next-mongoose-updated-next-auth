import { Button } from "../ui/button"
import { googleSignIn } from "@/actions"

export const GoogleAction = () => {
    return (
        <div style={{ textAlign: "center" }}>
            <p>Or</p>
                <Button variant={'outline'}
                onClick={()=> {
                    googleSignIn()
                }}
                >Sign in with Google</Button>
        </div>
    )
}