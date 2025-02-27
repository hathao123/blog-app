"use client";
import { PostPreview } from "@/blocks/PostPreview";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pageIndex]);

  const skeleton = () => {
    return (
      <div className="mt-10 flex flex-col gap-3">
        {[0, 1, 2].map((i) => (
          <div
            className="col-span-1 flex flex-col space-y-3 xl:w-[708px] md:w-[576px]"
            key={i}
          >
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
    );
  };
  return (
    <div className="md:px-0 px-2">
      <div className="flex flex-col gap-28 w-full xl:mt-32 mt-10 xl:flex-row">
        <div className="flex flex-col gap-6">
          <span className="text-5xl font-bold font-[Lora]">
            Hello, friends!
          </span>
          <span className="text-xl w-[350px]">
            I’m a developer and web builder who works with my best friend.
          </span>
        </div>
        <div className="flex flex-col min-h-screen py-2 gap-4 max-w-[708px] -mt-10">
          {loading || !posts?.length
            ? skeleton()
            : posts?.map((post: Post) => (
                <PostPreview key={post.id} {...post} />
              ))}
          <div className="flex items-center justify-end gap-2 mt-8">
            <Button
              onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
              disabled={pageIndex === 0}
              variant={"link"}
            >
              {"<"}
            </Button>
            <span className="text-sm font-light">
              Page {pageIndex + 1} of {Math.ceil(total / PAGE_SIZE)}
            </span>
            <Button
              onClick={() =>
                setPageIndex((prev) =>
                  Math.min(prev + 1, Math.ceil(total / PAGE_SIZE) - 1)
                )
              }
              variant={"link"}
              disabled={pageIndex >= Math.ceil(total / PAGE_SIZE) - 1}
            >
              {">"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
