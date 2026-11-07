import Image from "next/image";
import { Download, Mail } from "lucide-react";
import { buttonClass } from "@/components/ui/Button";
import { careerYears, type Profile } from "@/lib/content/profile-schema";

// **굵게** 표시는 headline에서 강조할 낱말을 감싼다(굵기만 쓴다).
const renderHeadline = (text: string) =>
  text
    .split(/\*\*(.+?)\*\*/)
    .map((part, index) =>
      index % 2 ? <strong key={index}>{part}</strong> : part,
    );

const bare = (url: string) => url.replace(/^https?:\/\//, "");

// 첫 화면: 사진 · 이름 · `직함 · 경력 N년+` · 버튼 (현재 회사는 두지 않는다, 디자인 30번)
export const AboutIntro = ({ profile }: { profile: Profile }) => (
  <section className="about-intro" aria-labelledby="me">
    <Image
      src="/profile.png"
      alt={`${profile.name} 프로필 사진`}
      width={112}
      height={112}
      priority
      className="about-intro__avatar no-print"
    />
    <div>
      <h1 id="me" className="about-intro__name">
        {profile.name} <small>{profile.nameEn}</small>
      </h1>
      <p className="about-intro__role">
        <span className="inline-block">{profile.role}</span>{" "}
        <span aria-hidden="true">·</span>{" "}
        <span className="inline-block">
          경력 {careerYears(profile.careerStart)}년+
        </span>
      </p>
      <p className="print-only about-intro__contacts">
        {profile.contacts.email} · {bare(profile.contacts.github)} ·{" "}
        {bare(profile.contacts.linkedin)}
      </p>
    </div>
    <div className="about-intro__contact no-print">
      <a
        className={buttonClass("primary")}
        href={`mailto:${profile.contacts.email}`}
      >
        <Mail aria-hidden className="h-4 w-4" />
        email
      </a>
      <a className={buttonClass("secondary")} href="/resume.pdf" download>
        <Download aria-hidden className="h-4 w-4" />
        resume.pdf
      </a>
      <a
        className={buttonClass("ghost")}
        href={profile.contacts.github}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="link-ext">github</span>
        <span className="sr-only"> (새 창에서 열림)</span>
      </a>
      <a
        className={buttonClass("ghost")}
        href={profile.contacts.linkedin}
        target="_blank"
        rel="noopener noreferrer"
      >
        <span className="link-ext">linkedin</span>
        <span className="sr-only"> (새 창에서 열림)</span>
      </a>
    </div>
    <p className="about-intro__headline">{renderHeadline(profile.headline)}</p>
    <div className="about-intro__body">
      {profile.intro.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </div>
  </section>
);
