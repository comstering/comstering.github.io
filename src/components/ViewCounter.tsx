"use client";

import { useEffect, useState } from "react";

interface ViewCounterProps {
  path: string;
}

export const ViewCounter = ({ path }: ViewCounterProps) => {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchViews = async () => {
      try {
        // GoatCounter public API: { count: string } (아직 집계가 없으면 404)
        const response = await fetch(
          `https://comstering.goatcounter.com/counter${path}.json`,
          { signal: controller.signal },
        );
        if (response.ok) {
          const data = await response.json();
          setViews(Number(String(data.count).replace(/\s/g, "")) || 0);
        } else {
          setViews(0);
        }
      } catch {
        if (!controller.signal.aborted) setViews(0);
      }
    };

    fetchViews();
    return () => controller.abort();
  }, [path]);

  // 로딩 중에도 같은 폭을 차지해 레이아웃이 흔들리지 않게 한다
  return (
    <span className="tabular-nums">
      {views === null ? "- views" : `${views.toLocaleString()} views`}
    </span>
  );
};
