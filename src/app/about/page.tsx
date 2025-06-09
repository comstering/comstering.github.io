import { Lightbulb } from "lucide-react";

const AboutPage = () => {
  return (
    // 전체 페이지를 감싸는 컨테이너
    <div className="max-w-4xl mx-auto p-4 sm:p-8">
      {/* 1. Introduction */}
      <section className="mb-16">
        {" "}
        {/* 아래쪽 여백을 늘렸습니다 */}
        <h1 className="text-4xl font-bold mb-6 text-white border-b-2 border-gray-700 pb-2">
          Introduction
        </h1>
        {/* ▼▼▼ 이미지처럼 박스 형태로 수정된 부분 ▼▼▼ */}
        <div className="bg-gray-800 rounded-xl p-8">
          {" "}
          {/* 패딩을 조금 더 줘도 좋습니다 */}
          {/* ▼▼▼ 핵심 슬로건 추가 ▼▼▼ */}
          <p className="text-lg font-bold text-yellow-300 mb-6">
            &quot;어제보다 성장하는 개발자 최한수입니다.&quot;
          </p>
          {/* ▲▲▲ 추가 끝 ▲▲▲ */}
          <div className="flex items-start gap-4">
            <Lightbulb className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
            <div className="text-gray-300 space-y-3">
              {/* 첫 문장을 살짝 수정하여 자연스럽게 연결합니다 */}
              <p>새로운 지식을 배우는 것을 즐기며 다양한 경험을 추구합니다.</p>
              <p>
                요구사항을 구현하기 위한 기술, 협업에 대한 Best Practice를 찾기
                위해 노력합니다.
              </p>
              <p>
                다양한 직무의 사람들과 협업할 때 의사소통에 걸림돌이 되지 않게
                여러 지식을 계속 축적하고 공부하려고 합니다.
              </p>
            </div>
          </div>
        </div>
        {/* ▲▲▲ 수정 끝 ▲▲▲ */}
      </section>

      {/* 2. Skills */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">
          Skills
        </h2>
        <div className="flex flex-wrap gap-4">
          {/* 예시: 아래와 같은 형태로 기술들을 나열합니다. */}
          <span className="bg-gray-200 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
            JavaScript
          </span>
          <span className="bg-sky-200 text-sky-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
            TypeScript
          </span>
          <span className="bg-blue-200 text-blue-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
            React
          </span>
          <span className="bg-indigo-200 text-indigo-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded">
            Next.js
          </span>
        </div>
      </section>

      {/* 3. Work Experience */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">
          Work Experience
        </h2>
        <div className="space-y-8">
          {/* 경력 예시 1: 아래 div 블록을 복사해서 여러 경력을 추가할 수 있습니다. */}
          <div>
            <h3 className="text-2xl font-bold">[회사 이름]</h3>
            <p className="text-md text-gray-600">
              [근무 기간] (예: 2023.01 ~ 현재) | [직책]
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
              <li>주요 성과나 담당했던 업무를 2~3줄로 요약하여 작성합니다.</li>
              <li>
                프로젝트 A: [프로젝트에 대한 설명 및 본인의 역할, 사용 기술 등]
              </li>
              <li>
                프로젝트 B: [프로젝트에 대한 설명 및 본인의 역할, 사용 기술 등]
              </li>
            </ul>
          </div>
          {/* 경력 예시 2 */}
          <div>
            <h3 className="text-2xl font-bold">[이전 회사 이름]</h3>
            <p className="text-md text-gray-600">[근무 기간] | [직책]</p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-700">
              <li>주요 성과나 담당했던 업무를 2~3줄로 요약하여 작성합니다.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. Projects (선택 사항) */}
      <section className="mb-12">
        <h2 className="text-3xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">
          Projects
        </h2>
        {/* 프로젝트 내용을 이곳에 추가합니다. 경력과 유사한 형태로 작성할 수 있습니다. */}
      </section>

      {/* 5. Education */}
      <section>
        <h2 className="text-3xl font-semibold border-b-2 border-gray-200 pb-2 mb-6">
          Education
        </h2>
        <div>
          <h3 className="text-2xl font-bold">[학교 이름]</h3>
          <p className="text-md text-gray-600">[재학 기간] | [전공] | [학위]</p>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
