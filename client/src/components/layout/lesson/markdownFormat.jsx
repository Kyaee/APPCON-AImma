import Markdown from "react-markdown";

export default function markdownFormat({ children }) {
  return (
    <Markdown
      components={{
        div: ({ children }) => (
          <div className="my-6 p-4 bg-gray-100 dark:bg-dark-inner-bg rounded-lg shadow-md">
            {children}
          </div>
        ),
        h2: ({ children }) => (
          <h2 className="mt-12 tracking-tight text-3xl font-bold text-[#333] dark:text-primary leading-10 mb-6 border-b-2 border-gray-300 dark:border-dark-mode-highlight pb-2">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-12 text-3xl font-semibold text-[#444] dark:text-primary tracking-tight leading-9 mb-5">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="mt-12 text-2xl font-semibold text-[#444] dark:text-primary tracking-tight leading-9 mb-5">
            {children}
          </h4>
        ),
        p: ({ children }) => (
          <p className="text-[#555] dark:text-primary font-light text-lg leading-7 my-6">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc pl-8 space-y-3 text-[#444] dark:text-primary">
            {children}
          </ul>
        ),
        li: ({ children }) => (
          <li className="text-[#555] dark:text-primary font-medium text-base leading-6">
            {children}
          </li>
        ),
        code: ({ children }) => (
          <code className="inline-block bg-[#f5f5f5] dark:bg-dark-mode-bg text-[#d6336c] dark:text-pink-400 border border-gray-300 dark:border-dark-mode-highlight rounded-md p-2 text-md font-mono">
            {children}
          </code>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-4 border-yellow-400 dark:border-yellow-500 pl-4 italic text-[#666] dark:text-primary my-6">
            {children}
          </blockquote>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-[#222] dark:text-primary">
            {children}
          </strong>
        ),
        em: ({ children }) => (
          <em className="italic text-[#444] dark:text-primary">{children}</em>
        ),
        a: ({ children }) => (
          <a className="text-blue-500 dark:text-blue-400">{children}</a>
        ),
      }}
    >
      {children}
    </Markdown>
  );
}
