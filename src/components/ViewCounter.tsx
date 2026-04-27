"use client";

import { useEffect, useState } from "react";

interface ViewCounterProps {
  path: string;
}

export const ViewCounter = ({ path }: ViewCounterProps) => {
  const [views, setViews] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchViews = async () => {
      try {
        // GoatCounter public API endpoint
        const response = await fetch(
          `https://comstering.goatcounter.com/counter${path}.json`
        );

        if (response.ok) {
          const data = await response.json();
          // GoatCounter returns { count: number, count_unique: number }
          setViews(data.count || 0);
        } else if (response.status === 404) {
          // 404는 아직 데이터가 없다는 의미 (정상)
          setViews(0);
        } else {
          // 다른 에러의 경우에만 로그 출력
          console.warn(`GoatCounter API returned ${response.status}`);
          setViews(0);
        }
      } catch {
        // 네트워크 에러 등 - 조용히 0으로 설정
        setViews(0);
      } finally {
        setLoading(false);
      }
    };

    fetchViews();
  }, [path]);

  if (loading) {
    return (
      <span className="text-sm text-gray-400 animate-pulse">
        · · · views
      </span>
    );
  }

  return (
    <span className="text-sm text-gray-500 font-medium">
      {views.toLocaleString()} views
    </span>
  );
};
