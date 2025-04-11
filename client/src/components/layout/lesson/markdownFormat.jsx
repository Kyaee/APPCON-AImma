import Markdown from "react-markdown";

export default function markdownFormat({children}) {
  return (
    <Markdown
      components={{
        div: ({ children }) => (
          <div className="my-6 p-4 bg-gray-100 rounded-lg shadow-md">
            {children}
          </div>
        ),
        h2: ({ children }) => (
          <h2 className="mt-9 tracking-tight text-4xl font-bold text-[#333] leading-10 mb-6 border-b-2 border-gray-300 pb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-12 text-3xl font-semibold text-[#444] tracking-tight leading-9 mb-5">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-[#555] font-light text-lg leading-7 my-4">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-8 space-y-3 text-[#444]">{children}</ul>
        ),
        li: ({ children }) => (
          <li className="text-[#555] font-medium text-base leading-6">
            {children}
          </li>
        ),
        code: ({ children }) => (
          <code className="inline-block bg-[#f5f5f5] text-[#d6336c] border border-gray-300 rounded-md p-2 text-sm font-mono">
            {children}
          </code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-yellow-400 pl-4 italic text-[#666] my-6">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-[#222]">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="italic text-[#444]">{children}</em>
        ),
      }}
    >{children}</Markdown>
  );
}
