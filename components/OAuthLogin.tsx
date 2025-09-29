"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const GoogleLoginButton = () => {
  const router = useRouter();

  const handleGoogleLogin = () => {
    router.push("/api/google");
  };

  const handleGithubLogin = () => {
    router.push("/api/github");
  }

  return (
    <div className="flex justify-center items-center gap-5">
      <Button
        onClick={handleGoogleLogin}
        className="bg-white/80  text-white px-6 py-3 rounded-full flex items-center justify-center transition-all duration-200 min-w-[50px] min-h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-300"
      >
        <Image src={"/assets/google.png"} alt="Google" width={30} height={30} />
      </Button>
      <span className="mx-3 text-gray-400 font-semibold text-2xl">|</span>
      <Button
        onClick={handleGithubLogin}
        className="bg-white/80  text-white px-6 py-3 rounded-full flex items-center justify-center transition-all duration-200 min-w-[50px] min-h-[50px] focus:outline-none focus:ring-2 focus:ring-blue-400 hover:bg-blue-300"
      >
        <Image src={"/assets/github.png"} alt="Github" width={30} height={30} />
      </Button>
    </div>
  );
};
