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
    <li className="startup-card">
      <div className="flex-between">
        <p className="startup-card_date">{formatDate(_createdAt)}</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-blue-500" />
          <span className="text-16-medium">{views}</span>
        </div>
      </div>z
      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
          <Link href={`/user/${author?._id}`}>
            <Image
              src="https://placehold.co/48x48"
              alt="placeholder"
              width={48}
              height={48}
              className="rounded-full"
            />
          </Link>
          <Link href={`/startup/${_id}`}>
            <p className="startup-card_desc ">{description}</p>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWavUMmRSvqJNGPfSv8VUdHI3IKHGGc7e1TA&s"
              alt="placeholder"
              className="startup-card_img"
            />
          </Link>
          <div className="flex-between gap-3 mt-5">
            <Link href={`/query=${category?.toLowerCase()}`}>
              <p className="text-16-medium">{category}</p>
            </Link>
            <Button className="startup-card_btn" asChild>
              <Link href={`/startup/${_id}`}>Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default StartupCard;
