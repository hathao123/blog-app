import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  TypographyH1,
  TypographyH3,
  TypographyMuted,
  TypographyP,
  TypographySmall,
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
    <div>
      <TypographyH1 className="uppercase my-4">{post.title}</TypographyH1>
      <TypographyMuted>{author.name}</TypographyMuted>
      <div className="w-full py-20 md:px-20 px-4">
        <TypographyP>{post.body}</TypographyP>
      </div>
      <section className="comments md:px-20 px-4">
        <TypographyH3>Comments ({comments.length})</TypographyH3>

        {error?.comments ? (
          <div className="error-message mt-4">
            Unable to load comments: {error.comments}
          </div>
        ) : comments.length > 0 ? (
          <div className="flex flex-col gap-4 mt-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex flex-row gap-4">
                <Avatar>
                  <AvatarFallback>
                    {comment.email.substring(0, 1).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col w-3/4">
                  <TypographyMuted>By: {comment.email}</TypographyMuted>
                  <TypographySmall className="font-normal">
                    {comment.body}
                  </TypographySmall>
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
