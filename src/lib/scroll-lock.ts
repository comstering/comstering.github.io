// 모달(이미지 확대 <dialog>, 검색 팔레트)이 열린 동안 배경 스크롤을 잠근다(디자인 31번 5장 O-8).
// overflow:hidden은 스크롤 위치를 바꾸지 않으므로 닫으면 원래 자리 그대로다.
// 사라지는 스크롤바 폭만큼 오른쪽 여백을 채워 화면이 밀리지 않게 한다(globals.css의 [data-scroll-locked]).
// 모달이 겹쳐 열려도 안전하도록 횟수를 센다.
let locks = 0;

export const lockScroll = (): void => {
  if (typeof document === "undefined") return;
  if (locks++ > 0) return;
  const root = document.documentElement;
  const scrollbar = window.innerWidth - root.clientWidth;
  root.style.setProperty("--scrollbar-gap", `${scrollbar}px`);
  root.dataset.scrollLocked = "";
};

export const unlockScroll = (): void => {
  if (typeof document === "undefined" || locks === 0) return;
  if (--locks > 0) return;
  const root = document.documentElement;
  delete root.dataset.scrollLocked;
  root.style.removeProperty("--scrollbar-gap");
};
