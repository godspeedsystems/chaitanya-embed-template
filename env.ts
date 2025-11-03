const env = {
  apiUrl: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000',
  userId: process.env.NEXT_PUBLIC_USER_ID,
  userEmail: process.env.NEXT_PUBLIC_USER_EMAIL,
  socketUrl: process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000',
};

export default env;
