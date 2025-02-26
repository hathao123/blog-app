"use client";
import { PostPreview } from "@/blocks/PostPreview";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TypographyH1 } from "@/components/ui/typography";
import { getPosts, PAGE_SIZE } from "@/services/postServices";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>();
  const [total, setTotal] = useState(0);

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true);
      const { data, totaCount } = await getPosts(page);
      setPosts(data);
      setTotal(totaCount);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts(pageIndex);
  }, [pageIndex]);

  const skeleton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
    <div className="col-span-1 flex flex-col space-y-3" key={i}>
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ));
  return (
    <>
      <TypographyH1 className="text-center my-4">Blogs</TypographyH1>
      <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 grid-flow-row py-2 gap-4">
        {loading || !posts?.length
          ? skeleton
          : posts?.map((post: Post) => <PostPreview key={post.id} {...post} />)}
      </div>

      <div className="flex items-center justify-between mt-4 ">
        <Button
          onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
          disabled={pageIndex === 0}
        >
          Previous
        </Button>
        <span>
          Page {pageIndex + 1} of {Math.ceil(total / PAGE_SIZE)}
        </span>
        <Button
          onClick={() =>
            setPageIndex((prev) =>
              Math.min(prev + 1, Math.ceil(total / PAGE_SIZE) - 1)
            )
          }
          disabled={pageIndex >= Math.ceil(total / PAGE_SIZE) - 1}
        >
          Next
        </Button>
      </div>
    </>
  );
}
