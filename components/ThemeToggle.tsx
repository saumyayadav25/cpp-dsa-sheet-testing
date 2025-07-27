'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const themes = [
    { name: 'light', icon: Sun, label: 'Light' },
    { name: 'dark', icon: Moon, label: 'Dark' },
    { name: 'system', icon: Monitor, label: 'System' },
  ];

  const currentThemeIndex = themes.findIndex(t => t.name === theme);
  const nextTheme = themes[(currentThemeIndex + 1) % themes.length];

  const handleThemeChange = () => {
    setTheme(nextTheme.name);
  };

  const CurrentIcon = themes.find(t => t.name === theme)?.icon || Sun;

  return (
    <motion.button
      onClick={handleThemeChange}
      className="relative p-2 rounded-xl bg-white/10 hover:bg-white/15 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 transition-all duration-300 border border-white/10 dark:border-gray-700 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={`Switch to ${nextTheme.label} mode`}
    >
      {/* Animated background gradient */}
      <motion.div
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        animate={{
          backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ backgroundSize: '200% 200%' }}
      />
      
      <div className="relative z-10 flex items-center justify-center w-6 h-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={theme}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0, rotate: 180, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="text-gray-700 dark:text-gray-200"
          >
            <CurrentIcon size={20} />
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
    </motion.button>
  );
}
