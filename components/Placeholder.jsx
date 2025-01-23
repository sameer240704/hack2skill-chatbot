"use client";

import Image from "next/image";
import { Logo } from "@/assets/images";
import { useGlobalState } from "@/context/GlobalContext";

const avatars = [
  { id: 1, name: "Tony Stark" },
  { id: 2, name: "Thor Odinson" },
  { id: 3, name: "Captain America" },
  { id: 4, name: "Black Widow" },
];

const Placeholder = () => {
  const { selectedAvatar } = useGlobalState();
  const currentAvatar = avatars.find((avatar) => avatar.id === selectedAvatar);

  return (
    <div className="flex flex-col justify-center items-center fira-code">
      <Image src={Logo} alt="Logo" className="h-24 w-24 rounded-3xl mb-4" />

      <div className="text-center font-bold">
        <h1 className="text-3xl text-[#868FAA]">
          Hi, {currentAvatar ? currentAvatar.name : "Avenger"}!
        </h1>
        <h1 className="text-gray-600 text-3xl">
          Can I help you with anything?
        </h1>
      </div>
    </div>
  );
};

export default Placeholder;
