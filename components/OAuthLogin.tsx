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
        className="bg-white/80  text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-200 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <Image src={"/assets/google.png"} alt="Google" width={28} height={28} />
      </Button>
      <span className="mx-3 text-gray-400 font-semibold text-lg">|</span>
      <Button
        onClick={handleGithubLogin}
        className="bg-white/80  text-white px-6 py-3 rounded-lg flex items-center justify-center transition-all duration-200 min-w-[160px] focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <Image src={"/assets/github.png"} alt="Github" width={28} height={28} />
      </Button>
    </div>
  );
};
