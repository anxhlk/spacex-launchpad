/* eslint-disable @next/next/no-img-element */
"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Image from "next/image";
import Logo from "../public/images/logo.svg";

function Profile() {
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

const Navbar = () => {
  return (
    <nav className="bg-black p-4 text-white flex justify-between items-center">
      <div className="flex items-center">
        <Image src={Logo} alt="SpaceX Logo" width={200} height={200} />
      </div>
      <span className="flex flex-row bg-black text-white font-bold text-xl p-6">
        <Profile />
      </span>
    </nav>
  );
};

export default Navbar;
