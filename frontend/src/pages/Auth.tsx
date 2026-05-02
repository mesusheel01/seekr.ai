
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useNavigate } from "react-router"

const supabase = createClient()

type Provider = "google" | "github"

export default function Auth() {
    const navigate = useNavigate()

    const login = async (provider: Provider) => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: provider
        })
    }

    return <div className="flex gap-2">
        <Button onClick={() => login("google")}>Sign in with Google</Button>
        <Button onClick={() => login("github")}>Sign in with Github</Button>
    </div>
}