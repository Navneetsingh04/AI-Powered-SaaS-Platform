import { Link } from "react-router";
import { ArrowRight, ShipWheel } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px:20 xl:px-32">
      <div className="pl-5">
      <Link to="/" className="flex items-center gap-2.5">
        <ShipWheel className="size-9 text-primary" />
         <span className="text-3xl font-bold font-mono bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-wide">
          TexoraAi
        </span>
      </Link> 
      </div>
      {user ? (
        <UserButton />
      ) : (
        <button
          className="flex items-center gap-2 rounded-full text-sm cursor-pointer bg-pimary text-white px-10 py-2.5"
          onClick={openSignIn}
        >
          Get Started <ArrowRight className="size-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
