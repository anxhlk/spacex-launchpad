/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Logo from "../public/images/logo.svg";
import Profile from "./profile";

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
