import {
  Gem,
  SmileIcon,
  AngryIcon,
  BicepsFlexed,
  Hourglass,
  ZapIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function LessonArticle({
  name,
  difficulty,
  duration,
  exp,
  gems,
  assessment
}) {
  return (
    <>
      <h1 className="text-5xl font-extrabold text-[#464646] tracking-tighter leading-[48px] mb-6 [font-family:'Poppins-ExtraBold',Helvetica]">
        {name}
      </h1>

      <div className="badge-container flex items-center gap-4 mb-8 select-none">
        {difficulty === "Easy" && (
          <Badge
            variant="outline"
            className="h-9 w-[90px] rounded-[5px] border-2 border-emerald-500 flex items-center justify-center gap-2"
          >
            <SmileIcon className="w-[17px] h-[17px] text-emerald-600" />
            <span className="text-emerald-600 text-base">
              {difficulty}
            </span>
          </Badge>
        )}
        {difficulty === "Intermediate" && (
          <Badge
            variant="outline"
            className="h-9 w-[90px] rounded-[5px] border-2 text-amber-500 flex items-center justify-center gap-2"
          >
            <AngryIcon className="w-[17px] h-[17px] text-amber-500" />
            <span className="text-amber-500 text-base">
              {difficulty}
            </span>
          </Badge>
        )}
        {difficulty === "Hard" && (
          <Badge
            variant="outline"
            className="h-9 w-[90px] rounded-[5px] border-2 border-red-600 flex items-center justify-center gap-2"
          >
            <BicepsFlexed className="w-[17px] h-[17px] text-red-600" />
            <span className="text-red-600 text-base">
              {difficulty}
            </span>
          </Badge>
        )}
        <div className="flex items-center gap-5 select-none">
          {assessment && (
            <div className="flex items-center rounded-[5px] h-9 px-3 border-light-brown border-2 gap-2 font-p">
              <span className="text-brown">w/ Assessment</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-foreground font-p">
            <Hourglass className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2 text-[#7b7b7b] font-p">
            <ZapIcon className="w-4 h-4" />
            <span>{exp} exp</span>
          </div>
          <div className="flex items-center gap-2 text-[#7b7b7b] font-p">
            <Gem className="w-4 h-4" />
            <span>{gems} gems</span>
          </div>
        </div>
      </div>

      <Separator className="border border-foreground mb-10" />
    </>
  );
}
