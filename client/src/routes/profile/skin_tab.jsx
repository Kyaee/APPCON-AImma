import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import CapySkin from './capyskin';
import BadgesProfile from './badges-profile';

export default function SkinBadgesTabs() {
  return (
    <Tabs defaultValue="skins" className="">
      <TabsList className="grid w-full h-14 grid-cols-2 bg-foreground *:font-bold *:h-11 *:tracking-tight *:text-md">
        <TabsTrigger value="skins" className="text-background">
          Capy Skins
        </TabsTrigger>
        <TabsTrigger value="badges" className="text-background">
          Badges
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="skins">
        <Card className="mt-2 border-2 border-foreground">
          <CardContent className="p-4">
            <CapySkin />
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="badges">
        <Card className="mt-2 border-2 border-foreground">
          <CardContent className="p-4">
            <BadgesProfile 
              badges={{
                name: "Example badge here",
                description: "You put the description here"
              }}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}