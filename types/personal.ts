export interface PersonalConfig {
  site: {
    name: string;
    description: string;
    url: string;
    keywords: string[];
    author: string;
  };
  person: {
    name: string;
    alternateName: string;
    jobTitle: string;
    organization: string;
    alumniOf: string[];
    bio: string;
  };
  links: {
    github: string;
    email: string;

    steam: string;
    wechat: string;
    qq: string;
    bilibili: string;
    tiktok: string;
    luogu: string;
  };
  tabs: {
    all: string;
    about: string;
    projects: string;
  };
  projects: {
    webAgent: { name: string; url: string; description: string };
    chatbot: { name: string; url: string; description: string };
    actions: { name: string; url: string; description: string };
    paper: { name: string; url: string; description: string };
  };
  icons: string[];
  fonts: {
    primary: "ubuntu" | "inter" | "roboto" | "poppins";
    decorative: "oleoScript" | "pacifico" | "dancingScript";
  };
  images: {
    avatar: string;
    dog: string;
    action: string;
    webagent: string;
    chatbot: string;
    paper: string;
    photos: string[];
  };
  api: {
    deepseekApiKey: string;
    deepseekModel: string;
  };
  map: {
    center: number[];
    zoom: number;
  };
  emojiBaseUrl: string;
  live2d: {
    modelPath: string;
    enabled: boolean;
  };
  openGraph: {
    title: string;
    description: string;
    alt: string;
  };
}
