import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import axios from "axios"

const supabase = createClient()

export default function Dashboard() {
    const navigate = useNavigate()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        async function getInfo() {
            const { data, error } = await supabase.auth.getUser()
            if (data.user) {
                setUser(data.user)
            }
        }
        getInfo()
    }, [])

    useEffect(() => {
        async function getExistingUser() {
            if (user) {
                const { data: { session } } = await supabase.auth.getSession();
                const jwt = session?.access_token
                const data = await axios.get("http://localhost:3001/conversations", {
                    headers: {
                        Authorization: jwt
                    }
                })
                console.log(data.data)
            }

        }
        getExistingUser()
    }, [user])

    return <div>
        {!user && <Button onClick={() => navigate("/auth")}>Signin</Button>}
        {user && <Button onClick={() => {
            supabase.auth.signOut()
            setUser(null)
        }}>Logout</Button>}
        {user && user?.email}
    </div>
}