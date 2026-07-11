import React from "react";
import { IoLogoGithub, IoMail } from "react-icons/io5";
import { SiSteam, SiBilibili, SiTiktok } from "react-icons/si";
import { RiWechatFill, RiQqFill } from "react-icons/ri";

import { Dock, DockIcon } from "@/components/dock";
import { LuoguIcon } from "@/components/icons/LuoguIcon";
import { siteConfig } from "@/config/site";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function DockDemo() {
  return (
    <div className="self-end" onMouseDown={(e) => e.stopPropagation()}>
      <Dock>
        <DockIcon tooltip="GitHub" url={siteConfig.links.github}>
          <IoLogoGithub className="h-4 w-4 sm:h-5 sm:w-5" />
        </DockIcon>
        <DockIcon tooltip="Luogu" url={siteConfig.links.luogu}>
          <LuoguIcon className="h-4 w-4 sm:h-5 sm:w-5" />
        </DockIcon>
        <DockIcon tooltip="Steam" url={siteConfig.links.steam}>
          <SiSteam className="h-4 w-4 sm:h-5 sm:w-5" />
        </DockIcon>
        <DockIcon qrCode="/wechat-qr.jpg" tooltip="Wechat">
          <RiWechatFill className="h-4 w-4 sm:h-5 sm:w-5" />
        </DockIcon>
        <DockIcon qrCode="/qq-qr.jpg" tooltip="QQ">
          <RiQqFill className="h-4 w-4 sm:h-5 sm:w-5" />
        </DockIcon>
        <DockIcon tooltip="Bilibili" url={siteConfig.links.bilibili}>
          <SiBilibili className="h-4 w-4 sm:h-5 sm:w-5" />
        </DockIcon>
        <DockIcon tooltip="TikTok" url={siteConfig.links.tiktok}>
          <SiTiktok className="h-4 w-4 sm:h-5 sm:w-5" />
        </DockIcon>
        <DockIcon tooltip="Email" url={siteConfig.links.email}>
          <IoMail className="h-4 w-4 sm:h-5 sm:w-5" />
        </DockIcon>
      </Dock>
    </div>
  );
}
