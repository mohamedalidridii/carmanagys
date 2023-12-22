import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { NextRequest } from "next/server"
import { User } from '../cms-types'



export const getServerSideUser = async (
    
    cookies: NextRequest["cookies"] | ReadonlyRequestCookies
    ) => {
        console.log('server is working')
        const token = cookies.get("payload-token")?.value
        
        const meRes = await fetch(
            "http//:www.car-managys.com/api/users/me",
             {
            headers: {
                Authorization: `JWT ${token}`,
            },
        })
    const {user}= (await meRes.json()) as {user: User | null} 
    return {user}
}
