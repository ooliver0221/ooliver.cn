"use client";

import { Tab, Tabs } from "@heroui/react";
import { Responsive } from "react-grid-layout";
import { useState } from "react";
import dynamic from "next/dynamic";
import { HashLoader } from "react-spinners";

import Paper from "./paper";

import { personalConfig } from "@/config/personal";
import { cn } from "@/lib/utils";
import AvatarTransition from "@/components/avatar";
import { DockDemo } from "@/components/dock-demo";
import { ThemeSwitch } from "@/components/theme-switch";
import Actions from "@/components/actions";
import { layouts, selectedCard } from "@/config/layout";
import { icons } from "@/config/icons";
import useWindowWidth from "@/hooks/useWindowWidth";

const LoadingPlaceholder = () => (
  <div className="w-full h-full flex justify-center items-center">
    <HashLoader color="#eef0f7" size={50} />
  </div>
);

// Lazy load heavy client components with next/dynamic
// These components use browser APIs (WebGL, Mapbox) so ssr: false is required
const IconCloud = dynamic(() => import("@/components/icon-cloud"), {
  ssr: false,
  loading: LoadingPlaceholder,
});

const MapComponent = dynamic(() => import("@/components/map"), {
  ssr: false,
  loading: LoadingPlaceholder,
});

const Live2D = dynamic(() => import("@/components/live2d"), {
  ssr: false,
  loading: LoadingPlaceholder,
});

// Lazy load for code splitting, but allow SSR (these don't need browser APIs)
const AnimatedEmoji = dynamic(() => import("@/components/animated-emoji"), {
  loading: LoadingPlaceholder,
});

const CardStack = dynamic(() => import("@/components/card-stack"), {
  loading: LoadingPlaceholder,
});

const WebAgent = dynamic(() => import("@/components/webagent"), {
  loading: LoadingPlaceholder,
});

const Chatbot = dynamic(() => import("@/components/chatbot"), {
  loading: LoadingPlaceholder,
});

interface HomeClientProps {
  photos: string[];
  avatarUrl: string;
  dogUrl: string;
  actionImageUrl: string;
  webagentUrl: string;
  chatbotUrl: string;
  paperUrl: string;
}

export default function HomeClient({
  photos,
  avatarUrl,
  dogUrl,
  actionImageUrl,
  webagentUrl,
  chatbotUrl,
  paperUrl,
}: HomeClientProps) {
  const { width, settled } = useWindowWidth();
  const [tabSelected, setTabSelected] = useState("all");

  return (
    <div className="flex justify-center flex-col items-center">
      <Tabs
        aria-label="Tabs"
        className="mb-2 md:mb-6 rounded-full"
        classNames={{
          cursor: "shadow-none",
          tabList:
            "bg-[#ece7e7] dark:bg-darkBg border-2 border-transparent dark:border-knight rounded-full",
        }}
        radius={"full"}
        onSelectionChange={(selected) => {
          setTabSelected(selected as string);
        }}
      >
        <Tab key="all" title={personalConfig.tabs.all} />
        <Tab key="about" title={personalConfig.tabs.about} />
        <Tab key="projects" title={personalConfig.tabs.projects} />
      </Tabs>

      <Responsive
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        className={cn(
          "layout w-full h-full",
          settled ? "layout-settled" : "layout-initializing",
        )}
        cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
        dragConfig={{ cancel: ".no-drag" }}
        layouts={layouts[tabSelected]}
        margin={[15, 15]}
        width={width}
      >
        <div
          key="avatar"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex flex-col justify-between p-5 overflow-hidden z-[1]",
            selectedCard[tabSelected]["avatar"] ? "opacity-100" : "opacity-50",
          )}
        >
          <AvatarTransition avatarUrl={avatarUrl} dogUrl={dogUrl} />
          <p
            className="text-sm md:text-medium"
            dangerouslySetInnerHTML={{ __html: personalConfig.person.bio }}
          />
          <DockDemo />
        </div>
        <div
          key="themeSwitch"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["themeSwitch"]
              ? "opacity-100"
              : "opacity-50",
          )}
        >
          <ThemeSwitch />
        </div>
        <div
          key="cardStack"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[2]",
            selectedCard[tabSelected]["cardStack"]
              ? "opacity-100"
              : "opacity-50",
          )}
        >
          <CardStack photos={photos} />
        </div>
        <div
          key="animatedEmoji"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1]",
            selectedCard[tabSelected]["animatedEmoji"]
              ? "opacity-100"
              : "opacity-50",
          )}
        >
          <AnimatedEmoji />
        </div>
        <div
          key="mapComponent"
          className={cn(
            "bg-white dark:bg-darkBg cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1] overflow-hidden",
            selectedCard[tabSelected]["mapComponent"]
              ? "opacity-100"
              : "opacity-50",
          )}
        >
          <MapComponent />
        </div>
        <div
          key="iconCloud"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center relative overflow-hidden p-10 md:p-8 z-[1]",
            selectedCard[tabSelected]["iconCloud"]
              ? "opacity-100"
              : "opacity-50",
          )}
        >
          <IconCloud iconSlugs={icons} />
        </div>
        <div
          key="webAgent"
          className={cn(
            "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center overflow-hidden z-[1]",
            selectedCard[tabSelected]["webAgent"]
              ? "opacity-100"
              : "opacity-50",
          )}
        >
          <WebAgent
            webAgentUrl={webagentUrl}
            linkUrl={personalConfig.projects.webAgent.url}
          />
        </div>
        <div
          key="chatBot"
          className={cn(
            "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center overflow-hidden z-[1]",
            selectedCard[tabSelected]["chatBot"] ? "opacity-100" : "opacity-50",
          )}
        >
          <Chatbot
            chatbotUrl={chatbotUrl}
            linkUrl={personalConfig.projects.chatbot.url}
          />
        </div>
        <div
          key="miniModel"
          className={cn(
            "bg-white dark:bg-darkBg border-2 border-transparent dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1] overflow-hidden",
            selectedCard[tabSelected]["miniModel"]
              ? "opacity-100"
              : "opacity-50",
          )}
        >
          <Live2D />
        </div>
        <div
          key="actions"
          className={cn(
            "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center overflow-hidden z-[1]",
            selectedCard[tabSelected]["actions"] ? "opacity-100" : "opacity-50",
          )}
        >
          <Actions
            photoUrl={actionImageUrl}
            linkUrl={personalConfig.projects.actions.url}
          />
        </div>
        <div
          key="paper"
          className={cn(
            "bg-white dark:bg-darkBg dark:border-2 dark:border-knight cursor-grab active:cursor-grabbing rounded-[2rem] flex justify-center items-center z-[1] overflow-hidden",
            selectedCard[tabSelected]["paper"] ? "opacity-100" : "opacity-50",
          )}
        >
          <Paper
            paperUrl={paperUrl}
            linkUrl={personalConfig.projects.paper.url}
          />
        </div>
      </Responsive>
    </div>
  );
}
