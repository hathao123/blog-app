import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TypographyH3,
  TypographyMuted,
  TypographyP,
} from "@/components/ui/typography";

type Props = {
  post: Post;
  author: User;
  comments: PostComment[];
  error?: {
    user?: string;
    comments?: string;
  };
};

export default async function Post({ post, author, comments, error }: Props) {
  return (
    <div className="h-screen xl:mb-20 md:mb-40 sm:mb-80 mb-96">
      <div className="flex flex-row justify-center">
        <h1 className="capitalize my-4 text-center md:mt-16 font-[Lora] text-4xl font-bold text-balance">
          {post.title}
        </h1>
      </div>
      <div className="text-center w-full">
        <TypographyMuted>{author.name}</TypographyMuted>
      </div>
      <div className="w-full py-20 max-w-[720px] px-4 place-self-center">
        <TypographyP>{post.body}</TypographyP>
      </div>
      <div className="w-full h-[1px] bg-neutral-300 max-w-[720px] flex place-self-center my-4 mb-8"></div>
      <section className="comments max-w-[720px] place-self-center px-4 flex justify-center flex-col">
        <TypographyH3>Comments ({comments.length})</TypographyH3>

        {error?.comments ? (
          <div className="error-message mt-4">
            Unable to load comments: {error.comments}
          </div>
        ) : comments.length > 0 ? (
          <div className="flex flex-col gap-8 mt-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-row gap-3">
                <Avatar>
                  <AvatarFallback>
                    {comment.email.substring(0, 1).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-2">
                  <span className="text-sm text-neutral-600">
                    {comment.email}
                  </span>
                  <span className="text-sm">{comment.body}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No comments yet.</p>
        )}
      </section>
    </div>
  );
}
