"use client"
import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { CardSpotlight } from "./ui/card-spotlight";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";

type Testimonial = {
  _id: string;
  name: string;
  email: string;
  designation: string;
  rating: number;
  likedMost: string;
  howHelped: string;
  feedback: string;
  canShow: boolean;
  displayPreference: string; // "nameAndDesignation", "nameOnly", "anonymous"
  date: string;
};

type DisplayTestimonial = {
  _id: string;
  name: string;
  username: string;
  designation?: string;
  rating: number;
  text: string;
  likedMost: string;
  howHelped: string;
  visibility: "full" | "nameOnly" | "anonymous";
  img: string;
};
const transformTestimonialToDisplay = (testimonial: Testimonial): DisplayTestimonial => {
  let displayName = "";
  let displayDesignation = "";
  let visibility: "full" | "nameOnly" | "anonymous" = "full";

  // Handle display preference
  switch (testimonial.displayPreference) {
    case "nameAndDesignation":
      displayName = testimonial.name;
      displayDesignation = testimonial.designation;
      visibility = "full";
      break;
    case "nameOnly":
      displayName = testimonial.name;
      displayDesignation = "";
      visibility = "nameOnly";
      break;
    case "anonymous":
      displayName = "Anonymous User";
      displayDesignation = "";
      visibility = "anonymous";
      break;
    default:
      displayName = testimonial.name;
      displayDesignation = testimonial.designation;
      visibility = "full";
  }

  return {
    _id: testimonial._id,
    name: displayName,
    username: `user_${testimonial._id.slice(-4)}`, // Generate username from ID
    designation: displayDesignation,
    rating: testimonial.rating,
    text: testimonial.feedback,
    likedMost: testimonial.likedMost,
    howHelped: testimonial.howHelped,
    visibility,
    img: `https://avatar.vercel.sh/${displayName.toLowerCase().replace(/\s+/g, '')}`,
  };
};


const ReviewCard = ({
  img,
  name,
  username,
  likedMost,
  howHelped,
  designation,
  rating
}: {
  img: string;
  name: string;
  username: string;
  likedMost: string;
  howHelped: string;
  designation?: string;
  rating?: number;
}) => {
  return (
    <CardSpotlight>
      <figure
        className={cn(
          "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
          // light styles
          "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
          // dark styles
          "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
        )}
      >
        <div className="flex flex-row items-start gap-2">
          <img className="rounded-full" width="32" height="32" alt="" src={img} />
          <div className="flex flex-col ">
            <figcaption className="text-sm font-medium dark:text-white">
              {name}
            </figcaption>
            <p className="text-xs font-medium dark:text-white/40">{username}</p>
            {designation ? (
              <p className="text-xs font-medium dark:text-white/40">{designation}</p>
            ) : null}
            {typeof rating !== "undefined" ? (
              <div className="flex items-center gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) =>
                  i < rating ? (
                    <FaStar key={i} className="text-sm my-2" />
                  ) : (
                    <FaRegStar key={i} className="text-sm my-2" />
                  )
                )}
              </div>
            ) : null}
          </div>
        </div>
        <blockquote className="mt-2 text-sm">{likedMost}</blockquote>
        <blockquote className="mt-2 text-sm">{howHelped}</blockquote>
        <motion.div
          className="h-px align-bottom bg-gradient-to-r from-transparent via-white/20 to-transparent mt-4"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        />
      </figure>
    </CardSpotlight>
  );
};

export function MarqueeDemo() {
  const [testimonials, setTestimonials] = useState<DisplayTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch('/api/testimonial', {
        cache: 'no-store', // Ensure fresh data
      });

      if (!response.ok) {
        throw new Error('Failed to fetch testimonials');
      }

      const data: Testimonial[] = await response.json();

      // Transform API data to display format
      const transformedTestimonials = data.map(transformTestimonialToDisplay);

      setTestimonials(transformedTestimonials);
      console.log("Testimonials fetched successfully:", transformedTestimonials);
      setError(null);
    } catch (err) {
      console.error('Error fetching testimonials:', err);
      setError('Failed to load testimonials');
      // Fallback to empty array
      setTestimonials([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();

    // Listen for testimonials update events
    const handleTestimonialsUpdate = async () => {
      console.log('Testimonials update event received, refreshing...');
      // Add a small delay to show the refresh indicator
      setTimeout(() => {
        fetchTestimonials(true); // Pass true to indicate this is a refresh
      }, 500);
    };

    window.addEventListener('testimonialsUpdated', handleTestimonialsUpdate);

    // Optional: Set up periodic refresh every 5 minutes
    const interval = setInterval(() => fetchTestimonials(true), 5 * 60 * 1000);

    return () => {
      clearInterval(interval);
      window.removeEventListener('testimonialsUpdated', handleTestimonialsUpdate);
    };
  }, []);

  // If loading, show a loading state
  if (loading) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden min-h-[200px]">
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span className="text-gray-600 dark:text-gray-400">Loading testimonials...</span>
        </div>
      </div>
    );
  }

  // If error and no testimonials, show error state
  if (error && testimonials.length === 0) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden min-h-[200px]">
        <div className="text-center">
          <p className="text-red-500 mb-2">⚠️ {error}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">Please try again later</p>
        </div>
      </div>
    );
  }

  // If no testimonials available
  if (testimonials.length === 0) {
    return (
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden min-h-[200px]">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">No testimonials available yet.</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm">Be the first to share your experience!</p>
        </div>
      </div>
    );
  }

  // Split testimonials into two rows for marquee effect
  const firstRow = testimonials.slice(0, Math.ceil(testimonials.length / 2));
  const secondRow = testimonials.slice(Math.ceil(testimonials.length / 2));

  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      {/* Refresh indicator */}
      {refreshing && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-10 bg-blue-500 text-white px-4 py-2 rounded-full text-sm shadow-lg flex items-center space-x-2 animate-pulse">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Updating testimonials...</span>
        </div>
      )}

      {firstRow.length > 0 && (
        <Marquee pauseOnHover className="[--duration:20s]">
          {firstRow.map((review) => (
            <ReviewCard key={review._id} {...review} />
          ))}
        </Marquee>
      )}
      {secondRow.length > 0 && (
        <Marquee reverse pauseOnHover className="[--duration:20s]">
          {secondRow.map((review) => (
            <ReviewCard key={review._id} {...review} />
          ))}
        </Marquee>
      )}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
