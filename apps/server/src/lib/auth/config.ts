import { Auth, AuthConfig } from '@auth/core';
import AzureADProvider from '@auth/core/providers/azure-ad';
import prisma from '../../../../shared/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import cookiesConfig from '@/lib/auth/cookieConfig';
import { Session } from '@auth/core/types';

export const authConfig: AuthConfig = {
  trustHost: true,
  secret: process.env.AUTH_SECRET!,
  adapter: PrismaAdapter(prisma),
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      profile: (profile) => {
        return {
          ...profile,
          role: profile.roles[0],
        };
      },
    }),
  ],
};

export const getSession = async (request: Request) => {
  try {
    const url = `${new URL(request.url).origin}/api/auth/session`;

    const session = await Auth(
      new Request(url, {
        method: 'GET',
        headers: request.headers,
      }),
      authConfig
    );
    // @ts-expect-error
    const sessionJson = (await session.json()) as Session;
    return sessionJson;
  } catch (e) {
    return null;
  }
};
