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
      <TabsList className="grid w-full h-14 grid-cols-2 bg-foreground *:font-bold *:h-11 *:tracking-tight *:text-md">
        <TabsTrigger value="strengthNQualities" className="text-background">
          Strength & Qualities
        </TabsTrigger>
        <TabsTrigger value="Growth" className="text-background">
          Growth
        </TabsTrigger>
      </TabsList>
      <TabsContent value="strengthNQualities">
        <Card className="mt-2 border-2 border-foreground h-full">
          <CardContent className="flex gap-4 justify-between h-85">
            <RadarChart chartData={radarData}/>  
            <div className="w-full h-full border-2 border-foreground p-5 rounded-md *:text-black">
              <CardTitle>Your Stats</CardTitle>
              <CardDescription>
                {summary}
              </CardDescription>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Growth">
        <Card className="mt-2 border-2 border-foreground">
          <CardContent className="space-y-2">
            <LineChart chartData={linechartData}/>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
