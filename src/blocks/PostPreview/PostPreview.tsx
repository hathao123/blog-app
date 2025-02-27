import Link from "next/link";

type Props = {
  id: number;
  title: string;
  body: string;
  readTime: number;
  date: string;
};

export default function Post({ id, title, body, readTime, date }: Props) {
  return (
    <div className="flex flex-col col-span-1 place-items-stretch gap-2 py-5 md:py-10 md:flex-row md:gap-8 xl:gap-16">
      <div className="flex flex-col w-[115px] gap-2">
        <span className="font-medium">{readTime} Mins Read</span>
        <span className="text-xs">{date}</span>
      </div>
      <div className="w-[366px] flex flex-col gap-3">
        <span className="text-2xl font-bold font-[Lora] capitalize">
          {title}
        </span>
        <span className="line-clamp-2 text-sm font-light">{body}</span>
      </div>
      <div className="w-[90px]">
        <Link
          href={`/posts/${id}`}
          className="underline underline-offset-1 text-sm"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}
