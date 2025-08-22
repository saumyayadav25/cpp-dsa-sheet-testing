"use Client";
import { Filter, Search } from "lucide-react";
import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

interface c{
    companies:string[]
}

const filterSection: c = ({companies}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  return (
    <section className="py-8 px-4 border-b bg-secondary/20">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search companies, positions, or topics..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedCompany === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCompany(null)}
              >
                All Companies
              </Button>
              {companies.slice(0, 4).map((company) => (
                <Button
                  key={company}
                  variant={selectedCompany === company ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCompany(company)}
                >
                  {company}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default filterSection;
