"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
export default function Profile() {
  const { user, error, isLoading } = useUser();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  if (user) {
    return (
      <div>
        <h1 className="ml-4"> Welcome {user.name}!</h1>
        <a className="mt-8 ml-48" href="/api/auth/logout">
          Logout
        </a>
      </div>
    );
  }
  return <a href="/api/auth/login">Login</a>;
}
