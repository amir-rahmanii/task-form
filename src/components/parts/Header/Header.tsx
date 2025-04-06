import PrimaryButton from "@/components/shared/PrimaryButton";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { LuBellRing, LuRabbit } from "react-icons/lu";

export default function Header() {
  return (
    <header className="px-4 py-4 flex justify-between items-center">
      <HiOutlineMenuAlt3 className="text-muted text-2xl" />
      <div className="flex items-center gap-4">
        <PrimaryButton
          className="flex rounded-lg h-8 items-center gap-2 hover:text-light-muted"
          href="/"
          type="button"
          variant="outlined"
          tooltip="create user"
        >
          <LuRabbit className="text-2xl" />
          <span className="text-base">Quick Create</span>
        </PrimaryButton>
        <PrimaryButton
          className="bg-muted px-0 flex justify-between rounded-lg w-4 h-8 items-center gap-1"
          href="/search"
          type="button"
          variant="outlined"
          tooltip="search"
        >
          <IoSearch className="text-muted" />
          <span className="text-base text-muted">K</span>
        </PrimaryButton>
        <LuBellRing className="text-2xl" />
        <FaRegUser className="text-2xl" />
      </div>
    </header>
  );
}
