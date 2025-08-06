
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiLeetcode,
  SiHackerrank,
  SiGeeksforgeeks,
  SiSpoj,
  SiCodingninjas,
} from 'react-icons/si';
import { FaCode, FaGithub, FaArrowDown, FaArrowUp } from 'react-icons/fa';
import EmptyState from '@/components/EmptyState';
import { sampleTopics, type Question } from '@/data/questions';
import Confetti from 'react-confetti';

type Props = {
  difficultyFilter: string;
  statusFilter: string;
  revisionFilter: string;
  searchTerm: string;
  platformFilter: string;
  companyFilter: string;
};

export default function SheetContent({
  difficultyFilter,
  statusFilter,
  revisionFilter,
  searchTerm,
  platformFilter,
  companyFilter,
}: Props) {
  const [openTopics, setOpenTopics] = useState<number[]>([]);
  const [progress, setProgress] = useState<Record<string, any>>({});
  const [allOpen, setAllOpen] = useState(false);
  const [confettiTopic, setConfettiTopic] = useState<number | null>(null);

  // Load & persist
  useEffect(() => {
    const stored = localStorage.getItem('dsa-progress');
    if (stored) setProgress(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem('dsa-progress', JSON.stringify(progress));
  }, [progress]);

  const toggleCheckbox = (id: string, field: 'isSolved' | 'isMarkedForRevision') => {
    setProgress(prev => {
      const cur = prev[id]?.[field] || false;
      const updated = { ...prev[id], [field]: !cur };
      // if marking solved, store timestamp
      if (field === 'isSolved' && !cur) updated.solvedAt = new Date().toISOString();
      return { ...prev, [id]: updated };
    });
  };

  const toggleTopic = (id: number) => {
    setOpenTopics(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
    // Celebrate if just opened a fully solved topic
    const topic = sampleTopics.find(t => t.id === id)!;
    const total = topic.questions.length;
    const solved = topic.questions.filter(q => {
      const key = `${id}-${q.id}`;
      return (progress[key]?.isSolved ?? q.isSolved);
    }).length;
    if (solved === total && !openTopics.includes(id)) {
      setConfettiTopic(id);
      setTimeout(() => setConfettiTopic(null), 3000);
    }
  };

  // Expand/collapse all
  const toggleAll = () => {
    if (allOpen) {
      setOpenTopics([]);
      setAllOpen(false);
    } else {
      setOpenTopics(sampleTopics.map(t => t.id));
      setAllOpen(true);
    }
  };

  // Count filtered
  const totalFiltered = sampleTopics.reduce((sum, t) => {
    const count = t.questions.filter(q => {
      const key = `${t.id}-${q.id}`, local = progress[key] || {};
      const solved = local.isSolved ?? q.isSolved;
      const marked = local.isMarkedForRevision ?? q.isMarkedForRevision;
      if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
      if (statusFilter==='solved'&&!solved) return false;
      if (statusFilter==='unsolved'&&solved) return false;
      if (revisionFilter==='marked'&&!marked) return false;
      if (revisionFilter==='unmarked'&&marked) return false;
      if (searchTerm && !q.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (platformFilter && !Object.keys(q.links||{}).includes(platformFilter)) return false;
      if (companyFilter && (!q.companies||!q.companies.includes(companyFilter))) return false;
      return true;
    }).length;
    return sum + count;
  }, 0);

  if (totalFiltered === 0) {
    return (
      <div className="p-8">
        <EmptyState
          message="No questions match your filters"
          suggestion="Try adjusting your filters."
        />
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-zinc-900 py-8">
      {/* Collapse/Expand All */}
      <div className="max-w-4xl mx-auto mb-4 text-right px-4">
        <button
          onClick={toggleAll}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
        >
          {allOpen ? <FaArrowUp /> : <FaArrowDown />}
          {allOpen ? 'Collapse All' : 'Expand All'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-6 px-4">
        {sampleTopics.map((topic, tIdx) => {
          const items = topic.questions.filter(q => {
            const key = `${topic.id}-${q.id}`, local = progress[key] || {};
            const solved = local.isSolved ?? q.isSolved;
            const marked = local.isMarkedForRevision ?? q.isMarkedForRevision;
            if (difficultyFilter && q.difficulty !== difficultyFilter) return false;
            if (statusFilter==='solved'&&!solved) return false;
            if (statusFilter==='unsolved'&&solved) return false;
            if (revisionFilter==='marked'&&!marked) return false;
            if (revisionFilter==='unmarked'&&marked) return false;
            if (searchTerm && !q.title.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            if (platformFilter && !Object.keys(q.links||{}).includes(platformFilter)) return false;
            if (companyFilter && (!q.companies||!q.companies.includes(companyFilter))) return false;
            return true;
          });
          if (!items.length) return null;

          const total = topic.questions.length;
          const solved = topic.questions.filter(q => {
            const key = `${topic.id}-${q.id}`;
            return progress[key]?.isSolved ?? q.isSolved;
          }).length;
          const percent = (solved/total)*100;
          const isOpen = openTopics.includes(topic.id);

          return (
            <motion.div
              key={topic.id}
              className="border rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: tIdx*0.1 }}
            >
              {/* Confetti */}
              {confettiTopic===topic.id && <Confetti />}

              {/* Header */}
              <motion.div
  className="px-6 py-4 bg-[#e7f0ff] dark:bg-[#223e76] text-[#1a1a1a] dark:text-white flex justify-between items-center cursor-pointer hover:bg-[#d4e3fc] dark:hover:bg-[#415378] transition-colors duration-200"
  onClick={() => toggleTopic(topic.id)}
  initial={{ scale: 0.98 }}
  animate={{ scale: 1 }}
>

                <motion.div
                  className="text-xl font-bold"
                  animate={{ x: isOpen?5:0 }}
                  transition={{ type:'spring', stiffness:200 }}
                >
                  {topic.name}
                </motion.div>
                <div className="flex items-center gap-4">
                  {/* Progress bar */}
                  <div className="w-32 h-2 bg-blue-300 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-green-400"
                      initial={{ width: 0 }}
                      animate={{ width: `${percent}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen?180:0 }}
                    transition={{ duration:0.3 }}
                  >
                    ▼
                  </motion.span>
                </div>
              </motion.div>

              {/* Body */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    key="body"
                    className="bg-white dark:bg-zinc-900 px-6 py-4"
                    initial={{ height:0, opacity:0 }}
                    animate={{ height:'auto', opacity:1 }}
                    exit={{ height:0, opacity:0 }}
                    transition={{ duration:0.4, ease:'easeInOut' }}
                  >
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2">Question</th>
                          <th className="py-2">Links</th>
                          <th className="py-2">Diff</th>
                          <th className="py-2">Solved</th>
                          <th className="py-2">Revise</th>
                          <th className="py-2">Solution</th>
                        </tr>
                      </thead>
                      <tbody>
                        {items.map((q, qIdx) => {
                          const key = `${topic.id}-${q.id}`;
                          const local = progress[key] || {};
                          const s = local.isSolved??q.isSolved;
                          const m = local.isMarkedForRevision??q.isMarkedForRevision;

                          return (
                            <motion.tr
                              key={key}
                              className="border-b"
                              initial={{ opacity:0, x:-20 }}
                              animate={{ opacity:1, x:0 }}
                              transition={{ delay:qIdx*0.05 }}
                              whileHover={{ backgroundColor:'#76a7e8ff' }}
                            >
                              <td className="py-2">{q.title}</td>
                              <td className="py-2 flex gap-2">
                                {q.links.leetcode && <SiLeetcode className="text-orange-500 hover:rotate-12 transition" />}
                                {q.links.gfg && <SiGeeksforgeeks className="text-green-600 hover:rotate-12 transition" />}
                                {q.links.hackerrank && <SiHackerrank className="text-cyan-500 hover:rotate-12 transition" />}
                                {q.links.spoj && <SiSpoj className="text-purple-500 hover:rotate-12 transition" />}
                                {q.links.ninja && <SiCodingninjas className="text-pink-500 hover:rotate-12 transition" />}
                                {q.links.code && <FaCode className="text-blue-500 hover:rotate-12 transition" />}
                              </td>
                              <td className={`py-2 font-medium text-center ${
                                q.difficulty==='easy'?'text-green-600':q.difficulty==='medium'?'text-yellow-600':'text-red-600'
                              }`}>{q.difficulty.charAt(0).toUpperCase()+q.difficulty.slice(1)}</td>
                              <td className="py-2 text-center">
                                <motion.input type="checkbox" checked={s}
                                  onChange={()=>toggleCheckbox(key,'isSolved')}
                                  className="accent-blue-600" whileTap={{scale:1.2}} />
                              </td>
                              <td className="py-2 text-center">
                                <motion.input type="checkbox" checked={m}
                                  onChange={()=>toggleCheckbox(key,'isMarkedForRevision')}
                                  className="accent-red-600" whileTap={{scale:1.2}} />
                              </td>
                              <td className="py-2 text-center">
                                {q.solutionLink?(
                                  <motion.a href={q.solutionLink} target="_blank" rel="noopener noreferrer"
                                    whileHover={{scale:1.1}}>
                                    <FaGithub className="text-xl text-gray-700" />
                                  </motion.a>
                                ):<span className="text-gray-400">—</span>}
                              </td>
                            </motion.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
