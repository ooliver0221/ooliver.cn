import personalData from "./personal.json";
import type { PersonalConfig } from "@/types/personal";

export const personalConfig: PersonalConfig = personalData as unknown as PersonalConfig;
