import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

type Props = {
  id: number;
  title: string;
  body: string;
};

export default function Post({ id, title, body }: Props) {
  return (
    <Card className="cursor-pointer col-span-1 place-items-stretch flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="uppercase">{title}</CardTitle>
        <CardDescription className="line-clamp-1">{body}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Link
          href={`/posts/${id}`}
          className="italic underline underline-offset-1"
        >
          Read more
        </Link>
      </CardFooter>
    </Card>
  );
}
