'use client';

import { companies, type Company } from '@/data/companyQuestions';
import { useState } from 'react';
import { Search, Building2, Users, TrendingUp } from 'lucide-react';

interface CompanySelectorProps {
  onCompanySelect: (company: Company) => void;
  selectedCompany?: Company;
}

export default function CompanySelector({ onCompanySelect, selectedCompany }: CompanySelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 dark:text-green-400';
      case 'medium': return 'text-yellow-600 dark:text-yellow-400';
      case 'hard': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getFrequencyIcon = (totalQuestions: number) => {
    if (totalQuestions >= 10) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (totalQuestions >= 7) return <TrendingUp className="w-4 h-4 text-yellow-500" />;
    return <TrendingUp className="w-4 h-4 text-gray-500" />;
  };

  if (selectedCompany) {
    return (
      <div className="mb-6">
        <button
          onClick={() => onCompanySelect(undefined as any)}
          className="mb-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2"
        >
          ← Back to Companies
        </button>
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedCompany.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {selectedCompany.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {selectedCompany.totalQuestions}
              </div>
              <div className="text-sm text-gray-500">Questions</div>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                {selectedCompany.difficulty.easy}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Easy</div>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
                {selectedCompany.difficulty.medium}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Medium</div>
            </div>
            <div className="text-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                {selectedCompany.difficulty.hard}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Hard</div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Popular Topics</h3>
            <div className="flex flex-wrap gap-2">
              {selectedCompany.popularTags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <div className="mb-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Company-wise Questions
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Browse DSA questions asked by top tech companies. Practice company-specific problems to ace your interviews.
        </p>
        
        {/* Search and View Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'grid'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Companies Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              onClick={() => onCompanySelect(company)}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 cursor-pointer hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {company.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      {getFrequencyIcon(company.totalQuestions)}
                      <span>{company.totalQuestions} questions</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {company.description}
              </p>
              
              <div className="flex justify-between items-center text-xs">
                <div className="flex gap-3">
                  <span className={getDifficultyColor('easy')}>
                    {company.difficulty.easy}E
                  </span>
                  <span className={getDifficultyColor('medium')}>
                    {company.difficulty.medium}M
                  </span>
                  <span className={getDifficultyColor('hard')}>
                    {company.difficulty.hard}H
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-500">
                  <Users className="w-3 h-3" />
                  <span>Popular</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              onClick={() => onCompanySelect(company)}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 cursor-pointer hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {company.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {company.description}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex gap-3">
                    <span className={getDifficultyColor('easy')}>
                      {company.difficulty.easy}E
                    </span>
                    <span className={getDifficultyColor('medium')}>
                      {company.difficulty.medium}M
                    </span>
                    <span className={getDifficultyColor('hard')}>
                      {company.difficulty.hard}H
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {company.totalQuestions}
                    </div>
                    <div className="text-xs text-gray-500">questions</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No companies found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms to find companies.
          </p>
        </div>
      )}
    </div>
  );
}
