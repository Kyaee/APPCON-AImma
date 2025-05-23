import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";

const FAQSection = () => {
  const faqs = [
    {
      question: "How does the AI create my personalized learning path?",
      answer:
        "Our advanced AI analyzes your current skill level, learning goals, and preferred learning style to create custom courses. It adapts in real-time based on your quiz results and progress to optimize your learning journey.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Yes! You can try CapyCademy for free with limited features. Our free tier includes access to basic courses, quizzes, and progress tracking. Premium features like advanced analytics and unlimited courses require a subscription.",
    },
    {
      question: "How often is new content added?",
      answer:
        "Our AI continuously generates new content based on the latest industry trends and user feedback. New modules, quizzes, and learning materials are added weekly to keep content fresh and relevant.",
    },
    {
      question: "Can I track my progress across different skill areas?",
      answer:
        "Absolutely! Our comprehensive dashboard provides detailed analytics that track your progress across all skill areas. You can visualize your strengths, identify areas for improvement, and see how your proficiency evolves over time.",
    },
    {
      question: "How does the gamification system work?",
      answer:
        "Our gamification system includes daily streaks, badges, experience points, and level progression. Complete lessons, quizzes, and challenges to earn rewards, and unlock new content.",
    },
  ];

  // Calculate the minimum height needed for the FAQ container
  // This ensures the layout doesn't shift when accordions expand
  const [minContainerHeight, setMinContainerHeight] = useState(0);

  useEffect(() => {
    // Calculate a reasonable minimum height (estimate max expansion height)
    // Each FAQ item when expanded adds roughly 100px of height
    const estimatedMaxHeight = faqs.length * 80 + 200; // base height + expansion room
    setMinContainerHeight(estimatedMaxHeight);
  }, [faqs.length]);

  return (
    <section id="faq" className="py-1 md:py-1">
      <div className="w-[90%] md:w-4/5 mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 md:mb-4 text-center">
          Frequently Asked Questions
        </h2>
        <p className="text-base md:text-xl text-white mb-6 md:mb-10 mx-auto text-center max-w-3xl px-4">
          Find answers about how CapyCademy's intelligent learning system adapts
          to your unique needs and helps you achieve your learning goals
        </p>

        {/* Fixed height container for the accordion to prevent layout shifts */}
        <div
          className="max-w-3xl mx-auto mt-6 md:mt-12 relative"
          style={{ minHeight: `${minContainerHeight}px` }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="mb-3 md:mb-4 bg-white rounded-lg border-[1px] md:border-2 border-black custom-shadow-50 overflow-hidden"
              >
                <AccordionTrigger className="px-4 md:px-6 py-3 md:py-4 text-base md:text-lg font-medium text-black hover:text-[#007CE8] hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-4 md:px-6 pb-3 md:pb-4 text-sm md:text-base text-black/80 transition-all">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
            <div className="h-4"></div>
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
