import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import CapySkin from "./CapySkins";

export default function SkinBadgesTabs() {
  return (
    <Tabs defaultValue="skins" className="">
      <TabsContent value="skins">
        <Card className="mt-2 border-2 border-foreground">
          <CardContent className="p-4 py-2">
            <CapySkin />
          </CardContent>
        </Card>
      </TabsContent>

    </Tabs>
  );
}
