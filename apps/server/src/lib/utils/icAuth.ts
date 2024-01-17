/**
 * @function icAuth
 * @description Authentication with IC database, and regenerates session token if needed
 */

import { getToken, setToken } from './token';
import { fetcher } from './fetcher';

interface TokenResponse {
  access_token: string;
  expires_in: number;
}

export async function icAuth(): Promise<string> {
  const token = await getToken('icToken');

  if (token === null) {
    const newToken = await fetchNewToken();
    await setToken('icToken', newToken.access_token, newToken.expires_in);
    return newToken.access_token;
  } else {
    return token;
  }
}

async function fetchNewToken(): Promise<TokenResponse> {
  const body = new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: process.env.ONEROSTER_CLIENT_ID as string,
    client_secret: process.env.ONEROSTER_CLIENT_SECRET as string,
  });
  const data = await fetcher<TokenResponse>(
    'https://mtdecloud2.infinitecampus.org/campus/oauth2/token?appName=laurel',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body.toString(),
    }
  );
  console.log('data: ', data);
  return data;
}
