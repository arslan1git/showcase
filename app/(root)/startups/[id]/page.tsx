import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import View from "@/components/View";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import Markdown from "react-markdown";

export const dynamic = "force-dynamic";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  const startup = await client.fetch(STARTUP_BY_ID_QUERY, { id: params.id });
  
  if (!startup) return notFound();

  return (
    <section className="flex flex-col gap-10 max-w-7xl mx-auto px-5 py-10">
      <div className="flex justify-center items-center">
        <div>
          <h1 className="text-30-bold">{startup.title}</h1>
        </div>
        
        <View id={startup._id} />
      </div>
          <div className="flex items-center gap-3 mt-2">
            <Link href={`/user/${startup.author?._id}`}>
              <p className="text-16-medium">{startup.author?.name}</p>
            </Link>
            <p className="text-14-normal">{formatDate(startup._createdAt)}</p>
          </div>

          <p className="text-16-medium">{startup.description}</p>
      <Image 
        src={startup.image}
        alt={startup.title}
        width={1200}
        height={600}
        className="rounded-xl object-cover"
      />

      <div className="flex flex-col gap-5">
        
        <div className="prose max-w-none">
          <Markdown>{startup.pitch}</Markdown>
        </div>
      </div>
    </section>
  );
};

export default Page;