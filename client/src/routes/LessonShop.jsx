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
import BlueCappy from "/src/assets/shop/BlueCappy.svg";
import RedCappy from "/src/assets/shop/RedCappy.svg";
// Header is already provided by LessonLayout parent component, no need to import it here
import { useParams } from "react-router-dom";
import linesBg from "/background/lines-bg.png"; // Image from public folder

export default function LessonShop() {
  const { id } = useParams();
  
  // Shop items data
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

  return (
    <div 
      className="w-full min-h-screen text-black overflow-hidden"
      style={{
        backgroundImage: `url(${linesBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Header component is provided by LessonLayout */}
      
      {/* Main Content */}
      <div className="mt-32 ml-32 py-6">
        <h1 className="text-3xl font-semibold mb-2 ml-8">In-App Purchases</h1>

        <div className="flex items-center w-11/12 gap-7 mb-5 px-7 pb-10 pt-5 overflow-auto hide-scrollbar">
          {shopItems.map((item) => (
            <Card
              key={item.id}
              className="border border-black rounded-[20px] bg-white transform transition-transform hover:scale-105 custom-shadow-50"
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
                  <div className="absolute top-12 left-[117px] font-extrabold text-black text-sm">
                    {item.icon}
                  </div>
                </div>
                <h3
                  className="font-extrabold text-[#444444] text-[1.5rem] tracking-tight text-center overflow-hidden"
                  style={{ height: "5rem" }}
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
      
      <footer className="pb-15"></footer>
    </div>
  );
}