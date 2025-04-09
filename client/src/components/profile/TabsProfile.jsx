import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RadarChart from "@/components/features/charts/radar-chart";
import LineChart from "@/components/features/charts/line-chart";
import { Button } from "@/components/ui/button";

export default function ProfileTabs({linechartData, radarData, summary}) {
  return (
    <Tabs defaultValue="strengthNQualities">
      <TabsList className="grid w-full h-14 grid-cols-2 bg-white dark:bg-dark-inner-bg *:font-bold *:h-11 *:tracking-tight *:text-md">
        <TabsTrigger value="strengthNQualities" className="text-foreground dark:text-primary data-[state=active]:bg-light-brown dark:data-[state=active]:bg-dark-nav-bg">
          Strength & Qualities
        </TabsTrigger>
        <TabsTrigger value="Growth" className="text-foreground dark:text-primary data-[state=active]:bg-light-brown dark:data-[state=active]:bg-dark-nav-bg">
          Growth
        </TabsTrigger>
      </TabsList>
      <TabsContent value="strengthNQualities">
        <Card className="mt-2 border-2 border-foreground dark:border-dark-mode-highlight h-full bg-background dark:bg-dark-mode-bg">
          <CardContent className="flex gap-4 justify-between h-85">
            <RadarChart chartData={radarData}/>  
            <div className="w-full h-full border-2 border-foreground dark:border-dark-mode-highlight p-5 rounded-md bg-background dark:bg-dark-mode-bg">
              <CardTitle className="text-black dark:text-primary">Your Stats</CardTitle>
              <CardDescription className="text-black dark:text-primary">
                {summary}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Growth">
        <Card className="mt-2 border-2 border-foreground dark:border-dark-mode-highlight bg-background dark:bg-dark-mode-bg">
          <CardContent className="space-y-2">
            <LineChart chartData={linechartData}/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
