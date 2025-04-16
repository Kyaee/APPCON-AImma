// src/components/lesson-assessment/scroll-progressbar.jsx
export default function Progressbar({ progress }) {
  return (
    <>
      <div
        className="fixed left-0 top-0 h-2 border-b border-black bg-light-brown z-[100] transition-all duration-200 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="fixed left-0 top-0 h-2 w-full bg-gray border-b border-black z-[99]"></div>
    </>
  );
}
