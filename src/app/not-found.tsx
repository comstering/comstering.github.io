'use client'

import { ArrowLeft, Ghost, Home } from "lucide-react";
import Link from "next/link";

const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
    {/* Visual Element */}
    <div className="relative mb-8">
      <div className="absolute inset-0 bg-sky-500/20 blur-3xl rounded-full"></div>
      <Ghost className="w-24 h-24 text-sky-500 relative animate-bounce" />
    </div>

    {/* Text Content */}
    <div className="space-y-4 max-w-md">
      <h1 className="text-8xl font-black tracking-tighter text-gray-900 dark:text-white">
        4<span className="text-sky-500">0</span>4
      </h1>
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        페이지를 찾을 수 없습니다.
      </h2>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
        요청하신 페이지가 삭제되었거나, 주소가 잘못 입력되었을 수 있습니다. <br/>
        아래 버튼을 통해 홈으로 돌아가실 수 있습니다.
      </p>
    </div>

    {/* Action Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 mt-12">
      <Link 
        href="/" 
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-sky-500 text-white font-black text-xs tracking-widest rounded-2xl hover:bg-sky-600 transition-all shadow-lg shadow-sky-500/25 group"
      >
        <Home className="w-4 h-4" />
        GO BACK HOME
      </Link>
      <button 
        onClick={() => globalThis.history.back()}
        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-800 font-black text-xs tracking-widest rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all shadow-sm"
      >
        <ArrowLeft className="w-4 h-4" />
        PREVIOUS PAGE
      </button>
    </div>
  </div>
);

export default NotFound;
