import { Mail } from "lucide-react";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import type { Profile } from "@/lib/content/profile-schema";

const contactClass =
  "inline-flex h-(--tap) w-(--tap) items-center justify-center rounded-md border border-line-strong text-fg transition-colors hover:border-accent hover:text-accent";

// **굵게** 표시는 headline에서 강조할 낱말을 감싼다(굵기만 쓴다).
const renderHeadline = (text: string) =>
  text.split(/\*\*(.+?)\*\*/).map((part, index) =>
    index % 2 ? <strong key={index}>{part}</strong> : part,
  );

const Bio = ({ profile }: { profile: Profile }) => (
  <section aria-labelledby="about-name">
    <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
      <Image
        src="/profile.png"
        alt={`${profile.name} 프로필 사진`}
        width={160}
        height={160}
        className="h-32 w-32 shrink-0 rounded-full border border-line object-cover sm:h-40 sm:w-40"
      />

      <div>
        <h1
          id="about-name"
          className="text-title font-bold leading-heading tracking-title text-fg"
        >
          {profile.name}
          <span className="ml-3 text-lead font-normal text-mute">
            ({profile.nameEn})
          </span>
        </h1>
        <p className="mt-3 text-h3 font-semibold leading-snug text-fg">
          &quot;{renderHeadline(profile.headline)}&quot;
        </p>
      </div>
    </div>

    <div className="mt-8 max-w-[65ch] space-y-4 text-body leading-body text-mute">
      {profile.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>

    <ul className="mt-6 flex gap-3">
      <li>
        <a
          href={profile.contacts.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub (새 창에서 열림)"
          className={contactClass}
        >
          <SiGithub aria-hidden className="h-5 w-5" />
        </a>
      </li>
      <li>
        <a
          href={profile.contacts.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn (새 창에서 열림)"
          className={contactClass}
        >
          <FaLinkedin aria-hidden className="h-5 w-5" />
        </a>
      </li>
      <li>
        <a
          href={`mailto:${profile.contacts.email}`}
          aria-label="이메일 보내기"
          className={contactClass}
        >
          <Mail aria-hidden className="h-5 w-5" />
        </a>
      </li>
    </ul>
  </section>
);

export default Bio;
