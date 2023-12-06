"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
const Nav = () => {
  const {data : session} = useSession();
  const [providers, setProviders] = useState(null);
  const [toggleDrop, setToggleDrop] = useState(false);

  useEffect(() => {
    const setP = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    setP();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          alt="promtadda logo"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">PromptAdda</p>
      </Link>

      {/* desktop Navigation */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>

            <button type="button" onClick={signOut} className="outline_btn">
              Sign Out
            </button>

            <Link href="/profile">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className="rounded-full"
              ></Image>
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* mobile navigation */}
      <div className="flex relative sm:hidden">
        {session?.user ? (
          <div className="flex">
            <Image
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              onClick={() => setToggleDrop((prev) => !prev)}
            />
            {toggleDrop && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDrop(false)}>
                  My Profile
                </Link>
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setToggleDrop(false)}
                >Create Prompt
                </Link>
                <button
                onClick={()=>{
                  setToggleDrop(false);
                  signOut();
                }}
                className="black_btn mt-1 w-full"
                >
                    SignOut
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  className="black_btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
