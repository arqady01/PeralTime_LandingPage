"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  CalendarDays,
  Users,
  BarChart3,
  Wand2,
  RefreshCcw,
  Route,
  Repeat,
  ArrowRight,
  Menu,
  X,
  Check,
  MessageSquare,
  Bell,
  Star
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  points: string[];
  icon: React.ElementType;
};

type Scenario = {
  title: string;
  description: string;
  emoji: string;
};

type Workflow = {
  title: string;
  description: string;
  icon: React.ElementType;
};

type Testimonial = {
  name: string;
  role: string;
  teamType: string;
  quote: string;
  highlights: string[];
  rating: number;
  avatarSeed: string;
};

const navItems = [
  { href: "#features", label: "功能" },
  { href: "#testimonials", label: "评价" },
  { href: "#workflow", label: "流程" },
  { href: "#scenarios", label: "场景" }
];

const features: Feature[] = [
  {
    title: "日历排班",
    description: "直接在日历上管理班次，覆盖常见轮班模式，调整有据可查。",
    points: ["日历化班次管理", "夜班规则可配置", "调整记录可追踪"],
    icon: CalendarDays
  },
  {
    title: "团队空间",
    description: "建一个空间，团队成员的班次互相可见，减少来回沟通。",
    points: ["创建或加入团队", "成员班次一目了然", "清晰的角色分工"],
    icon: Users
  },
  {
    title: "AI 对话",
    description: "遇到复杂排班问题，直接问 AI，它帮你想办法。",
    points: ["多模型可选", "流式对话", "懂你的排班场景"],
    icon: MessageSquare
  },
  {
    title: "数据看板",
    description: "班次趋势和分布一目了然，帮你复盘和做计划。",
    points: ["月、年、全范围分析", "趋势对比", "支撑管理决策"],
    icon: BarChart3
  },
  {
    title: "提醒与导出",
    description: "班前提醒不怕忘，数据导出方便分享和留档。",
    points: ["班次提醒", "数据导出", "天气信息联动"],
    icon: Bell
  },
  {
    title: "体验打磨",
    description: "主题切换、动态背景、统一的视觉语言，用起来舒服。",
    points: ["主题与图标定制", "动态背景", "细节动效"],
    icon: Wand2
  }
];

const workflow: Workflow[] = [
  {
    title: "记录班次",
    description: "团队成员在统一空间记录班次，信息实时同步。",
    icon: RefreshCcw
  },
  {
    title: "AI 辅助",
    description: "遇到班次冲突或复杂排班，AI 助手快速给出调度建议。",
    icon: Route
  },
  {
    title: "数据复盘",
    description: "可视化洞察工作节奏，持续优化下一个周期的排班。",
    icon: Repeat
  }
];

const scenarios: Scenario[] = [
  {
    title: "一线轮班团队",
    description: "门店、服务、运营值班等高频轮班场景，统一看板，快速协同。",
    emoji: "🏪"
  },
  {
    title: "中小型组织",
    description: "多人协同排班与可见性管理，减少群聊沟通和人工同步。",
    emoji: "🏢"
  },
  {
    title: "数据驱动的团队",
    description: "从排班记录升级到运营洞察，每一次调整都有数据依据。",
    emoji: "📊"
  }
];

const testimonials: Testimonial[] = [
  {
    name: "林店长",
    role: "门店店长",
    teamType: "连锁零售",
    quote: "以前临时调班最怕群消息漏看，现在大家都在同一个页面看班次，交接顺很多。",
    highlights: ["新人两天就能上手", "早晚班交接更清楚", "请假后补位提醒很及时"],
    rating: 4.9,
    avatarSeed: "lin"
  },
  {
    name: "周主管",
    role: "客服主管",
    teamType: "客服中心",
    quote: "最直接的感受是沟通量降下来了，谁在岗、谁休息，一眼就能确认。",
    highlights: ["每周排班更新时间缩短", "班次冲突少很多"],
    rating: 4.8,
    avatarSeed: "zhou"
  },
  {
    name: "陈排班员",
    role: "排班专员",
    teamType: "运营团队",
    quote: "我最喜欢它的可读性，调整记录都能看到，不用担心版本混乱。",
    highlights: ["历史调整可追溯", "少了手工对表的工作", "复盘时更容易定位问题"],
    rating: 5.0,
    avatarSeed: "chen"
  },
  {
    name: "黄值班长",
    role: "值班负责人",
    teamType: "本地生活服务",
    quote: "以前换班要私聊确认好多次，现在成员自己就能看清楚，管理负担轻了。",
    highlights: ["换班确认更快", "值班缺口能提前发现"],
    rating: 4.9,
    avatarSeed: "huang"
  },
  {
    name: "赵运营",
    role: "运营经理",
    teamType: "中小团队",
    quote: "上手门槛低是关键，团队里不常用复杂系统的人也能很快跟上。",
    highlights: ["培训成本很低", "跨组协同不再反复确认", "班前提醒更安心"],
    rating: 4.8,
    avatarSeed: "zhao"
  },
  {
    name: "吴班组长",
    role: "班组长",
    teamType: "门店运营",
    quote: "班次展示很直观，我每天晨会前看一眼就知道今天怎么安排。",
    highlights: ["晨会准备时间更短", "调班通知更统一"],
    rating: 4.9,
    avatarSeed: "wu"
  },
  {
    name: "李协调员",
    role: "协调员",
    teamType: "区域支持",
    quote: "最明显的是不再靠表格反复传来传去，统一看板真的省心。",
    highlights: ["版本混乱问题消失", "异地协作更顺畅", "信息同步延迟更少"],
    rating: 4.9,
    avatarSeed: "li"
  },
  {
    name: "唐负责人",
    role: "团队负责人",
    teamType: "服务运营",
    quote: "它不是功能堆叠那种复杂工具，而是把每天要做的排班事做得更顺手。",
    highlights: ["日常使用压力小", "成员反馈更积极"],
    rating: 4.8,
    avatarSeed: "tang"
  }
];

const downloadEntrances = [
  {
    kicker: "Download on the",
    title: "App Store",
    subtitle: "从 App Store 下载",
    symbol: "",
    badge: "iOS",
    glow: "bg-gradient-to-br from-sky-50 via-white to-sky-100/80",
    href: "https://apps.apple.com/cn/app/peraltime/id6758415243"
  },
  {
    kicker: "GET IT ON",
    title: "Google Play",
    subtitle: "到 Google Play 获取",
    symbol: "▶",
    badge: "Android",
    glow: "bg-gradient-to-br from-emerald-50 via-white to-emerald-100/80",
    href: "https://play.google.com/store"
  },
  {
    kicker: "DOWNLOAD ON",
    title: "HUAWEI AppGallery",
    subtitle: "在华为应用市场下载",
    symbol: "鸿",
    badge: "HarmonyOS",
    glow: "bg-gradient-to-br from-amber-50 via-white to-orange-100/80",
    href: "https://appgallery.huawei.com/"
  }
];

const subtle = {
  hidden: { opacity: 0, y: 8 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay, ease: "easeOut" as const }
  })
};

const avatarStyles = [
  "from-amber-100 to-amber-200 text-amber-900",
  "from-sky-100 to-sky-200 text-sky-900",
  "from-violet-100 to-violet-200 text-violet-900",
  "from-emerald-100 to-emerald-200 text-emerald-900"
];

const getAvatarStyle = (seed: string) => {
  const index = seed.charCodeAt(0) % avatarStyles.length;
  return avatarStyles[index];
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const riseIn = shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 };
  const riseOut = { opacity: 1, y: 0 };
  const liftHover = shouldReduceMotion ? undefined : { y: -4, scale: 1.01 };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-[0.22]"
          style={{
            backgroundImage: "radial-gradient(rgba(148,163,184,0.35) 1px, transparent 1px)",
            backgroundSize: "24px 24px"
          }}
          animate={shouldReduceMotion ? undefined : { x: [0, 12, 0], y: [0, 18, 0] }}
          transition={shouldReduceMotion ? undefined : { duration: 24, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute left-1/2 top-[-45%] h-[140vh] w-[140vh] -translate-x-1/2 rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(251,191,36,0.22), rgba(56,189,248,0.2), rgba(167,139,250,0.2), rgba(251,191,36,0.22))"
          }}
          animate={shouldReduceMotion ? undefined : { rotate: [0, 360] }}
          transition={shouldReduceMotion ? undefined : { duration: 48, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -top-20 left-[-8%] h-72 w-72 rounded-full bg-amber-200/35 blur-3xl"
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 18, 0], y: [0, -14, 0], scale: [1, 1.04, 1] }
          }
          transition={
            shouldReduceMotion ? undefined : { duration: 16, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute top-36 right-[-10%] h-80 w-80 rounded-full bg-sky-200/30 blur-3xl"
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, -20, 0], y: [0, 16, 0], scale: [1, 1.06, 1] }
          }
          transition={
            shouldReduceMotion ? undefined : { duration: 18, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute -bottom-28 left-1/2 h-80 w-[130%] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-200/35 via-sky-200/30 to-amber-200/35 blur-3xl"
          animate={
            shouldReduceMotion
              ? undefined
              : { x: [0, 24, 0], scaleX: [1, 1.04, 1], opacity: [0.5, 0.75, 0.5] }
          }
          transition={
            shouldReduceMotion ? undefined : { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-neutral-200/60 py-3"
          : "bg-transparent py-5"
          }`}
      >
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <span className="font-display text-lg font-semibold text-neutral-900">
              PeralTime
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center">
            <a
              href="#cta"
              className="flex h-9 items-center justify-center gap-1.5 rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
            >
              立即体验
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            className="md:hidden text-neutral-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.25, ease: "easeOut" }}
            className="absolute top-full left-0 right-0 border-b border-neutral-200 bg-white px-6 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base text-neutral-600 hover:text-neutral-900"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 flex w-full items-center justify-center rounded-lg bg-neutral-900 px-5 py-3 text-sm font-medium text-white"
              >
                立即体验
              </a>
            </nav>
          </motion.div>
        )}
      </header>

      <main className="pt-28 pb-20">
        {/* HERO */}
        <section className="mx-auto w-full max-w-5xl px-6 pt-12 pb-24">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
          >
            <motion.div
              initial={riseIn}
              animate={riseOut}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.08 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-3 py-1 text-sm text-neutral-500"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              排班管理 · 团队协同 · 数据洞察
            </motion.div>

            <h1 className="font-display text-4xl font-bold text-neutral-900 sm:text-5xl md:text-6xl leading-[1.15] max-w-3xl">
              排班这件事，
              <br />
              可以更<span className="underline decoration-amber-400 decoration-[3px] underline-offset-4">简单</span>。
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-neutral-500 md:text-lg md:leading-relaxed">
              PeralTime 把排班记录、团队协同、AI 助手和数据洞察放在一起，
              让你少花时间在排班上，多花时间在重要的事上。
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start gap-3">
              <motion.a
                href="#cta"
                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.02 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                className="flex items-center justify-center gap-2 rounded-lg bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
              >
                开始使用
                <ArrowRight className="h-4 w-4" />
              </motion.a>
              <motion.a
                href="#features"
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                className="flex items-center justify-center rounded-lg border border-neutral-200 bg-white px-6 py-3 text-sm font-medium text-neutral-700 transition-colors hover:border-neutral-300 hover:bg-neutral-50"
              >
                看看有什么
              </motion.a>
            </div>
          </motion.div>
        </section>

        {/* FEATURES */}
        <section id="features" className="mx-auto w-full max-w-5xl px-6 py-20">
          <motion.div
            initial={riseIn}
            whileInView={riseOut}
            viewport={{ once: true, margin: "-80px" }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              功能一览
            </h2>
            <p className="mt-2 text-base text-neutral-400">
              六个方面，覆盖排班全流程。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-px bg-neutral-200/70 rounded-2xl overflow-hidden md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={riseIn}
                whileInView={riseOut}
                viewport={{ once: true, margin: "-40px" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.4, delay: index * 0.05 }
                }
                whileHover={liftHover}
                className="bg-white p-7 hover:bg-neutral-50/80 transition-colors"
              >
                <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-600">
                  <feature.icon className="h-[18px] w-[18px]" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-neutral-900">{feature.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-neutral-500">
                  {feature.description}
                </p>
                <ul className="space-y-1.5">
                  {feature.points.map((point) => (
                    <li key={point} className="flex items-center text-sm text-neutral-500">
                      <Check className="mr-2 h-3.5 w-3.5 text-neutral-400 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="testimonials" className="mx-auto w-full max-w-5xl px-6 py-20">
          <motion.div
            initial={riseIn}
            whileInView={riseOut}
            viewport={{ once: true, margin: "-60px" }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
            className="mb-8"
          >
            <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              他们怎么说
            </h2>
            <p className="mt-2 text-base text-neutral-400">
              更快上手、更少沟通成本、更顺畅的排班协作体验。
            </p>
          </motion.div>

          <p className="mb-6 text-xs text-neutral-400">
            以下为模拟用户反馈，用于展示场景。
          </p>

          <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
            {testimonials.map((item, index) => (
              <motion.article
                key={`${item.name}-${item.role}`}
                initial={riseIn}
                whileInView={riseOut}
                viewport={{ once: true, margin: "-40px" }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.45, delay: Math.min(index * 0.05, 0.3) }
                }
                whileHover={liftHover}
                className="mb-4 break-inside-avoid rounded-2xl border border-neutral-200/80 bg-white p-5 shadow-[0_12px_30px_-24px_rgba(17,24,39,0.45)] transition-shadow hover:shadow-[0_16px_36px_-20px_rgba(17,24,39,0.5)]"
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm font-semibold ${getAvatarStyle(item.avatarSeed)}`}
                    >
                      {item.name.slice(0, 1)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">{item.name}</p>
                      <p className="text-xs text-neutral-500">
                        {item.role} · {item.teamType}
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1 rounded-full border border-amber-100 bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    {item.rating.toFixed(1)}
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-neutral-600">“{item.quote}”</p>

                <ul className="mt-4 space-y-1.5">
                  {item.highlights.map((point) => (
                    <li key={point} className="flex items-center text-xs text-neutral-500">
                      <Check className="mr-2 h-3.5 w-3.5 shrink-0 text-neutral-400" />
                      {point}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        {/* WORKFLOW */}
        <section id="workflow" className="mx-auto w-full max-w-5xl px-6 py-20">
          <motion.div
            initial={riseIn}
            whileInView={riseOut}
            viewport={{ once: true }}
            className="mb-12"
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
          >
            <h2 className="font-display text-2xl font-bold text-neutral-900 md:text-3xl">
              怎么用？
            </h2>
            <p className="mt-2 text-base text-neutral-400">
              三步，从记录到优化。
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {workflow.map((item, index) => (
              <motion.div
                key={item.title}
                variants={subtle}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                custom={index * 0.08}
                whileHover={liftHover}
                className="rounded-2xl border border-neutral-200 bg-white p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-900 text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <item.icon className="h-4 w-4 text-neutral-400" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-neutral-900">{item.title}</h3>
                <p className="text-sm leading-relaxed text-neutral-500">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* SCENARIOS */}
        <section id="scenarios" className="mx-auto w-full max-w-5xl px-6 py-20">
          <div className="rounded-2xl bg-neutral-900 p-8 md:p-14">
            <motion.div
              initial={riseIn}
              whileInView={riseOut}
              viewport={{ once: true }}
              className="mb-10"
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5 }}
            >
              <h2 className="font-display text-2xl font-bold text-white md:text-3xl">
                适合哪些团队？
              </h2>
              <p className="mt-2 text-base text-neutral-400">
                不同规模、不同行业，同一个工具。
              </p>
            </motion.div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {scenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.title}
                  variants={subtle}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  custom={index * 0.08}
                  whileHover={liftHover}
                  className="rounded-xl bg-white/[0.06] border border-white/[0.08] p-6 transition-colors hover:bg-white/[0.1]"
                >
                  <span className="text-2xl mb-3 block">{scenario.emoji}</span>
                  <h3 className="mb-2 text-base font-semibold text-white">{scenario.title}</h3>
                  <p className="text-sm leading-relaxed text-neutral-400">
                    {scenario.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="cta" className="mx-auto w-full max-w-5xl px-6 pb-10">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200/80 bg-gradient-to-br from-white via-neutral-50 to-white p-5 shadow-[0_24px_60px_-36px_rgba(17,24,39,0.45)]">
            <div aria-hidden className="pointer-events-none absolute -top-16 right-8 h-32 w-32 rounded-full bg-sky-100/70 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-14 left-4 h-28 w-28 rounded-full bg-amber-100/70 blur-3xl" />
            <p className="relative mb-4 text-sm font-medium text-neutral-500">下载入口</p>
            <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-3">
              {downloadEntrances.map((entry) => (
                <a
                  key={entry.title}
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative isolate overflow-hidden rounded-2xl border border-neutral-200/80 bg-white px-4 py-3 text-left text-neutral-900 shadow-[0_12px_24px_-20px_rgba(17,24,39,0.4)] transition-all hover:-translate-y-1 hover:border-neutral-300 hover:shadow-[0_20px_28px_-18px_rgba(17,24,39,0.45)]"
                >
                  <span aria-hidden className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${entry.glow}`} />
                  <span className="relative flex min-h-[76px] items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-neutral-200 bg-white text-base font-semibold text-neutral-700 shadow-[0_6px_12px_-8px_rgba(17,24,39,0.35)]">
                      {entry.symbol}
                    </span>
                    <span className="flex flex-col leading-none">
                      <span className="text-[11px] uppercase tracking-wide text-neutral-500">
                        {entry.kicker}
                      </span>
                      <span className="mt-1 text-base font-semibold text-neutral-900">{entry.title}</span>
                      <span className="mt-1 text-[11px] text-neutral-500">{entry.subtitle}</span>
                    </span>
                    <span className="ml-auto inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-[10px] font-medium text-neutral-600">
                      {entry.badge}
                    </span>
                    <ArrowRight className="h-4 w-4 text-neutral-400 transition-all group-hover:translate-x-0.5 group-hover:text-neutral-700" />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 py-10 text-center text-sm text-neutral-400">
        <p>&copy; {new Date().getFullYear()} PeralTime</p>
      </footer>
    </div>
  );
}
