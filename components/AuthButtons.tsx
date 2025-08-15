"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import Image from "next/image";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { FiSearch, FiX } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
interface User {
  _id: string;
  full_name: string;
  email: string;
  avatar: string;
}

export default function AuthButtons() {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);


  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      const res = await axios.get("/api/check-auth");
      if (res.status === 200) {
        setIsLoggedIn(true);
        setUser(res.data?.user);
      }
    };

    checkAuth();
  }, [isLoggedIn]);

  const menuItems = [
    {
      label: "Track Your Cp",
      href: "/cp-tracker",
      icon: "🎯",
    },
    {
      label: "Star on GitHub",
      href: "https://github.com/saumyayadav25/DSA-Supreme-3.0",
      icon: "⭐",
    },
    {
      label: "Give Testimonial",
      href: "https://forms.gle/8BXQC1o3hsVsEEBp9",
      icon: "✨",
    },
    {
      label: "Provide Feedback",
      href: "https://forms.gle/bdwBp8oFRWugcrcg9",
      icon: "💭",
    },
    {
      label: "Support the project",
      href: "https://www.buymeacoffee.com/saumyayadav",
      icon: "🔥",
    },    
  ];
  const handleLogOut = async () => {
    const res = await axios.post("/api/logout");

    if (res.status === 200) {
      toast("User Logged Out Successfully!");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const navLinks = [
    { href: "/", label: "Home", isActive: pathname === "/" },
    { href: "/notes", label: "Notes", isActive: pathname === "/notes" },
    { href: "/sheet", label: "Sheet", isActive: pathname === "/sheet" },
    {
      href: "/progress",
      label: "Progress",
      isActive: pathname === "/progress",
    },
    {
      href: "/contributors",
      label: "Contributors",
      isActive: pathname === "/contributors",
    },
    {
      href: "/cp-tracker",
      label: "track Your CP",
      isActive: pathname === "/cp-tracker",
    },
  ];
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setShowDropdown(false);
  };

  const hamburgerVariants = {
    closed: {
      rotate: 0,
      scale: 1,
    },
    open: {
      rotate: 180,
      scale: 1.1,
    },
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: -20,
      rotateX: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 20,
        stiffness: 300,
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      rotateX: 15,
      transition: {
        duration: 0.2,
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -20,
      rotateY: -15,
    },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: {
        type: "spring" as "spring",
        damping: 20,
        stiffness: 400,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      rotateY: 15,
      transition: {
        duration: 0.15,
      },
    },
  };

 const HamburgerIcon = ({ isOpen }: { isOpen: boolean }) => (
  <div className="relative w-6 h-6 flex flex-col justify-center items-center">
    <motion.span
      animate={{
        rotate: isOpen ? 45 : 0,
        y: isOpen ? 0 : -4,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="block w-5 h-0.5 bg-foreground origin-center absolute"
    />
    <motion.span
      animate={{
        opacity: isOpen ? 0 : 1,
        x: isOpen ? -10 : 0,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="block w-5 h-0.5 bg-foreground origin-center absolute"
    />
    <motion.span
      animate={{
        rotate: isOpen ? -45 : 0,
        y: isOpen ? 0 : 4,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="block w-5 h-0.5 bg-foreground origin-center absolute"
    />
  </div>
);


  return (
    <div className="flex items-center gap-3">
      {/* Login/Sign In Button or User Profile */}
      {!isLoggedIn ? (
        <motion.a
          href="/sign-in"
          className="px-4 w-20 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 whitespace-nowrap"
        >
          Sign In
        </motion.a>
      ) : (


// <motion.a
// // href={user ? `/profile/${encodeURIComponent(user._id)}` : "#"}
// href={user ? "/profile_pic/settings/avatar" : "#"}
        
//   className="flex items-center gap-2 px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-200 text-white text-sm font-medium border border-white/10"
//   whileHover={{ scale: 1.05 }}
//   whileTap={{ scale: 0.95 }}
// >
//   <div className="w-9 h-9 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500">
//     {user?.avatar ? (
//       <Image src={user.avatar} alt="Avatar" width={32} height={32} />
//     ) : (
//       // `${user?.full_name?.split(" ")[0]?.charAt(0) ?? "U"}${
//       //   user?.full_name?.split(" ")[1]?.charAt(0) ?? ""
//       // }`.toUpperCase()
//       <Image src="/images/default-avatar.svg" alt="Default Avatar" width={32} height={32} />
//     )}
//   </div>
//   {/* <span className="max-w-20 truncate">{user?.full_name}</span> */}
// </motion.a>

//       )}

<motion.a
  href="#"
  className="relative w-9 h-9 rounded-full overflow-hidden flex items-center justify-center border border-white/10 group"
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  {user ? (
    <Image
      src={user.avatar || "/images/default-avatar.png" }
      alt="Avatar"
      width={36}
      height={36}
      className="object-cover w-full h-full"
    />
  ) : (
    <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
      <Image
        src="/images/default-avatar.png"
        alt="Default Avatar"
        width={20}
        height={20}
      />
    </div>
  )}

  {/* Hover Edit Button */}
  <Link
    href="/profile_pic/settings/avatar"
    className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="white"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.232 5.232a3 3 0 014.243 4.243L7.5 21H3v-4.5L15.232 5.232z"
      />
    </svg>
  </Link>
</motion.a>
    )}

      {/* Hamburger Menu */}
      <div className="relative" ref={dropdownRef}>
        <motion.button
          onClick={() => setShowDropdown((prev) => !prev)}
          className="relative p-3 rounded-xl transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50"
          variants={hamburgerVariants}
          animate={showDropdown ? "open" : "closed"}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HamburgerIcon isOpen={showDropdown} />

          {/* Subtle glow effect */}
          <motion.div
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-lg -z-10"
            animate={{
              opacity: showDropdown ? 0.6 : 0,
              scale: showDropdown ? 1.2 : 0.8,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>

        <AnimatePresence mode="wait">
          {showDropdown && (
            <motion.div
              variants={dropdownVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute right-0 mt-3 w-64 origin-top-right z-50"
              style={{ perspective: "1000px" }}
            >
              {/* Glassmorphism backdrop */}
              <div className="relative backdrop-blur-2xl bg-gradient-to-tl from-blue-950/90 via-neutral-950/90 to-neutral-950/90  drop-shadow-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                {/* Subtle animated border */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent)",
                    backgroundSize: "300% 300%",
                  }}
                  animate={{
                    backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="relative p-2">
                  {/* User-specific menu items */}
                  {/* {user && (
                    <>
                      <motion.a
                        href="/profile"
                        variants={itemVariants}
                        className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-200 rounded-xl transition-all duration-200 hover:bg-white/10 hover:text-white relative overflow-hidden"
                        whileHover={{ 
                          scale: 1.02,
                          x: 4,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        
                        <motion.span 
                          className="text-lg flex-shrink-0 relative z-10"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                          👤
                        </motion.span>
                        
                        <span className="relative z-10 font-bold text-sm">
                          Profile
                        </span>
                      </motion.a>

                      <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                      />
                    </>
                  )} */}
                  <div className="md:hidden flex flex-wrap m-2 gap-3 justify-center items-center py-3 ">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.href}
                        whileHover={{ y: -2 }}
                        whileTap={{ y: 0 }}
                      >
                        <Link
                          href={link.href}
                          className={`relative px-3 py-2 rounded-lg transition-all duration-300 group hover:text-blue-400 hover:cursor-pointer hover:bg-white/5`}
                        >
                          <span
                            className={`relative z-10 ${
                              link.isActive
                                ? "text-blue-400"
                                : "text-white hover:text-blue-400"
                            }`}
                          >
                            {link.label}
                          </span>
                          {/* Add active indicator */}
                          {link.isActive && (
                            <motion.div
                              layoutId="activeTab"
                              className="absolute inset-0 bg-blue-500/10 rounded-lg border border-blue-400/30"
                              initial={false}
                              transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                              }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  {/* Bottom highlight */}
                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />

                  {/* Original menu items */}
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                      variants={itemVariants}
                      className="group flex items-center gap-3 px-4 py-3 text-sm text-gray-200 rounded-xl transition-all duration-200 hover:bg-white/10 hover:text-white relative overflow-hidden"
                      whileHover={{
                        scale: 1.02,
                        x: 4,
                      }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* Hover effect background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "0%" }}
                        transition={{ duration: 0.3 }}
                      />

                      <motion.span
                        className="text-lg flex-shrink-0 relative z-10"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        {item.icon}
                      </motion.span>

                      <span className="relative z-10 font-bold text-sm">
                        {item.label}
                      </span>

                      {/* External link indicator */}
                      {item.href.startsWith("http") && (
                        <motion.span
                          className="ml-auto text-xs text-gray-400 opacity-0 group-hover:opacity-100 relative z-10"
                          initial={{ rotate: -45, scale: 0 }}
                          whileHover={{ rotate: 0, scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 15,
                          }}
                        >
                          ↗
                        </motion.span>
                      )}
                    </motion.a>
                  ))}

                  {/* Logout button for logged-in users */}
                  {isLoggedIn && (
                    <>
                      <motion.div
                        className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent my-2"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                      />

                      <motion.div
                        onClick={handleLogout}
                        variants={itemVariants}
                        className="group flex items-center gap-3 px-4 py-3 text-sm text-red-300 rounded-xl transition-all duration-200 hover:bg-red-500/10 hover:text-red-200 relative overflow-hidden w-full"
                        whileHover={{
                          scale: 1.02,
                          x: 4,
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-red-600/10 rounded-xl opacity-0 group-hover:opacity-100"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />

                        <motion.span
                          className="text-lg flex-shrink-0 relative z-10"
                          whileHover={{ scale: 1.2, rotate: 15 }}
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 10,
                          }}
                        ></motion.span>

                        <Button
                          onClick={handleLogOut}
                          className="relative z-10 font-bold text-sm"
                        >
                          <LogOut /> LogOut
                        </Button>
                      </motion.div>
                    </>
                  )}

                  {/* Bottom highlight */}
                  <motion.div
                    className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-2"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
