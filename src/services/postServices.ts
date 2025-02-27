import { API_URL } from "@/configs/api";
import { notFound } from "next/navigation";
import { randomDate } from "@/lib/utils";
import moment from "moment";

export const PAGE_SIZE = 3;

export async function getPosts(
  page: number
): Promise<{ data: Post[]; totaCount: number }> {
  const res = await fetch(`${API_URL}/posts`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Failed to fetch post");
  }

  const resut = await res.json();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    data: resut
      .slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
      .map((item: Post) => {
        return {
          ...item,
          date: moment(randomDate(new Date(2024, 6, 1), new Date())).format(
            "DD MMM YY"
          ),
          readTime: Math.floor(Math.random() * (10 - 1 + 1) + 1),
        };
      }),
    totaCount: resut.length,
  };
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(`${API_URL}/posts/${id}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    if (res.status === 404) notFound();
    throw new Error("Failed to fetch post");
  }

  return res.json();
}

export async function getPostComments(postId: number): Promise<PostComment[]> {
  const res = await fetch(`${API_URL}/posts/${postId}/comments`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch comments");
  }

  return res.json();
}
