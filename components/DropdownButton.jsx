"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useGlobalState } from "@/context/GlobalContext";
import { BlackWidow, CaptainAmerica, Ironman, Thor } from "@/assets/images";

const avatars = [
  {
    id: 1,
    name: "Ironman",
    image: Ironman,
    color: "bg-gradient-to-br from-red-500 to-red-700",
    hoverColor: "hover:bg-gradient-to-br hover:from-red-600 hover:to-red-800",
  },
  {
    id: 2,
    name: "Thor",
    image: Thor,
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
    hoverColor: "hover:bg-gradient-to-br hover:from-blue-700 hover:to-blue-900",
  },
  {
    id: 3,
    name: "Captain America",
    image: CaptainAmerica,
    color: "bg-gradient-to-br from-sky-700 to-sky-900",
    hoverColor: "hover:bg-gradient-to-br hover:from-sky-800 hover:to-sky-950",
  },
  {
    id: 4,
    name: "Black Widow",
    image: BlackWidow,
    color: "bg-gradient-to-br from-gray-500 to-black",
    hoverColor: "hover:bg-gradient-to-br hover:from-gray-900 hover:to-gray-950",
  },
];

export const DropdownButton = () => {
  const { selectedAvatar, setSelectedAvatar } = useGlobalState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedAvatarObject = avatars.find(
    (avatar) => avatar.id === selectedAvatar
  );

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
    setIsDropdownOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.div
        onClick={toggleDropdown}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer 
        ${selectedAvatarObject?.color} 
        shadow-lg transition-all duration-300 ease-in-out`}
      >
        <Image
          src={selectedAvatarObject?.image}
          alt={selectedAvatarObject?.name}
          className="w-10 h-10 rounded-full object-cover border border-white/30"
        />
      </motion.div>

      <AnimatePresence>
        {isDropdownOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-3 right-0 w-56 bg-white/20 backdrop-blur-xl 
            border border-gray-200/50 rounded-xl shadow-2xl z-50 overflow-hidden 
            ring-2 ring-white/10"
          >
            {avatars.map((avatar) => (
              <motion.div
                key={avatar.id}
                onClick={() => handleAvatarSelect(avatar.id)}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
                className={`flex items-center space-x-4 px-4 py-3 cursor-pointer 
                transition-colors duration-200 
                ${avatar.hoverColor}`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center 
                  ${avatar.color} shadow-md`}
                >
                  <Image
                    src={avatar.image}
                    alt={avatar.name}
                    className="w-8 h-8 rounded-full object-cover border border-white/30"
                  />
                </div>
                <span className="text-gray-100 font-semibold text-md tracking-wide">
                  {avatar.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
