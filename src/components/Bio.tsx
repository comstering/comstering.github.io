import { Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SiGithub, SiLinkedin } from "react-icons/si";

const Bio = () => {
  return (
    <section className="flex gap-4">
      <Image
        src="/profile.png"
        alt="Profile"
        width={120}
        height={120}
        className="rounded-full object-cover"
      />
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-xl font-bold">최한수 (CHOI HANSU)</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Software Engineer, Infra & DevOps Engineer
        </p>
        <div className="flex space-x-6">
          <Link
            href="https://github.com/comstering"
            target="_blank"
            aria-label="GitHub"
          >
            <SiGithub
              size={28}
              className="hover:text-gray-900 dark:hover:text-white"
            />
          </Link>
          <Link
            href="https://www.linkedin.com/in/hansu-choi-05775a244"
            target="_blank"
            aria-label="LinkedIn"
          >
            <SiLinkedin
              size={28}
              className="hover:text-gray-900 dark:hover:text-white"
            />
          </Link>
          <Link href="mailto:comstering@gmail.com" aria-label="Email">
            <Mail
              size={28}
              className="hover:text-gray-900 dark:hover:text-white"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Bio;
