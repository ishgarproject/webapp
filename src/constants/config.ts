export const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
export const TRPC_API_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api/trpc`
  : 'http://localhost:3000/api/trpc';
