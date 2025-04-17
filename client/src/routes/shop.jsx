import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Gem, Rocket, Briefcase } from "lucide-react";
// Fix image imports from public directory
import BlueCappy from "/src/assets/shop/BlueCappy.svg";
import RedCappy from "/src/assets/shop/RedCappy.svg";
import MainNav from "@/components/layout/main-nav";
import Header from "@/components/layout/lesson/header-navigator";
import { useParams, useLocation } from "react-router-dom";
import linesBg from "/background/lines-bg.png"; // If file is in the root of public folder

export default function ElementShop() {
  const { id } = useParams();
  const location = useLocation();
  
  // Check if we're coming from a lesson (path starts with /l/)
  const isFromLesson = location.pathname.startsWith('/l/');
  
  // Data for shop items
  const shopItems = [
    {
      id: 1,
      title: "+1 Life",
      price: "50 Gems",
      image: RedCappy,
      bgColor: "#ffcb23",
      icon: "?!",
    },
    {
      id: 2,
      title: "Unlock a lesson",
      price: "250 Gems",
      image: BlueCappy,
      bgColor: "#57b2f4e6",
      icon: "++",
    },
    {
      id: 3,
      title: "EXP Boost 2xp for 1 hour",
      price: "300 Gems",
      image: RedCappy,
      bgColor: "#ffcb23",
      icon: "?!",
    },
    {
      id: 4,
      title: "Free trial for 6 hours",
      price: "500 Gems",
      image: BlueCappy,
      bgColor: "#57b2f4e6",
      icon: "++",
    },
    {
      id: 5,
      title: "Free trial for 3 hours",
      price: "250 Gems",
      image: BlueCappy,
      bgColor: "#57b2f4e6",
      icon: "++",
    },
  ];

  const pricingPlans = [
    {
      title: "Free • Current Plan",
      price: "Free",
      period: "/ mo",
      description:
        "Access to various product features that aids your interests.",
      perks: [
        "🚫 Limited API Calls",
        "✅ Basic Authentication",
        "🚫Minimal Storage ",
        " 🚫Limited Database Access",
        "🚫No Priority Support",
        "🚫No Advanced AI Features ",
        "🚫 No Advanced AI Features",
      ],
      icon: null,
      discount: null,
      originalPrice: null,
    },
    {
      title: "Learner",
      price: "₱ 554",
      period: "/ mo",
      description: "For casual learners, that want to progressively study.",
      perks: [
        "🔹 More API requests ",
        "✅ Full Access",
        "📦 5GB ",
        "✅ Full Access",
        "🔹 Community Support",
        "🔹 Limited Advanced AI Features",
      ],
      icon: <Rocket size={20} />,
      discount: "Save 33%",
      originalPrice: "₱ 1,100",
    },
    {
      title: "Professional",
      price: "₱ 10,000",
      period: "/ day",
      description: "For casual learners, that want to progressively study.",
      perks: [
        "🚀 High API usage",
        "✅ Full Access",
        "📦 20GB ",
        "✅ Full Access",
        "✅ Priority",
        "✅ Yes Advanced AI Features",
      ],
      discount: "Save 33%",
      originalPrice: "₱ 1,100",
    },
  ];

  return (
    <div 
      className="w-full min-h-screen text-black overflow-hidden"
      style={
        isFromLesson ? {
          backgroundImage: `url(${linesBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}
      }
    >
      {/* Only render one navigation component based on the route */}
      {isFromLesson ? (
        <Header 
          id={id}
          isAssessment={false}
          previousProgress={0}
          scrollProgress={0}
        />
      ) : (
        <MainNav userId={id} />
      )}

      {/* Main Content - No need for conditional class */}
      <div className="mt-32 ml-32 py-6">
        <h1 className="text-3xl font-semibold mb-2 ml-8">In-App Purchases</h1>
        {/* <p className="text-p mb-5 ml-8 text-neutral-600">Whether you're looking to boost your progress, gain extra lives, or enjoy premium features, <br/>we've got you covered. Dive in and make the most of your learning journey!</p> */}

        <div
          className=" flex items-center w-11/12 gap-7 mb-5 px-7 pb-10 pt-5 overflow-auto hide-scrollbar [-ms-overflow-style:'none'] [scrollbar-width:'none']
          [&::-webkit-scrollbar]:h-4
          [&::-webkit-scrollbar-track]:rounded-full
          [&::-webkit-scrollbar-track]:bg-gray-200
          [&::-webkit-scrollbar-track]:border
          [&::-webkit-scrollbar-track]:border-gray-300
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-light-brown  
          [&::-webkit-scrollbar-thumb]:h-[4px]
          [&::-webkit-scrollbar-thumb]:border-2
          [&::-webkit-scrollbar-thumb]:border-[#f6cb4f
          [&::-webkit-scrollbar-thumb]:hover:bg-[#ffcb23]
          before:content-[''] before:absolute before:left-0 before:top-0 before:h-full 
          before:bg-gradient-to-r before:from-white before:via-white before:to-transparent before:z-20
          after:content-[''] after:absolute after:right-0 after:top-0 after:h-full 
          after:bg-gradient-to-l after:from-white after:via-white after:to-transparent after:z-20"
        >
          {shopItems.map((item) => (
            <Card
              key={item.id}
              className="border border-black rounded-[20px] bg-white transform transition-transform hover:scale-105 custom-shadow-50"
            >
              <CardContent className="flex flex-col items-center justify-center gap-1 h-[280px]">
                {" "}
                {/* Fixed height for content */}
                <div className="relative w-56 h-56 ">
                  <div
                    className="absolute size-35 top-9 left-9 rounded-full"
                    style={{ backgroundColor: item.bgColor }}
                  />
                  {item.image && (
                    <img
                      className="absolute w-[178px] h-[177px] top-0 left-0"
                      alt={item.title}
                      src={item.image}
                    />
                  )}
                  <div className="absolute top-12 left-[117px] font-extrabold text-black text-sm">
                    {item.icon}
                  </div>
                </div>
                <h3
                  className="font-extrabold text-[#444444] text-[1.5rem] tracking-tight text-center overflow-hidden"
                  style={{ height: "5rem" }} // Fixed height instead of minHeight
                >
                  {item.title}
                </h3>
              </CardContent>
              <CardFooter>
                <Button className="h-10 w-full bg-[#f6cb4f] text-[#444444] rounded-[10px] border-2 border-black font-extrabold custom-shadow-50">
                  <Gem className="w-6 h-6 mr-2" />
                  {item.price}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing cards */}
      <div className="mt-6 ">
        <h2 className="ml-40 text-3xl font-semibold mb-8">User Plan</h2>

        <div className="flex flex-wrap gap-8 justify-center">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className="max-w-xl bg-white rounded-[20px] border border-solid border-black custom-shadow-50"
            >
              <CardHeader className="pb-0">
                <CardTitle className="text-black text-2xl font-semibold flex items-center gap-2">
                  {plan.icon && plan.icon}
                  {plan.title}
                </CardTitle>

                <div className="mt-4 flex flex-col">
                  {plan.discount && (
                    <div className="text-black flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="text-blackbg-[#dfdfdf] border border-solid border-black rounded-[10px] font-normal"
                      >
                        {plan.discount}
                      </Badge>
                      {plan.originalPrice && (
                        <span className="text-black text-base line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-end">
                    <span className="mt-3 text-black text-5xl tracking-[-3.46px] leading-[48px] font-normal">
                      {plan.price}
                    </span>
                    <span className="text-black text-base ml-1">
                      &nbsp;{plan.period}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-5">
                <p className="text-black text-base font-medium mb-3">
                  {plan.description}
                </p>

                <ul className="space-y-2">
                  {plan.perks.map((perk, i) => (
                    <li key={i} className="text-black text-base font-medium">
                      • {perk}
                    </li>
                  ))}
                </ul>

                <Separator className="mt-10 mb-3 h-0.5" />
              </CardContent>

              <CardFooter>
                <Button className="w-full h-[53px] bg-[#dfdfdf] text-[#444444] font-extrabold rounded-[10px] border border-solid border-black custom-shadow-50">
                  Buy Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      <footer className="pb-15"></footer>
    </div>
  );
}
