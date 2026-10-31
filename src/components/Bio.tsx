import { Mail } from "lucide-react";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { AUTHOR } from "@/lib/site";

const contactClass =
  "inline-flex h-(--tap) w-(--tap) items-center justify-center rounded-md border border-line-strong text-fg transition-colors hover:border-accent hover:text-accent";

const Bio = () => (
  <section aria-labelledby="about-name">
    <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10">
      <Image
        src="/profile.png"
        alt="최한수 프로필 사진"
        width={160}
        height={160}
        className="h-32 w-32 shrink-0 rounded-full border border-line object-cover sm:h-40 sm:w-40"
      />

      <div>
        <h1
          id="about-name"
          className="text-title font-bold leading-heading tracking-title text-fg"
        >
          최한수
          <span className="ml-3 text-lead font-normal text-mute">
            (Choi Hansu)
          </span>
        </h1>
        <p className="mt-3 text-h3 font-semibold leading-snug text-fg">
          &quot;개발과 운영의 경계를 좁혀 비즈니스의 <strong>연속성</strong>을
          만드는 엔지니어 최한수입니다.&quot;
        </p>
      </div>
    </div>

    <div className="mt-8 max-w-[65ch] space-y-4 text-body leading-body text-mute">
      <p>
        단순히 시스템을 구축하는 것을 넘어, 동료들이 복잡한 인프라 구조에
        구애받지 않고 비즈니스 로직에만 몰입할 수 있는 환경을 설계하는 데 가치를
        둡니다.
      </p>
      <p>
        안정적인 시스템 운영을 위한 아키텍처를 고민하며, 다양한 직군과의
        원활하게 소통하기 위해 기술적 지식을 넘어 도메인 전반을 이해하려고
        노력합니다. 최선의 해결책을 찾기 위해 기록하고 공유하며 팀과 함께
        성장하는 문화를 지향합니다.
      </p>
    </div>

    <ul className="mt-6 flex gap-3">
      <li>
        <a
          href={AUTHOR.github}
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
          href={AUTHOR.linkedin}
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
          href={`mailto:${AUTHOR.email}`}
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
