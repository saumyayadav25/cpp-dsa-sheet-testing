// components/BadgeCard.tsx
import { motion } from 'framer-motion';

interface Props {
  name: string;
  icon: string;
  description: string;
  achieved: boolean;
  delay?: number;
}

export default function BadgeCard({ name, icon, description, achieved, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className={`rounded-xl p-4 border ${
        achieved ? 'bg-green-600/10 border-green-400' : 'bg-gray-700/20 border-gray-500/20'
      }`}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-semibold">{name}</div>
      <div className="text-sm text-gray-400">{description}</div>
      {!achieved && (
        <div className="mt-2 text-xs text-yellow-400 italic">Keep going!</div>
      )}
    </motion.div>
  );
}


