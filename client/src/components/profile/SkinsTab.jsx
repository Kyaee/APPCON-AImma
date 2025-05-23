import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import CapySkin from "./CapySkins";

export default function SkinBadgesTabs() {
  return (
    <Tabs defaultValue="skins" className=" mt-9">
      <h2 className="text-2xl mb-3 font-semibold text-black dark:text-primary tracking-tight">
        Capy Skins Collection
      </h2>

      <TabsContent value="skins">
        <Card className="border-2 border-foreground dark:border-dark-mode-highlight bg-background dark:bg-dark-mode-bg">
          <CardContent className="p-4 py-0">
            <CapySkin />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
