import { motion } from 'framer-motion'
import { BiSearchAlt } from 'react-icons/bi'

interface EmptyStateProps {
  message?: string
  suggestion?: string
}

export default function EmptyState({
  message = "No questions match your filters",
  suggestion = "Try removing some filters or selecting a different topic.",
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center text-center p-8 space-y-4 text-gray-600"
    >
      <BiSearchAlt className="text-6xl" />
      <h2 className="text-2xl font-semibold">{message}</h2>
      <p className="text-sm">{suggestion}</p>
    </motion.div>
  )
}
