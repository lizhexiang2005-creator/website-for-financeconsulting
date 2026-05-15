"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState, useSyncExternalStore } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Database,
  FileText,
  LineChart,
  Loader2,
  MonitorPlay,
  MessageSquareText,
  Search,
  Sparkles,
  TrendingUp,
  UserRound,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { buildReport, type Report } from "@/lib/report-data";

const roadmapCards = [
  {
    href: "/market",
    icon: MonitorPlay,
    title: "A股行情",
    description: "查看指数、热门个股和行业板块，先服务中国市场用户。",
  },
  {
    href: "/news",
    icon: FileText,
    title: "资讯框架",
    description: "汇总财经快讯、行业动态与公司公告，先做来源位与列表结构。",
  },
  {
    href: "/community",
    icon: MessageSquareText,
    title: "社区广场",
    description: "承接用户发帖、讨论与观点互动，当前先打好列表和发帖入口。",
  },
  {
    href: "/account",
    icon: UserRound,
    title: "用户中心",
    description: "围绕手机号注册、功能使用记录与账户信息展开。",
  },
];

export function HomeDashboard() {
  const [ticker, setTicker] = useState("600519");
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );
  const [report, setReport] = useState<Report>(() => buildReport("600519"));

  const isPositive = useMemo(() => report.change.startsWith("+"), [report.change]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedTicker = ticker.trim().toUpperCase();

    if (!normalizedTicker) {
      return;
    }

    setIsLoading(true);
    window.setTimeout(() => {
      setReport(buildReport(normalizedTicker));
      setIsLoading(false);
    }, 650);
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff1e7_0%,#fff7f2_45%,#fffdfb_100%)] text-[#2d1812]">
      <section className="border-b border-[#f1d3c3] bg-[linear-gradient(180deg,#fff8f3_0%,#fff4ee_100%)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-3 inline-flex items-center gap-2 rounded-md bg-[#ffe9de] px-3 py-1 text-sm font-medium text-[#b44a27]">
                <Sparkles size={16} aria-hidden="true" />
                输入股票代码，生成公司分析报告
              </p>
              <h1 className="text-4xl font-semibold tracking-normal text-[#341812] sm:text-5xl">
                明辨公司价值，洞察经营真相
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#7c564d] sm:text-lg">
                首页承接最核心的分析功能，先聚焦 A 股用户场景。行情、资讯、社区和用户中心作为留存与互动模块，逐步扩展成完整产品。
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-lg border border-[#f1d3c3] bg-[linear-gradient(180deg,#fffdfa_0%,#fff5ef_100%)] p-4 shadow-[0_18px_40px_rgba(130,64,40,0.08)]"
            >
              <label htmlFor="ticker" className="text-sm font-medium text-[#603a30]">
                股票代码
              </label>
              <div className="mt-3 flex gap-2">
                <div className="relative min-w-0 flex-1">
                  <Search
                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#ad7a6e]"
                    size={18}
                    aria-hidden="true"
                  />
                  <input
                    id="ticker"
                    value={ticker}
                    onChange={(event) => setTicker(event.target.value)}
                    placeholder="例如 600519"
                    className="h-12 w-full rounded-md border border-[#ecc7b4] bg-white pl-10 pr-3 text-base font-semibold uppercase outline-none transition focus:border-[#c84f2a] focus:ring-4 focus:ring-[#ffd9ca]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-12 min-w-32 items-center justify-center gap-2 rounded-md bg-[#c84f2a] px-4 text-sm font-semibold text-white transition hover:bg-[#b24322] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={18} aria-hidden="true" />
                  ) : (
                    <ArrowRight size={18} aria-hidden="true" />
                  )}
                  生成报告
                </button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2 text-sm">
                {["600519", "300750", "002594", "601318"].map((symbol) => (
                  <button
                    key={symbol}
                    type="button"
                    onClick={() => setTicker(symbol)}
                    className="rounded-md border border-[#f0d1c3] bg-white px-3 py-1.5 font-medium text-[#6d4a42] transition hover:border-[#e2a58c] hover:text-[#b24322]"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </form>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {roadmapCards.map((card) => {
              const Icon = card.icon;

              return (
                <Link
                  key={card.href}
                  href={card.href}
                  className="rounded-lg border border-[#f1d3c3] bg-white/90 p-5 shadow-[0_14px_30px_rgba(130,64,40,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(130,64,40,0.11)]"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-[#341812]">{card.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#7c564d]">{card.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-5 px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-10">
        <div className="space-y-5">
          <div className="rounded-lg border border-[#f1d3c3] bg-white p-5 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-2xl font-semibold text-[#341812]">{report.company}</h2>
                  <span className="rounded-md bg-[#fff0e7] px-2.5 py-1 text-sm font-semibold text-[#b44a27]">
                    {report.ticker}
                  </span>
                </div>
                <p className="mt-2 flex items-center gap-2 text-sm text-[#8d5f53]">
                  <Building2 size={16} aria-hidden="true" />
                  {report.sector}
                </p>
              </div>
              <div className="sm:text-right">
                <p className="text-3xl font-semibold">{report.price}</p>
                <p
                  className={`mt-1 text-sm font-semibold ${
                    isPositive ? "text-[#c84f2a]" : "text-[#b33b32]"
                  }`}
                >
                  {report.change} 今日变化
                </p>
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <Metric label="市值" value={report.marketCap} />
              <Metric label="市盈率" value={report.pe} />
              <Metric label="营收增长" value={report.revenueGrowth} />
              <Metric label="净利率" value={report.margin} />
            </div>
          </div>

          <div className="rounded-lg border border-[#f1d3c3] bg-white p-5 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
            <div className="mb-5 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">近 6 个月价格走势</h2>
                <p className="mt-1 text-sm text-[#8d5f53]">当前为演示版数据</p>
              </div>
              <LineChart className="text-[#c84f2a]" size={24} aria-hidden="true" />
            </div>
            <div className="h-72 w-full">
              {isMounted ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={report.chart} margin={{ left: 0, right: 12, top: 8, bottom: 0 }}>
                    <defs>
                      <linearGradient id="priceFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="5%" stopColor="#d9663d" stopOpacity={0.35} />
                        <stop offset="95%" stopColor="#d9663d" stopOpacity={0.03} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#f3ddd2" vertical={false} />
                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#8d5f53" }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#8d5f53" }}
                      width={42}
                      domain={["dataMin - 8", "dataMax + 8"]}
                    />
                    <Tooltip
                      cursor={{ stroke: "#e1a48c" }}
                      contentStyle={{
                        border: "1px solid #f1d3c3",
                        borderRadius: 8,
                        boxShadow: "0 10px 30px rgb(130 64 40 / 0.08)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke="#d9663d"
                      strokeWidth={3}
                      fill="url(#priceFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full w-full rounded-md bg-[#fff0e7]" />
              )}
            </div>
          </div>

          <div className="rounded-lg border border-[#f1d3c3] bg-white p-5 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
            <h2 className="text-xl font-semibold">分析摘要</h2>
            <p className="mt-3 leading-8 text-[#6d4a42]">{report.summary}</p>
          </div>
        </div>

        <aside className="space-y-5">
          <InsightList
            title="优势信号"
            icon={<CheckCircle2 size={20} aria-hidden="true" />}
            tone="green"
            items={report.strengths}
          />
          <InsightList
            title="主要风险"
            icon={<AlertTriangle size={20} aria-hidden="true" />}
            tone="red"
            items={report.risks}
          />
          <InsightList
            title="下一步研究"
            icon={<TrendingUp size={20} aria-hidden="true" />}
            tone="amber"
            items={report.actions}
          />
          <div className="rounded-lg border border-[#f1d3c3] bg-white p-5 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                <Database size={18} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-[#8d5f53]">后续数据库底座</p>
                <p className="font-semibold text-[#341812]">用户、资讯、社区、分析记录</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-[#6d4a42]">
              当前代码库已经开始按这四条主线拆结构，下一步就可以直接接手机号注册、资讯抓取和社区发帖。
            </p>
          </div>
          <div className="rounded-lg border border-[#d06a46] bg-[linear-gradient(180deg,#d65f36_0%,#b94728_100%)] p-5 text-white shadow-[0_24px_50px_rgba(186,76,41,0.25)]">
            <div className="flex items-center gap-2 text-sm text-[#ffe3d8]">
              <Clock3 size={16} aria-hidden="true" />
              报告生成时间
            </div>
            <p className="mt-2 text-lg font-semibold">{report.generatedAt}</p>
            <p className="mt-4 text-sm leading-6 text-[#ffe8df]">
              本页面目前为产品原型，数据用于演示交互与报告结构，不构成任何投资建议。
            </p>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-[#f4ddd2] bg-[#fffaf7] p-4">
      <p className="text-sm text-[#8d5f53]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#2d1812]">{value}</p>
    </div>
  );
}

type InsightListProps = {
  title: string;
  icon: React.ReactNode;
  tone: "green" | "red" | "amber";
  items: string[];
};

function InsightList({
  title,
  icon,
  tone,
  items,
}: InsightListProps) {
  const toneClass = {
    green: "bg-[#fff0e7] text-[#c25732]",
    red: "bg-[#fff0ed] text-[#b33b32]",
    amber: "bg-[#fff2df] text-[#b4641d]",
  }[tone];

  return (
    <div className="rounded-lg border border-[#f1d3c3] bg-white p-5 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
      <div className="flex items-center gap-2">
        <span className={`flex size-8 items-center justify-center rounded-md ${toneClass}`}>
          {icon}
        </span>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li key={item} className="rounded-md bg-[#fffaf7] px-3 py-2 text-sm text-[#6d4a42]">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
