"use client";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { useState, useMemo } from "react";
import { default as emojiMap } from "unicode-emoji-json";
import { HashLoader } from "react-spinners";

import { personalConfig } from "@/config/personal";
import { fuzzySearch } from "@/lib/fuzzySearch";
import { Emoji } from "@/types/emoji";
import { wavingHand } from "@/lib/emojis";

// Proxy emoji images through our own API route for server-side caching.
// This avoids slow cross-border CDN fetches on every client load.
function fixUrl(url: string) {
  const path = url.replace(
    "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/",
    "",
  );
  return `/api/emoji-image/${path}`;
}

const AnimatedEmoji = () => {
  const [prompt, setPrompt] = useState<string>("Hello");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [emoji, setEmoji] = useState<Emoji>(wavingHand);

  const emojiUrl = useMemo(() => {
    // Use local copy for initial emoji to avoid any network fetch on first load
    if (emoji === wavingHand) return "/emojis/waving-hand.png";
    return fixUrl(emoji.url);
  }, [emoji]);

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("/api/emoji", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
      });

      clearTimeout(timeout);

      if (!response.ok) {
        let msg = "生成失败，请稍后重试";
        try {
          const errData = await response.json();
          if (errData.error) msg = errData.error;
          else if (errData.message) msg = errData.message;
        } catch {}
        setError(msg);
        return;
      }

      const data = await response.json();

      if (!data.result) {
        setError("未能识别，请换个词试试");
        return;
      }

      const emojiEntry =
        emojiMap[data.result.trim() as keyof typeof emojiMap];

      if (emojiEntry) {
        const searchedResult = fuzzySearch(emojiEntry.name);
        if (searchedResult) {
          setEmoji(searchedResult);
        } else {
          setError("未找到对应的动画表情");
        }
      } else {
        setError(`"${data.result}" 暂无动画版本`);
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        setError("请求超时，请稍后重试");
      } else {
        setError("网络错误，请检查网络后重试");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full p-4 flex flex-col justify-between items-center">
      {loading ? (
        <div className="flex h-full w-full justify-center items-center">
          <HashLoader color="#eef0f7" size={50} />
        </div>
      ) : error ? (
        <div className="flex h-full w-full justify-center items-center text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400 px-2">
            {error}
          </p>
        </div>
      ) : (
        <img
          alt="Animated Emoji"
          className="h-[150px] w-[150px] object-contain"
          src={emojiUrl}
        />
      )}
      <div className="no-drag w-full space-y-3 flex flex-col items-center justify-center">
        <Input
          className="w-[95%]"
          classNames={{
            inputWrapper: "border-midnight dark:border-knight",
            label: "text-gray-400",
          }}
          label="Enter text, get emoji!"
          radius="lg"
          variant="underlined"
          onValueChange={(value) => {
            setPrompt(value);
            setError(null);
          }}
        />
        <Button
          className="w-full border-midnight dark:border-knight"
          radius="full"
          variant="bordered"
          onPress={handleGenerate}
        >
          Generate
        </Button>
      </div>
    </div>
  );
};

export default AnimatedEmoji;
