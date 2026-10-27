import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const AuthorBox = () => (
  <section
    aria-label="글쓴이"
    className="grid grid-cols-[auto_1fr] items-center gap-4 border-y border-line py-6 sm:grid-cols-[auto_1fr_auto]"
  >
    <Image
      src="/profile.png"
      width={56}
      height={56}
      alt=""
      className="h-14 w-14 rounded-full border border-line object-cover"
    />
    <div>
      <p className="font-bold tracking-tight text-fg">
        최한수
        <span className="ml-1.5 font-mono text-cap font-normal text-mute">
          @comstering
        </span>
      </p>
      <p className="mt-0.5 text-small text-mute">
        개발과 운영의 경계를 좁히는 DevOps · Cloud Native Engineer
      </p>
    </div>
    <Link
      href="/about"
      className="col-span-2 -my-3 inline-flex items-center gap-1.5 py-3 font-mono text-meta text-accent sm:col-span-1 sm:justify-self-end"
    >
      about
      <ArrowRight aria-hidden size={14} />
    </Link>
  </section>
);
