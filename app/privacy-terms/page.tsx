'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// Create a separate component for the content that uses useSearchParams
function PrivacyTermsContent() {
  const [streak, setStreak] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'privacy' | 'terms'>('privacy');
  const router = useRouter();
  const searchParams = useSearchParams();

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
      },
    }),
  };

  useEffect(() => {
    const savedStreak = parseInt(localStorage.getItem('potd_streak') || '0');
    setStreak(savedStreak);

    // Check URL parameters to set active tab
    const tab = searchParams?.get('tab');
    if (tab === 'terms') {
      setActiveTab('terms');
    } else {
      setActiveTab('privacy');
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'privacy' | 'terms') => {
    setActiveTab(tab);
    // Update URL without page refresh
    const newUrl = tab === 'terms' ? '/privacy-terms?tab=terms' : '/privacy-terms';
    router.push(newUrl, { scroll: false });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-24 px-4 sm:px-8 lg:px-16 bg-background transition-colors duration-300">
        <section aria-labelledby="legal-heading" className="max-w-4xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <h1 id="legal-heading" className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Legal Information
              </span>
            </h1>
            <p className="text-sm md:text-base text-foreground max-w-2xl mx-auto">
              Your privacy and rights matter to us. <br />
              <span className="text-yellow-400 font-medium">Please read these documents carefully.</span>
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeInUp}
            className="flex justify-center mb-8"
          >
            <div className="bg-gray-800/50 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => handleTabChange('privacy')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'privacy'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-800 hover:text-white'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => handleTabChange('terms')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === 'terms'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'text-gray-800 hover:text-white'
                }`}
              >
                Terms of Service
              </button>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={2}
            variants={fadeInUp}
            className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-2xl p-8 border border-white/10 dark:border-white/10 border-gray-200"
          >
            {activeTab === 'privacy' ? (
              <div className="prose max-w-none text-foreground">
                <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">Privacy Policy</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <div className="space-y-6 text-gray-800 dark:text-gray-300">
                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">1. Information We Collect</h3>
                    <p className="mb-3">
                      DSAMate Template is designed with privacy in mind. We collect minimal information to provide you with the best learning experience:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>Local Storage Data:</strong> Your progress, solved problems, streaks, and preferences are stored locally in your browser</li>
                      <li><strong>GitHub Data:</strong> When you contribute, we access public GitHub information (username, avatar, contributions) via GitHub API</li>
                      <li><strong>Usage Analytics:</strong> Anonymous usage patterns to improve the platform (optional)</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">2. How We Use Your Information</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Track your learning progress and maintain streaks</li>
                      <li>Provide personalized recommendations</li>
                      <li>Display contributor information on our contributors page</li>
                      <li>Improve platform functionality and user experience</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">3. Data Storage and Security</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Your progress data is stored locally in your browser's localStorage</li>
                      <li>No personal data is transmitted to external servers without your consent</li>
                      <li>GitHub contributor data is publicly available information</li>
                      <li>We implement security measures to protect against unauthorized access</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">4. Third-Party Services</h3>
                    <p className="mb-3">We use the following third-party services:</p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li><strong>GitHub API:</strong> To fetch contributor information</li>
                      <li><strong>Vercel:</strong> For hosting and deployment</li>
                      <li><strong>CDN Services:</strong> For fast content delivery</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">5. Your Rights</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Clear your local data at any time through browser settings</li>
                      <li>Opt out of analytics (if implemented)</li>
                      <li>Request removal from contributor listings</li>
                      <li>Contact us with privacy concerns</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">6. Contact Information</h3>
                    <p>
                      For privacy-related questions or concerns, please contact us through:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>GitHub Issues: <Link href="https://github.com/saumyayadav25/cpp-dsa-sheet-testing/issues" className="text-purple-600 dark:text-purple-400 hover:underline">Create an issue</Link></li>
                      <li>Email: Available in our GitHub profile</li>
                    </ul>
                  </section>
                </div>
              </div>
            ) : (
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-400">Terms of Service</h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <div className="space-y-6 text-gray-800 dark:text-gray-300">
                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">1. Acceptance of Terms</h3>
                    <p>
                      By accessing and using DSAMate v2, you accept and agree to be bound by the terms and provision of this agreement. 
                      This is a template project created for educational purposes under GirlScript Summer of Code (GSSoC) 2025.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">2. Description of Service</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>DSAMate v2 is an open-source educational platform for learning DSA concepts</li>
                      <li>This is a v2 version with placeholder content for contribution purposes</li>
                      <li>The service is provided "as is" without warranties of any kind</li>
                      <li>Features include practice tracking, progress analytics, and contribution management</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">3. User Responsibilities</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Use the platform for educational and learning purposes only</li>
                      <li>Follow the code of conduct when contributing to the project</li>
                      <li>Respect intellectual property rights</li>
                      <li>Do not attempt to disrupt or harm the service</li>
                      <li>Provide accurate information when contributing</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">4. Contributing Guidelines</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>All contributions must follow our contributing guidelines</li>
                      <li>Submitted code should be original or properly attributed</li>
                      <li>Contributors retain rights to their contributions under MIT license</li>
                      <li>Malicious or harmful contributions will be rejected</li>
                      <li>Maintainers reserve the right to modify or reject contributions</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">5. Intellectual Property</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>This project is licensed under the MIT License</li>
                      <li>Contributors retain copyright to their original contributions</li>
                      <li>Third-party libraries and resources are used under their respective licenses</li>
                      <li>Users may fork, modify, and distribute under MIT license terms</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">6. Limitation of Liability</h3>
                    <p className="mb-3">
                      DSAMate v2 and its contributors shall not be liable for:
                    </p>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Any direct, indirect, or consequential damages</li>
                      <li>Loss of data or progress information</li>
                      <li>Service interruptions or downtime</li>
                      <li>Accuracy of educational content (this is a template)</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">7. Modifications</h3>
                    <p>
                      We reserve the right to modify these terms at any time. Changes will be posted in this document 
                      and the "Last updated" date will be revised. Continued use of the service constitutes acceptance of modified terms.
                    </p>
                  </section>

                  <section>
                    <h3 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">8. Contact Information</h3>
                    <p>
                      For questions about these Terms of Service, please contact us through:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mt-2">
                      <li>GitHub Repository: <Link href="https://github.com/saumyayadav25/cpp-dsa-sheet-testing" className="text-purple-600 dark:text-purple-400 hover:underline">DSAMate v2</Link></li>
                      <li>Issues: <Link href="https://github.com/saumyayadav25/cpp-dsa-sheet-testing/issues" className="text-purple-600 dark:text-purple-400 hover:underline">Report issues or ask questions</Link></li>
                      <li>Discussions: GitHub Discussions for community support</li>
                    </ul>
                  </section>
                </div>
              </div>
            )}
          </motion.div>

          {/* Footer Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={3}
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <div className="bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-pink-500/10 rounded-2xl p-6 border border-white/10">
              <h3 className="text-lg font-semibold mb-4">
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Have Questions?
                </span>
              </h3>
              <p className="text-foreground mb-4">
                If you have any questions about our Privacy Policy or Terms of Service, 
                we're here to help! Feel free to reach out through our GitHub repository.
              </p>
              <Button asChild size="lg" className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600">
                <Link
                  href="https://github.com/saumyayadav25/cpp-dsa-sheet-testing/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Contact Us on GitHub
                </Link>
              </Button>
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}

// Loading component for Suspense fallback
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  );
}

// Main component wrapped with Suspense
export default function PrivacyTermsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <PrivacyTermsContent />
    </Suspense>
  );
}