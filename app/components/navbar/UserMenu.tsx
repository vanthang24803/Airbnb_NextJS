"use client";

import { BiGlobe } from "react-icons/bi";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import React, { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { signOut } from "next-auth/react";
import SubMenu from "./SubMenu";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [loginModal, rentModal, currentUser]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden md:block text-sm font-bold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
          onClick={onRent}
        >
          Airbnb your home
        </div>

        <div
          className="hidden font-semibold hover:bg-neutral-200 gap-3  w-[40px] h-[40px] lg:flex justify-center items-center cursor-pointer rounded-full"
          onClick={() => {}}
        >
          <BiGlobe size={18} />
        </div>

        <div
          className="p-4 md:py-2 md:px-2 border-[1px] border-neutral-200 flex flex-row  items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          onClick={toggleOpen}
        >
          <AiOutlineMenu className="lg:mx-1" />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className=" absolute 
            rounded-xl 
            shadow-lg
            w-[40vw]
            md:w-3/4 
            bg-white 
            overflow-hidden 
            right-0 
            top-16 
            text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label="Messages" />
                <MenuItem onClick={() => {}} label="Trips" />
                <MenuItem onClick={() => {}} label="Wishlists" />
                <MenuItem onClick={() => {}} label="Reservations" />
                <MenuItem onClick={() => {}} label="Properties" />
                <hr />
                <SubMenu onClick={rentModal.onOpen} label="Airbnb your home" />
                <SubMenu onClick={() => {}} label="Account" />
                <hr />
                <SubMenu onClick={() => {}} label="Help" />
                <SubMenu onClick={() => signOut()} label="Log out" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <SubMenu onClick={registerModal.onOpen} label="Sign up" />
                <hr />
                <SubMenu onClick={onRent} label="Airbnb your home" />
                <SubMenu onClick={() => {}} label="Help" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
