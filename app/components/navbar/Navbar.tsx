"use client";

import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <nav className="fixed w-full bg-white z-10 shadow-md">
      <div className="py-4 boder-b-[1px] ">
        <Container>
          {/* NAVIGATION */}
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu />
          </div>
        </Container>
      </div>
    </nav>
  );
};

export default Navbar;