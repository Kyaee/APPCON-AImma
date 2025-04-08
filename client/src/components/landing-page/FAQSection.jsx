import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        "Our gamification system includes daily streaks, badges, experience points, and level progression. Complete lessons, quizzes, and challenges to earn rewards, unlock new content, and compete with friends on leaderboards.",
    },
  ];

  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="w-4/5 mx-auto">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground mb-10 mx-auto text-center max-w-2xl">
            Get answers to common questions about CapyCademy and how it works
          </p>

          <div className="max-w-3xl mx-auto mt-12">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="mb-4 bg-card rounded-lg border border-border"
                >
                  <AccordionTrigger className="px-6 py-4 text-lg font-medium text-foreground hover:text-primary hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
