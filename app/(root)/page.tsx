import SearchForm from "@/components/Searchform";
import StartupCard, { StartupTypeCard } from "@/components/ProjectCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const params = { search: query || null };

  const session = await auth();

  console.log(session?.id);

  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <>
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 w-72 h-72 bg-white rounded-full"></div>
          <div className="absolute right-10 bottom-10 w-96 h-96 bg-white rounded-full"></div>
        </div>

        <div className="relative text-center space-y-8 max-w-5xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100">
            Share Your Projects,
            <span className="block">Inspire Others</span>
          </h1>

          <p className="text-xl md:text-2xl max-w-2xl mx-auto text-blue-50/90 leading-relaxed">
            Join our community of learners, showcase your progress, and connect
            with peers who share your passion for growth.
          </p>

          <div className="mt-8">
            <SearchForm query={query} />
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <p className="text-2xl font-semibold text-white mb-6">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="text-gray-500 text-lg col-span-full text-center py-12">
              No startups found. Be the first to share your project!
            </p>
          )}
        </ul>
      </section>

      <SanityLive />
    </>
  );
}
