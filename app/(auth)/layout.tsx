import { Brain, Star, Zap } from "lucide-react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-300/30 animate-in fade-in slide-in-from-bottom-6">

      {/* Left Side: Gradient branding */}
      <div className="hidden md:flex md:flex-col md:w-1/2 bg-gradient-to-br from-slate-900 to-blue-600 text-white p-10 justify-center space-y-6 relative transition-all duration-300 rounded-r-4xl h-screen">
        <div className="flex flex-col items-center text-center space-y-2">
          <Image
            src={"/icons/icon-192.png"}
            alt="DSAMate Logo"
            width={120}
            height={120}
            className="mb-10 w-[180px] h-[100px] shake-hover"
          />
          <h1 className="text-3xl lg:text-4xl font-bold leading-tight">Make it to DSA</h1>
          <p className="text-base text-white/90 max-w-sm">Get all DSA problems here to boost your career.</p>
        </div>

        <div className="space-y-6 mt-10">
          <FeatureItem icon={<Zap className="text-black" />} title="Smooth User Expirence" desc="Find your problem to get started with." />
          <FeatureItem icon={<Brain className="text-black" />} title="Question Index" desc="All questions in one place." />
          <FeatureItem icon={<Star className="text-black" />} title="Smart Insights" desc="AI helps to make your progress better." />
        </div>
      </div>

      {/* Right Side: Auth Form */}
      <div className="flex flex-col w-full md:w-1/2 justify-center items-center p-6 sm:p-8 bg-slate-300/30 md:h-screen">
        <Image src={"/icons/icon-192.png"} alt="DSAMate logo" width={100} height={100} className="block md:hidden m-5 w-[100px] h-[100px]"/>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex space-x-4 items-start">
      <div className="bg-gray-50 bg-opacity-20 p-2 rounded-md">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm text-white/90">{desc}</p>
      </div>
    </div>
  );
}
