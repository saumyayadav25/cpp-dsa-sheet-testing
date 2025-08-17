import { cn } from "@/lib/utils";
import { Marquee } from "@/components/magicui/marquee";
import { CardSpotlight } from "./ui/card-spotlight";
import { motion } from "framer-motion";
import { FaStar, FaRegStar, FaUserCircle } from "react-icons/fa";
type Testimonial = {
  name: string;
  username: string;
  designation?: string;
  rating: number; // from 1 to 5
  text: string;
  visibility: "full" | "nameOnly" | "anonymous";
  img: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Prakhar Sinha",
    username: "prakhar_s",
    designation: "Student",
    rating: 5,
    text: "It really helped me by listing important questions discussed in class, so we didn't have to visit lectures again to revise those questions. Overall, it's the best!",
    visibility: "full",
    img: "https://avatar.vercel.sh/prakhar"
  },
  {
    name: "Aryan",
    username: "aryan123",
    designation: "Student",
    rating: 5,
    text: "It's amazing! The way in which we can track our progress is amazing.",
    visibility: "full",
    img: "https://avatar.vercel.sh/aryan"
  },
  {
    name: "",
    username: "anonymous_user",
    rating: 5,
    text: "DSAMate bhot bhot accha laga mujhe! Especially the platform filter where we can choose LeetCode, GFG, etc. Now I'm definitely going to start practicing questions from DSAMate as well.",
    visibility: "anonymous",
    img: "https://avatar.vercel.sh/anonymous"
  },
  {
    name: "Roshan Gorakhpuriya",
    username: "roshan_g",
    designation: "Student",
    rating: 5,
    text: "Structured question which covers all the supreme batch questions.",
    visibility: "full",
    img: "https://avatar.vercel.sh/roshan"
  },
  {
    name: "Supriya Pandey",
    username: "supriya_p",
    designation: "Student / Aspiring Developer",
    rating: 5,
    text: "EXCELLENT! Helped a lot in my dsa journey.",
    visibility: "full",
    img: "https://avatar.vercel.sh/supriya"
  },
  {
    name: "Prakhar Sinha",
    username: "prakhar_s",
    designation: "Student",
    rating: 5,
    text: "It really helped me by listing important questions discussed in class, so we didn't have to visit lectures again to revise those questions. Overall, it's the best!",
    visibility: "full",
    img: "https://avatar.vercel.sh/prakhar"
  },
  {
    name: "Aryan",
    username: "aryan123",
    designation: "Student",
    rating: 5,
    text: "It's amazing! The way in which we can track our progress is amazing.",
    visibility: "full",
    img: "https://avatar.vercel.sh/aryan"
  },
  {
    name: "",
    username: "anonymous_user",
    rating: 5,
    text: "DSAMate bhot bhot accha laga mujhe! Especially the platform filter where we can choose LeetCode, GFG, etc. Now I'm definitely going to start practicing questions from DSAMate as well.",
    visibility: "anonymous",
    img: "https://avatar.vercel.sh/anonymous"
  },
];


const firstRow = testimonials.slice(0, testimonials.length / 2);
const secondRow = testimonials.slice(testimonials.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  text,
  designation,
  rating
}: {
  img: string;
  name: string;
  username: string;
  text: string;
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
        <blockquote className="mt-2 text-sm">{text}</blockquote>
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
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
    </div>
  );
}
