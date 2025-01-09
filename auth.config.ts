import type { NextAuthConfig } from 'next-auth';
import { SessionUser } from './app/lib/definitions';
import { decodeToken, TokenPayload } from './app/lib/token-decode';

export const authConfig = {
  pages: {
    signIn: `/login`,
  },
  trustHost: true,
  session: {
    maxAge: 90 * 24 * 60 * 60 //90 days (In seconds)
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/promotion');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/promotion', nextUrl));
      }
      return false;
    },
    jwt({ token, user }) {
      if (user && user.tokens) {
        token.accessToken = user.tokens.token_type + " " + user.tokens.access_token; // Set access token in JWT
        token.refreshToken = user.tokens.token_type + " " + user.tokens.refresh_token; // Set access token in JWT
        token.user_data = user.user_data;
      }

      //This is called every time we ask for a token in the app.
      if (typeof token?.accessToken === 'string') {
        const decodedToken: TokenPayload | null = decodeToken(token.accessToken);
        token.accessTokenExpires = decodedToken?.exp ? decodedToken.exp * 1000 : undefined;
      }
      
      if (token.accessTokenExpires && typeof token.accessTokenExpires === 'number' && Date.now() < (token.accessTokenExpires - 600000)) {
        return token;
      }

      try {
        return refreshAccessToken(token);
      } catch (error) {
        return null;
      }
    },
    session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.user_data = token.user_data as SessionUser;
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;



async function refreshAccessToken(token: Record<string, any>) {
  try {
    const [tokenType, refreshToken] = token?.refreshToken.split(" ");
    const body = {
      refresh_token: refreshToken,
    }
    var headers = new Headers({
      'Accept': 'application/json',
      'Content-type' : 'application/json',
    },);

    const response = await fetch(`${API_HOST}auth/refresh-token`,
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers,
      }
    )
    const newToken = await response.json();
    if(!response.ok){
      throw('Ha ocurrido un error al refrescar el token')
    }

    return {
      ...token,
      accessToken: newToken.token_type + " " + newToken.access_token,
      refreshToken: newToken.token_type + " " + newToken.refresh_token,
    }

  } catch (error) {
    throw error;
  }

}
const API_HOST = process.env.NEXT_PUBLIC_API_HOST ? process.env.NEXT_PUBLIC_API_HOST : ''
