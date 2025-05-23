import React from "react";
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
import CapySwag from "/src/assets/shop/CapySwag.png";
import CapyApprove from "/src/assets/shop/CapyApprove.png";
import MainNav from "@/components/layout/main-nav";
import Header from "@/components/layout/lesson/header-navigator";
import { useParams, useLocation } from "react-router-dom";
import linesBg from "/background/lines-bg.png"; // If file is in the root of public folder
import { useNavigation } from "@/context/navigationContext";
import { Background } from "@/components/layout/Background"; // Import the Background component

export default function ElementShop() {
  const { id } = useParams();
  const location = useLocation();
  const { setSuppressNavigation } = useNavigation();

  // Track whether we've handled header rendering
  const [isHeaderRendered, setIsHeaderRendered] = React.useState(false);

  // More targeted detection logic - specifically look for /l/shop/ pattern
  const isFromLesson = React.useMemo(() => {
    return (
      location.pathname.includes("/l/shop/") ||
      (location.state && location.state.source === "lesson")
    );
  }, [location.pathname, location.state]);

  // Set navigation suppression based on source
  React.useEffect(() => {
    if (isFromLesson) {
      // If we're in /l/shop/:id, let the LessonLayout render its header
      // We just need to make sure we don't render an additional one
      setIsHeaderRendered(true);
      // We don't suppress any navigation in this case
      setSuppressNavigation(null);
    } else {
      // If we're in /shop/:id, render the MainNav
      setSuppressNavigation("lesson");
    }

    // Clean up when unmounting
    return () => setSuppressNavigation(null);
  }, [isFromLesson, setSuppressNavigation]);

  // Data for shop items
  const shopItems = [
    {
      id: 1,
      title: "+1 Life",
      price: "50 Gems",
      image: CapySwag,
      bgColor: "#ffcb23",
    },
    {
      id: 2,
      title: "Unlock a lesson",
      price: "250 Gems",
      image: CapyApprove,
      bgColor: "#57b2f4e6",
    },
    {
      id: 3,
      title: "EXP Boost 2xp for 1 hour",
      price: "300 Gems",
      image: CapySwag,
      bgColor: "#ffcb23",
    },
    {
      id: 4,
      title: "Free trial for 6 hours",
      price: "500 Gems",
      image: CapyApprove,
      bgColor: "#57b2f4e6",
    },
    {
      id: 5,
      title: "Free trial for 3 hours",
      price: "250 Gems",
      image: CapyApprove,
      bgColor: "#57b2f4e6",
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
      price: "₱ 743",
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
      price: "₱ 2,774",
      period: "/ mo",
      description: "For casual learners, that want to progressively study.",
      perks: [
        "🚀 High API usage",
        "✅ Full Access",
        "📦 20GB ",
        "✅ Full Access",
        "✅ Priority",
        "✅ Yes Advanced AI Features",
      ],
      discount: "Save 17%",
      originalPrice: "₱ 1,364",
    },
  ];

  return (
    <div className="w-full min-h-screen text-black dark:text-primary overflow-hidden">
      {/* Apply Background component when coming from lesson */}
      {isFromLesson ? (
        <Background />
      ) : (
        // Otherwise add a simple background color for the standalone shop page
        <div className="fixed top-0 -z-10 min-h-screen w-screen" />
      )}

      {/* Only render navigation when not coming from lesson path */}
      {!isFromLesson && <MainNav userId={id} />}

      {/* Main Content */}
      <div className="mt-32 ml-32 py-6">
        <h1 className="text-3xl font-semibold mb-2 ml-8 text-black dark:text-primary">
          In-App Purchases
        </h1>

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
              className="border-2 border-foreground dark:border-dark-mode-highlight rounded-[20px] bg-card dark:bg-dark-inner-bg transform transition-transform hover:scale-105 custom-shadow-75"
            >
              <CardContent className="flex flex-col items-center justify-center gap-1 h-[280px]">
                <div className="relative w-56 h-56">
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
                  <div className="absolute top-12 left-[117px] font-extrabold text-primary text-sm">
                    {item.icon}
                  </div>
                </div>
                <h3
                  className="font-extrabold text-primary text-[1.5rem] tracking-tight text-center overflow-hidden"
                  style={{ height: "5rem" }}
                >
                  {item.title}
                </h3>
              </CardContent>
              <CardFooter>
                <Button className="h-10 w-full bg-[#FFD700] hover:bg-[#E6C200] transition-all duration-300 cursor-pointer text-[#444444] rounded-[10px] border-2 border-black font-extrabold custom-shadow-50">
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
        <h2 className="ml-40 text-3xl font-semibold mb-8 text-black dark:text-primary">
          User Plan
        </h2>

        <div className="flex flex-wrap gap-8 justify-center">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className="max-w-xl bg-card dark:bg-dark-inner-bg rounded-[20px] border-2 border-solid border-foreground dark:border-dark-mode-highlight custom-shadow-75"
            >
              <CardHeader className="pb-0">
                <CardTitle className="text-primary text-2xl font-semibold flex items-center gap-2">
                  {plan.icon && plan.icon}
                  {plan.title}
                </CardTitle>

                <div className="mt-4 flex flex-col">
                  {plan.discount && (
                    <div className="text-primary flex items-center gap-2 mb-2">
                      <Badge
                        variant="outline"
                        className="text-primary bg-background dark:bg-dark-mode-highlight border border-solid border-foreground dark:border-dark-mode-highlight rounded-[10px] font-normal"
                      >
                        {plan.discount}
                      </Badge>
                      {plan.originalPrice && (
                        <span className="text-primary text-base line-through">
                          {plan.originalPrice}
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex items-end">
                    <span className="mt-3 text-primary text-5xl tracking-[-3.46px] leading-[48px] font-normal">
                      {plan.price}
                    </span>
                    <span className="text-primary text-base ml-1">
                      &nbsp;{plan.period}
                    </span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-5">
                <p className="text-primary text-base font-medium mb-3">
                  {plan.description}
                </p>

                <ul className="space-y-2">
                  {plan.perks.map((perk, i) => (
                    <li key={i} className="text-primary text-base font-medium">
                      • {perk}
                    </li>
                  ))}
                </ul>

                <Separator className="mt-10 mb-3 h-0.5 bg-primary" />
              </CardContent>

              <CardFooter>
                <Button className="w-full h-[53px] cursor-pointer bg-[#007CE8] hover:bg-[#0056b3] transition-all duration-300 text-white font-extrabold rounded-[10px] border border-solid border-black custom-shadow-75">
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
