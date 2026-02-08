import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiGithub, SiKubernetes, SiLinkedin } from "react-icons/si";

const Bio = () => {
  return (
    <div>
      {/* Main Banner - 이름, 소개 title, 소개 description */}
      <section className="bg-white dark:bg-gray-900/50 rounded-[48px] shadow-2xl p-10 md:p-16 border border-gray-100 dark:border-gray-800 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <SiKubernetes className="w-64 h-64" />
        </div>

        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-20 relative z-10">
          <div className="relative group shrink-0">
            <div className="absolute -inset-4 bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-600 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <Image
              src="/profile.png"
              alt="Profile"
              width={192}
              height={192}
              className="relative w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-8 border-white dark:border-gray-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div className="flex-grow text-center md:text-left">
            <div className="space-y-8">
              {/* 이름 Section */}
              <div className="flex flex-col items-center md:items-start gap-2">
                <span className="text-xs font-black tracking-[0.2em] text-sky-500 uppercase px-1">
                  Identity
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  최한수
                  <span className="text-lg md:text-xl font-medium text-gray-400 dark:text-gray-500">
                    (Choi Hansu)
                  </span>
                </h2>
              </div>

              {/* 소개 title Section */}
              <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-gray-100 tracking-tight leading-snug border-l-4 border-sky-500 pl-6 md:pl-8 py-1">
                &quot;개발과 운영의 경계를 좁혀 비즈니스의{" "}
                <span className="text-sky-500">연속성</span>을 만드는 엔지니어
                최한수입니다.&quot;
              </h1>

              {/* 소개 description Section */}
              <div className="space-y-5 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto md:mx-0">
                <p className="text-base md:text-lg leading-relaxed font-medium">
                  단순히 시스템을 구축하는 것을 넘어, 동료들이 복잡한 인프라
                  구조에 구애받지 않고 비즈니스 로직에만 몰입할 수 있는 환경을
                  설계하는 데 가치를 둡니다.
                </p>
                <p className="text-base md:text-lg leading-relaxed font-medium">
                  안정적인 시스템 운영을 위한 아키텍처를 고민하며, 다양한
                  직군과의 원활하게 소통하기 위해 기술적 지식을 넘어 도메인
                  전반을 이해하려고 노력합니다. 최선의 해결책을 찾기 위해
                  기록하고 공유하며 팀과 함께 성장하는 문화를 지향합니다.
                </p>
              </div>
            </div>

            <div className="flex justify-center md:justify-start gap-4 pt-8">
              <Link
                href="https://github.com"
                target="_blank"
                className="p-3.5 bg-gray-50 dark:bg-gray-800 hover:bg-sky-500 hover:text-white transition-all rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm group"
              >
                <SiGithub className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="p-3.5 bg-gray-50 dark:bg-gray-800 hover:bg-sky-500 hover:text-white transition-all rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <SiLinkedin className="w-5 h-5" />
              </Link>
              <Link
                href="mailto:gildong@example.com"
                className="p-3.5 bg-gray-50 dark:bg-gray-800 hover:bg-sky-500 hover:text-white transition-all rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <Mail className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bio;
