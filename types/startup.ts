export type StartupType = {
  _id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  status?: 'featured' | string;
  tags?: Array<{ _id: string; name: string }>;
  author: {
    name: string;
    image: string;
  };
  votes: number;
  views: number;
}; 