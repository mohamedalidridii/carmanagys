import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { NextRequest } from "next/server"
import { User } from '../cms-types'


export const getServerSideUser = async (
    
    cookies: NextRequest["cookies"] | ReadonlyRequestCookies
    ) => {
        console.log('server is working correctly')
        const token = cookies.get("payload-token")?.value
        
        const meRes = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`,
             {
            headers: {
                Authorization: `JWT ${token}`,
            },
        })
        console.log('meRes:', meRes);
    const {user}= (await meRes.json()) as {user: User | null} 
    return {user}
}
