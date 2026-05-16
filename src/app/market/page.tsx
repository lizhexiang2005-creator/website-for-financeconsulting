import { Search, Settings2, Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

type IndexCard = {
  name: string;
  code: string;
  value: string;
  delta: string;
  percent: string;
  positive: boolean;
  points: string;
};

type WatchStock = {
  name: string;
  code: string;
  tags: string[];
  price: string;
  delta: string;
  percent: string;
  positive: boolean;
};

const majorIndices: IndexCard[] = [
  {
    name: "上证指数",
    code: "000001",
    value: "3,128.42",
    delta: "+21.18",
    percent: "+0.68%",
    positive: true,
    points: "6,66 28,74 48,81 70,76 92,58 114,63 136,46 158,38 180,44 202,32 224,36 246,24 268,28 290,18",
  },
  {
    name: "深证成指",
    code: "399001",
    value: "9,842.17",
    delta: "+108.94",
    percent: "+1.12%",
    positive: true,
    points: "6,72 28,76 48,70 70,54 92,60 114,42 136,38 158,46 180,30 202,36 224,24 246,28 268,18 290,14",
  },
  {
    name: "创业板指",
    code: "399006",
    value: "1,924.53",
    delta: "-4.58",
    percent: "-0.24%",
    positive: false,
    points: "6,26 28,30 48,22 70,28 92,20 114,34 136,38 158,54 180,48 202,62 224,58 246,70 268,66 290,76",
  },
  {
    name: "科创50",
    code: "000688",
    value: "742.16",
    delta: "+5.74",
    percent: "+0.78%",
    positive: true,
    points: "6,68 28,62 48,58 70,48 92,54 114,44 136,34 158,36 180,22 202,30 224,20 246,26 268,14 290,18",
  },
];

const watchTabs = ["自选", "持仓", "ETF", "港美股"];

const watchlist: WatchStock[] = [
  { name: "贵州茅台", code: "600519", tags: ["白酒"], price: "1,678.00", delta: "+14.35", percent: "+0.86%", positive: true },
  { name: "宁德时代", code: "300750", tags: ["新能源", "两融"], price: "202.35", delta: "+3.84", percent: "+1.93%", positive: true },
  { name: "比亚迪", code: "002594", tags: ["汽车"], price: "248.60", delta: "-0.92", percent: "-0.37%", positive: false },
  { name: "中国平安", code: "601318", tags: ["保险"], price: "44.28", delta: "+0.26", percent: "+0.59%", positive: true },
  { name: "中际旭创", code: "300308", tags: ["算力", "热点"], price: "141.76", delta: "+4.42", percent: "+3.22%", positive: true },
  { name: "恒瑞医药", code: "600276", tags: ["创新药"], price: "51.84", delta: "+1.06", percent: "+2.09%", positive: true },
  { name: "广汇物流", code: "600603", tags: ["物流"], price: "5.61", delta: "-0.01", percent: "-0.18%", positive: false },
];

function Sparkline({ points, positive }: { points: string; positive: boolean }) {
  return (
    <svg viewBox="0 0 296 88" className="h-24 w-full">
      <defs>
        <linearGradient id={`fill-${positive ? "up" : "down"}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={positive ? "#e2614d" : "#59a86d"} stopOpacity="0.18" />
          <stop offset="100%" stopColor={positive ? "#e2614d" : "#59a86d"} stopOpacity="0.02" />
        </linearGradient>
      </defs>
      <line x1="0" y1="44" x2="296" y2="44" stroke="#eceff3" strokeDasharray="4 5" />
      <polyline
        points={`0,88 ${points} 296,88`}
        fill={`url(#fill-${positive ? "up" : "down"})`}
        stroke="none"
      />
      <polyline
        points={points}
        fill="none"
        stroke={positive ? "#df5b48" : "#58a86d"}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MarketPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[linear-gradient(180deg,#f7f2ee_0%,#f5f6f8_22%,#eef2f5_100%)] text-[#1f2632]">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#d05a42]">Market</p>
              <h1 className="mt-2 text-3xl font-semibold text-[#261f1c] sm:text-4xl">主要股指</h1>
            </div>
            <div className="hidden items-center gap-2 rounded-full border border-[#e9ddd6] bg-white px-4 py-2 text-sm text-[#6a707a] shadow-[0_10px_24px_rgba(29,35,46,0.04)] sm:flex">
              <Search size={16} />
              搜索代码 / 名称
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {majorIndices.map((item) => {
              const tone = item.positive ? "text-[#df5b48]" : "text-[#58a86d]";

              return (
                <article
                  key={item.code}
                  className="rounded-[28px] border border-[#eadfda] bg-white p-5 shadow-[0_20px_50px_rgba(29,35,46,0.06)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-[#232a35]">{item.name}</p>
                      <p className="mt-1 text-xs tracking-[0.18em] text-[#9aa1ad]">{item.code}</p>
                    </div>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        item.positive ? "bg-[#fff0ea] text-[#df5b48]" : "bg-[#edf8f0] text-[#58a86d]"
                      }`}
                    >
                      {item.percent}
                    </span>
                  </div>

                  <div className="mt-5 flex items-end justify-between gap-4">
                    <p className="text-3xl font-semibold text-[#232a35]">{item.value}</p>
                    <p className={`text-sm font-medium ${tone}`}>{item.delta}</p>
                  </div>

                  <div className="mt-4">
                    <Sparkline points={item.points} positive={item.positive} />
                  </div>
                </article>
              );
            })}
          </section>

          <section className="overflow-hidden rounded-[30px] border border-[#eadfda] bg-white shadow-[0_24px_60px_rgba(29,35,46,0.08)]">
            <div className="flex items-center justify-between gap-4 border-b border-[#f0efee] px-4 py-4 sm:px-6">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-[#fff0e8] text-[#df5b48]">
                  <Star size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#232a35]">我的自选股</h2>
                  <p className="text-sm text-[#7a818c]">跟踪你真正关心的公司</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#7a818c]">
                <button
                  type="button"
                  className="rounded-full border border-[#ece6e1] bg-[#faf8f6] px-3 py-2 text-sm font-medium transition hover:bg-white"
                >
                  管理分组
                </button>
                <button
                  type="button"
                  className="rounded-full border border-[#ece6e1] bg-[#faf8f6] p-2 transition hover:bg-white"
                  aria-label="自选设置"
                >
                  <Settings2 size={18} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto px-4 pt-4 sm:px-6">
              <div className="flex min-w-max items-center gap-7 text-lg text-[#313744]">
                {watchTabs.map((item, index) => (
                  <div key={item} className="relative shrink-0 pb-4">
                    <span className={index === 0 ? "font-semibold text-[#df5b48]" : ""}>{item}</span>
                    {index === 0 ? <div className="absolute bottom-0 left-0 h-[3px] w-9 rounded-full bg-[#df5b48]" /> : null}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-[minmax(0,1.2fr)_110px_110px_110px] border-y border-[#f2f2f2] px-4 py-3 text-sm text-[#949aa6] sm:px-6">
              <div>股票</div>
              <div className="text-center">最新</div>
              <div className="text-center">涨跌</div>
              <div className="text-center">涨幅</div>
            </div>

            <div>
              {watchlist.map((stock) => {
                const toneClass = stock.positive ? "text-[#df5b48]" : "text-[#58a86d]";

                return (
                  <div
                    key={`${stock.code}-${stock.name}`}
                    className="grid grid-cols-[minmax(0,1.2fr)_110px_110px_110px] items-center border-b border-[#f4f4f4] px-4 py-4 sm:px-6"
                  >
                    <div className="min-w-0 pr-3">
                      <p className="truncate text-xl font-semibold text-[#1f2430]">{stock.name}</p>
                      <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-[#8f96a3]">
                        <span>{stock.code}</span>
                        {stock.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-[4px] border border-[#d8dde6] bg-[#f7f8fb] px-[6px] py-[1px] text-[10px] leading-none text-[#7d8592]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`text-center text-2xl font-medium ${toneClass}`}>{stock.price}</div>
                    <div className={`text-center text-2xl font-medium ${toneClass}`}>{stock.delta}</div>
                    <div className={`text-center text-2xl font-medium ${toneClass}`}>{stock.percent}</div>
                  </div>
                );
              })}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
