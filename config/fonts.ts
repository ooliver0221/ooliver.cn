import { Ubuntu, Oleo_Script } from "next/font/google";

/*
  要更换字体，修改上面的 import 和下面的调用即可。

  主字体可选：Ubuntu, Inter, Roboto, Poppins
  装饰字体可选：Oleo_Script, Pacifico, Dancing_Script

  导入后照下面的格式调用即可。
*/

export const fontPrimary = Ubuntu({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const fontDecorative = Oleo_Script({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-oleo",
});
