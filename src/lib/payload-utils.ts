import {ReadonlyRequestCookies} from "next/dist/server/web/spec-extension/adapters/request-cookies"
import { NextRequest } from "next/server"
import { User } from '../cms-types'
import { NextApiRequest, NextApiResponse } from 'next';


export const getServerSideUser = async (
    
    req: NextApiRequest,
    res: NextApiResponse
    ) => {
        const token = req.cookies['payload-token'];

        if (!token) {
          // Redirect to sign-in page if the token is not present
          res.redirect('/sign-in?origin=cart');
          return { user: null };
        }
      
        const meRes = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
          headers: {
            Authorization: `JWT ${token}`,
          },
        });
      
        if (!meRes.ok) {
          console.error('Error fetching user data:', meRes.statusText);
          // Handle the error, return a default user, or throw an exception as needed.
          res.status(500).json({ error: 'Internal Server Error' });
          return { user: null };
        }
      
        try {
          const { user } = await meRes.json();
          return { user };
        } catch (error) {
          console.error('Error parsing JSON:', error);
          // Handle the JSON parsing error.
          res.status(500).json({ error: 'Internal Server Error' });
          return { user: null };
        }
}
