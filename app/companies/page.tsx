'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import CompanySelector from '@/components/CompanySelector';
import CompanyQuestionsList from '@/components/CompanyQuestionsList';
import CompanyProgressSummary from '@/components/CompanyProgressSummary';
import { type Company } from '@/data/companyQuestions';

export default function CompaniesPage() {
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleBackToCompanies = () => {
    setSelectedCompany(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white dark:bg-background text-gray-900 dark:text-white px-4 md:px-12 py-24 transition-colors duration-300">
        <CompanyProgressSummary />
        {selectedCompany ? (
          <>
            <CompanySelector 
              onCompanySelect={handleBackToCompanies} 
              selectedCompany={selectedCompany}
            />
            <CompanyQuestionsList 
              questions={selectedCompany.questions}
              companyName={selectedCompany.name}
            />
          </>
        ) : (
          <CompanySelector onCompanySelect={handleCompanySelect} />
        )}
      </main>
    </>
  );
}
