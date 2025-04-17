import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RadarChart from "@/components/features/charts/radar-chart";
import LineChart from "@/components/features/charts/line-chart";
import { useEffect, useState } from "react";
import { ZapIcon } from "lucide-react";
import { useAuth } from "@/config/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

export default function ProfileTabs({ profileData, linechartData }) {
  const [weeklyExpData, setWeeklyExpData] = useState([
    50, 10, 20, 60, 80, 30, 40,
  ]);
  const [loading, setLoading] = useState(true);
  const [index, selectIndex] = useState(0);
  const { session } = useAuth();

  // Function to check if we need to reset weekly data (new week started)
  useEffect(() => {
    console.log(profileData);

    const fetchWeeklyExpData = async () => {
      try {
        setLoading(true);

        if (!session?.user?.id) {
          console.log("No user found, can't fetch EXP data");
          setLoading(false);
          return;
        }

        // Just use the linechartData from props or default to zeros
        // Avoiding database queries that cause errors
        const newWeeklyData =
          Array.isArray(linechartData) && linechartData.length === 7
            ? [...linechartData]
            : [0, 0, 0, 0, 0, 0, 0];

        setWeeklyExpData(newWeeklyData);
        setLoading(false);
      } catch (error) {
        console.error("Error in fetchWeeklyExpData:", error);
        setLoading(false);
      }
    };

    fetchWeeklyExpData();

    // Set up polling to refresh data periodically
    const intervalId = setInterval(() => {
      fetchWeeklyExpData();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId);
  }, [session?.user?.id, linechartData]);

  useEffect(() => {
    console.log("Index", index);
  }, [index]);

  return (
    <Tabs defaultValue="strengthNQualities">
      <TabsList className="border-2 border-foreground grid w-full h-14 grid-cols-2 bg-dark-brown dark:bg-dark-inner-bg *:font-bold *:h-10 *:tracking-tight *:text-md">
        <TabsTrigger
          value="strengthNQualities"
          className="text-background dark:text-foreground data-[state=active]:bg-background dark:data-[state=active]:bg-dark-nav-bg data-[state=active]:text-foreground data-[state=active]:h-10"
        >
          Strength & Qualities
        </TabsTrigger>
        <TabsTrigger
          value="Growth"
          className="text-background dark:text-foreground data-[state=active]:bg-background dark:data-[state=active]:bg-dark-nav-bg data-[state=active]:text-foreground"
        >
          Growth
        </TabsTrigger>
      </TabsList>
      <TabsContent value="strengthNQualities">
        <Card className="px-3 mt-2 border-2 border-foreground dark:border-dark-mode-highlight h-full bg-background dark:bg-dark-mode-bg">
          <CardContent className="flex flex-wrap justify-between ">
            <RadarChart chartData={profileData[index]?.radar_chart_data} />
            <div className="px-4 max-w-57 h-auto border border-foreground dark:border-dark-mode-highlight py-5 rounded-md bg-background dark:bg-dark-mode-bg">
              <CardTitle className="text-black dark:text-primary mb-2">
                Your Stats
              </CardTitle>
              <CardDescription className="flex items-center h-full text-black dark:text-primary">
                {profileData[index]?.summary}
              </CardDescription>
            </div>
          </CardContent>
          <Select
            onValueChange={(value) => {
              const selectedIndex = profileData.findIndex(
                (lesson) => lesson.visual_id === value
              );
              selectIndex(selectedIndex);
            }}
            defaultValue={profileData[0]?.visual_id || ""}
          >
            <SelectTrigger className="w-full py-6 border-2 border-foreground hover:bg-light-brown transition duration-200">
              <SelectValue placeholder="Select lesson statistics" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Select lesson to view statistics</SelectLabel>
                {Array.isArray(profileData) ? (
                  profileData.map((lesson, index) => (
                    <SelectItem key={lesson.index} value={lesson.visual_id}>
                      {index + 1}. {lesson.lesson_name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled>No lessons available</SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Card>
      </TabsContent>
      <TabsContent value="Growth">
        <Card className="mt-2 border-2 border-foreground dark:border-dark-mode-highlight bg-background dark:bg-dark-mode-bg">
          <CardContent className="p-4">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-[250px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Loading EXP data...
                </p>
              </div>
            ) : (
              <div className="h-[250px] max-h-[250px] w-full overflow-hidden">
                <LineChart chartData={weeklyExpData} />
              </div>
            )}
            <div className="bg-slate-100 dark:bg-dark-mode-highlight/30 p-3 rounded-md mt-3">
              <div className="flex items-center gap-1.5">
                <ZapIcon className="h-4 w-4 text-yellow-500" />
                <p className="text-sm font-medium text-black dark:text-white">
                  Experience Points
                </p>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                Complete lessons and assessments to increase your daily EXP!
                Resets weekly on Monday.
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
