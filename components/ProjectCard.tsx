import { formatDate } from "@/lib/utils";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { Author, Startup } from "@/sanity/types";

export type StartupTypeCard = Omit<Startup, "author"> & {
  author?: Author;
};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _id,
    _createdAt,
    views,
    author,
    title,
    description,
    image,
    category,
  } = post;
  
  return (
    <li className="max-w-sm flex flex-col bg-white/10 dark:bg-gray-900/50 backdrop-blur-lg text-gray-800 dark:text-gray-100 rounded-xl border border-gray-200/20 dark:border-gray-700/30 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Card Image */}
      <Link href={`/startups/${_id}`}>
        <div className="relative h-48 w-full">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Card Content */}
      <div className="flex flex-col p-5 gap-3 bg-gradient-to-b from-white/50 to-white/80 dark:from-gray-900/50 dark:to-gray-900/80">
        {/* Header - Category & Views */}
        <div className="flex justify-between items-center">
          <Link href={`/query=${category?.toLowerCase()}`}>
            <span className="text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              {category}
            </span>
          </Link>
          <div className="flex items-center gap-1.5">
            <EyeIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <span className="text-sm text-gray-600 dark:text-gray-300">{views}</span>
          </div>
        </div>

        {/* Title */}
        <Link href={`/startups/${_id}`}>
          <h3 className="text-lg font-semibold line-clamp-2 hover:text-primary transition-colors">
            {title}
          </h3>
        </Link>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
          {description}
        </p>

        {/* Footer - Author & Date */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-200/50 dark:border-gray-700/30">
          <Link href={`/user/${author?._id}`} className="flex items-center gap-2 group">
            <Image
              src={author?.image || "https://placehold.co/32x32"}
              alt={author?.name || "placeholder"}
              width={32}
              height={32}
              className="rounded-full ring-2 ring-transparent group-hover:ring-primary transition-all"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-primary transition-colors">
              {author?.name}
            </span>
          </Link>
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(_createdAt)}
          </span>
        </div>
      </div>
    </li>
  );
};

export default StartupCard;
