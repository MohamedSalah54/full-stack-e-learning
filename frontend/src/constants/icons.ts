import {
  CodeXml,
  Palette,
  FlaskConical,
  Calculator,
  BookOpen,
  Rocket,
  Cpu,
  Wrench,
  ShoppingCart,
  Music,
  Globe,
  PenTool,
  Briefcase,
  Languages,
  GraduationCap,
} from "lucide-react";

import { LucideIcon } from "lucide-react";

export type IconKey =
  | "code"
  | "design"
  | "science"
  | "math"
  | "education"
  | "startup"
  | "technology"
  | "tools"
  | "shopping"
  | "music"
  | "geography"
  | "art"
  | "business"
  | "languages"
  | "graduation";

export const categoryIcons: Record<IconKey, LucideIcon> = {
  code: CodeXml,
  design: Palette,
  science: FlaskConical,
  math: Calculator,
  education: BookOpen,
  startup: Rocket,
  technology: Cpu,
  tools: Wrench,
  shopping: ShoppingCart,
  music: Music,
  geography: Globe,
  art: PenTool,
  business: Briefcase,
  languages: Languages,
  graduation: GraduationCap,
};
