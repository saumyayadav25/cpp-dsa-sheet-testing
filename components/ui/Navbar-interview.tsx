import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import React from "react";

interface LayoutProps {
  onBack?: string;
  page1?: string;
  page1Link?: string;
  page2?: string;
  page2Link?: string;
  pageTitle: string;
  icon: React.ReactElement;
  page3?: string;
  page3Link?: string;
}

const Navbar: React.FC<LayoutProps> = ({
  onBack,
  page1,
  page1Link,
  page2Link,
  page2,
  pageTitle,
  icon,
  page3,
  page3Link,
}) => {
  return (
    <nav className="border-b w-full bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onPush={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              {icon}
              <h1 className="text-xl font-bold">{pageTitle}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
           {page1 && <Button variant="ghost" onPush={page1Link || "/"}>
              {page1}
            </Button>}
            {page2 && <Button variant="ghost" onPush={page2Link || "/"}>
              {page2}
            </Button>}
            {page3 && <Button variant={"outline"} size={"lg"} onPush={page3Link || "/"}>
              <Plus className="h-4 w-4 mr-2" />
              {page3}
            </Button>}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
