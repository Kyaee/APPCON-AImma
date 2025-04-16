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
import { supabase } from "@/config/supabase";
import { ZapIcon } from "lucide-react";
import { useAuth } from "@/config/authContext";

export default function ProfileTabs({ linechartData, radarData, summary }) {
  const [weeklyExpData, setWeeklyExpData] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();

  // Function to check if we need to reset weekly data (new week started)
  const shouldResetWeeklyData = () => {
    const today = new Date();
    const lastWeeklyUpdateStr = localStorage.getItem("last_weekly_exp_update");

    if (!lastWeeklyUpdateStr) {
      localStorage.setItem("last_weekly_exp_update", today.toISOString());
      return false;
    }

    const lastUpdateDate = new Date(lastWeeklyUpdateStr);

    // Calculate the current week number in the year
    const getWeekNumber = (date) => {
      const d = new Date(date);
      d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
      return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    };

    const currentWeek = getWeekNumber(today);
    const lastWeek = getWeekNumber(lastUpdateDate);

    if (currentWeek !== lastWeek) {
      localStorage.setItem("last_weekly_exp_update", today.toISOString());
      return true;
    }

    return false;
  };

  useEffect(() => {
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

  return (
    <Tabs defaultValue="strengthNQualities">
      <TabsList className="grid w-full h-14 grid-cols-2 bg-white dark:bg-dark-inner-bg *:font-bold *:h-11 *:tracking-tight *:text-md">
        <TabsTrigger
          value="strengthNQualities"
          className="text-foreground dark:text-primary data-[state=active]:bg-light-brown dark:data-[state=active]:bg-dark-nav-bg"
        >
          Strength & Qualities
        </TabsTrigger>
        <TabsTrigger
          value="Growth"
          className="text-foreground dark:text-primary data-[state=active]:bg-light-brown dark:data-[state=active]:bg-dark-nav-bg"
        >
          Growth
        </TabsTrigger>
      </TabsList>
      <TabsContent value="strengthNQualities">
        <Card className="mt-2 border-2 border-foreground dark:border-dark-mode-highlight h-full bg-background dark:bg-dark-mode-bg">
          <CardContent className="flex gap-4 justify-between h-85">
            <RadarChart chartData={radarData} />
            <div className="w-full h-full border-2 border-foreground dark:border-dark-mode-highlight p-5 rounded-md bg-background dark:bg-dark-mode-bg">
              <CardTitle className="text-black dark:text-primary">
                Your Stats
              </CardTitle>
              <CardDescription className="text-black dark:text-primary">
                {summary}
              </CardDescription>
            </div>
          </CardContent>
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
