import { Bookmark } from "lucide-react";
import { Button } from "./button";

interface BookmarkButtonProps {
  startupId: string;
}

export const BookmarkButton = ({ startupId }: BookmarkButtonProps) => {
  return (
    <Button variant="ghost" size="sm" onClick={() => console.log('Bookmark:', startupId)}>
      <Bookmark className="h-5 w-5" />
    </Button>
  );
}; 