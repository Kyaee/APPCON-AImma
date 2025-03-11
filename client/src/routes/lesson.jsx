import { Badge } from "@/components/ui/badge";
import Header from "@/components/layout/lesson/header-navigator";
import { Separator } from "@/components/ui/separator";
import { Gem, SmileIcon, Zap } from "lucide-react";
import React from "react";
import Markdown from "react-markdown";
import Background from "@/components/features/background";  // Add this import

const experienceItems = [
  { icon: <Zap className="w-4 h-4" />, text: "100 exp" },
  { icon: <Gem className="w-5 h-5" />, text: "100 exp" },
];

const content = `
## Second Header

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum, ex sit amet sollicitudin lacinia, odio mauris pharetra libero, vel vestibulum diam nunc ac orci. Aenean nec pretium mauris.

- Cras vel tempor velit, quis suscipit urna. Sed mattis turpis eu aliquet placerat. Integer vel ligula arcu.
- Duis vitae elit ut ligula sodales congue ut non nisl.
- Maecenas sem massa, rhoncus eget arcu et, dapibus suscipit est. Sed lectus risus, convallis ac consectetur sed, eleifend non arcu. Nulla egestas malesuada pulvinar.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum, ex sit amet sollicitudin lacinia, odio mauris pharetra libero, vel vestibulum diam nunc ac orci. Aenean nec pretium mauris. Cras vel tempor velit, quis suscipit urna. Sed mattis turpis eu aliquet placerat. Integer vel ligula arcu. Duis vitae elit ut ligula sodales congue ut non nisl. Maecenas sem massa, rhoncus eget arcu et, dapibus suscipit est. Sed lectus risus, convallis ac consectetur sed, eleifend non arcu. Nulla egestas malesuada pulvinar.

### Third Header (Smaller Header)

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam condimentum, ex sit amet sollicitudin lacinia, odio mauris pharetra libero, vel vestibulum diam nunc ac orci. Aenean nec pretium mauris. Cras vel tempor velit, quis suscipit urna. Sed mattis turpis eu aliquet placerat. Integer vel ligula arcu. Duis vitae elit ut ligula sodales congue ut non nisl. Maecenas sem massa, rhoncus eget arcu et, dapibus suscipit est. Sed lectus risus, convallis ac consectetur sed, eleifend non arcu. Nulla egestas malesuada pulvinar.
` 

export default function ElementLesson() {
  return (
    <main className="w-full h-full overflow-hidden">
      <div className="fixed top-0 bg-custom-lines h-screen w-screen -z-10"></div>
      <Background />  {/* Replace the custom background div */}
      <Header page="lesson" />

      {/* Main Content */}
      <section className="mt-32 max-w-2xl mx-auto overflow-hidden">
        {/* Difficulty and Experience */}
        <div className="flex items-center gap-8 mb-6">
          <Badge
            variant="outline"
            className="h-9 w-[90px] rounded-[5px] border-2 border-emerald-500 flex items-center justify-center gap-2"
          >
            <SmileIcon className="w-[17px] h-[17px] text-emerald-600" />
            <span className="text-emerald-600">Easy</span>
          </Badge>

          <div className="flex items-center gap-8">
            {experienceItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-[#7b7b7b] font-p"
              >
                {item.icon}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold text-[#464646] tracking-[-0.58px] leading-[48px] mb-8 [font-family:'Poppins-ExtraBold',Helvetica]">
          JavaScript Introduction
        </h1>

        <Separator className="mb-10" />

        <Markdown
          components={{
            h2: ({ children }) => (
              <h2 className="mt-9 text-3xl font-semibold text-black tracking-[-0.23px] leading-9 mb-4 [font-family:'Poppins-SemiBold',Helvetica]">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mt-12 text-2xl font-semibold text-black tracking-[-0.14px] leading-8 mb-4 [font-family:'Poppins-SemiBold',Helvetica]">
                {children}
              </h3>
            ),
            p: ({ children }) => <p className="text-black font-p my-6">{children}</p>,
            ul: ({ children }) => <ul className="list-disc pl-6 space-y-2">{children}</ul>,
            li: ({ children }) => <li className="text-black font-p">{children}</li>,
            // add for images
            // tables
          }}
        >
          {content}
        </Markdown>
      </section>
      <footer className="pb-10"></footer>
    </main>
  );
}
