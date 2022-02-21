export const TRPC_API_URL = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/trpc`
  : 'http://localhost:3000/api/trpc';
