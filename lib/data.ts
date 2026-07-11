import { cache } from "react";
import { ref, getDownloadURL, listAll } from "firebase/storage";

import { storage } from "@/firebase/firebase";
import { personalConfig } from "@/config/personal";

const FALLBACK = {
  photos: personalConfig.images.photos,
  avatarUrl: personalConfig.images.avatar,
  dogUrl: personalConfig.images.dog,
  actionImageUrl: personalConfig.images.action,
  webagentUrl: personalConfig.images.webagent,
  chatbotUrl: personalConfig.images.chatbot,
  paperUrl: personalConfig.images.paper,
};

export const getHomeData = cache(async () => {
  if (!storage) return FALLBACK;
  const _storage = storage;

  const paths = {
    photos: "photos",
    avatar: "avatar/eric.jpg",
    dog: "avatar/dog.jpg",
    action: "projects/secondself.jpg",
    webagent: "projects/webagent.jpg",
    chatbot: "projects/chatbot.jpg",
    paper: "projects/paper.jpg",
  };

  const allPaths = [
    paths.avatar,
    paths.dog,
    paths.action,
    paths.webagent,
    paths.chatbot,
    paths.paper,
  ];

  try {
    const [photosResult, ...urlResults] = await Promise.all([
      listAll(ref(_storage, paths.photos)).then((res) =>
        Promise.all(res.items.map((item) => getDownloadURL(item))),
      ),
      ...allPaths.map((p) => getDownloadURL(ref(_storage, p))),
    ]);

    return {
      photos: photosResult,
      avatarUrl: urlResults[0],
      dogUrl: urlResults[1],
      actionImageUrl: urlResults[2],
      webagentUrl: urlResults[3],
      chatbotUrl: urlResults[4],
      paperUrl: urlResults[5],
    };
  } catch {
    console.warn("Firebase Storage fetch failed — using local images");
    return FALLBACK;
  }
});
