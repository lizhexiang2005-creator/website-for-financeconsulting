import {
  ArrowDownRight,
  ArrowUpRight,
  CandlestickChart,
  ChartColumnIncreasing,
  CircleGauge,
  Flame,
  LayoutGrid,
  Star,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const indexCards = [
  { name: "上证指数", code: "000001", value: "3,128.42", change: "+0.68%", positive: true },
  { name: "深证成指", code: "399001", value: "9,842.17", change: "+1.12%", positive: true },
  { name: "创业板指", code: "399006", value: "1,924.53", change: "-0.24%", positive: false },
];

const movers = [
  { name: "贵州茅台", code: "600519", price: "¥1,678.00", change: "+0.86%", positive: true },
  { name: "宁德时代", code: "300750", price: "¥202.35", change: "+1.93%", positive: true },
  { name: "比亚迪", code: "002594", price: "¥248.60", change: "-0.37%", positive: false },
  { name: "中国平安", code: "601318", price: "¥44.28", change: "+0.59%", positive: true },
  { name: "中际旭创", code: "300308", price: "¥141.76", change: "+3.22%", positive: true },
];

const sectors = [
  { name: "算力硬件", heat: "强势", change: "+2.84%" },
  { name: "创新药", heat: "活跃", change: "+1.67%" },
  { name: "白酒", heat: "修复", change: "+0.73%" },
  { name: "光伏设备", heat: "震荡", change: "-0.41%" },
];

export default function MarketPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff1e7_0%,#fff7f2_45%,#fffdfb_100%)] text-[#2d1812]">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:px-10">
          <div className="rounded-[28px] border border-[#f1d3c3] bg-[linear-gradient(135deg,#fff8f3_0%,#fff2eb_100%)] p-8 shadow-[0_24px_60px_rgba(130,64,40,0.08)]">
            <p className="text-sm font-medium text-[#b44a27]">A 股行情模块</p>
            <h1 className="mt-3 text-4xl font-semibold text-[#341812]">聚焦中国市场的股票行情看板</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#7c564d]">
              这一页只面向 A 股用户，先把核心行情结构搭起来。后续接入真实数据源后，可以继续补分时、盘口、自选股和板块轮动。
            </p>
          </div>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="grid gap-5 md:grid-cols-3">
              {indexCards.map((item) => (
                <article
                  key={item.code}
                  className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-[#8d5f53]">{item.name}</p>
                      <p className="mt-1 text-xs tracking-[0.2em] text-[#c89a88]">{item.code}</p>
                    </div>
                    <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                      <CircleGauge size={20} aria-hidden="true" />
                    </div>
                  </div>
                  <p className="mt-6 text-3xl font-semibold text-[#341812]">{item.value}</p>
                  <p
                    className={`mt-2 inline-flex items-center gap-1 text-sm font-semibold ${
                      item.positive ? "text-[#c84f2a]" : "text-[#b33b32]"
                    }`}
                  >
                    {item.positive ? <ArrowUpRight size={16} aria-hidden="true" /> : <ArrowDownRight size={16} aria-hidden="true" />}
                    {item.change}
                  </p>
                </article>
              ))}
            </div>

            <aside className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                  <Star size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#341812]">自选股占位</h2>
                  <p className="text-sm text-[#8d5f53]">后续绑定用户账户和自选列表</p>
                </div>
              </div>
              <div className="mt-5 space-y-3">
                {["600519 贵州茅台", "300750 宁德时代", "002594 比亚迪"].map((item) => (
                  <div key={item} className="rounded-md bg-[#fffaf7] px-4 py-3 text-sm text-[#6d4a42]">
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <div className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-[#341812]">热门个股</h2>
                  <p className="mt-1 text-sm text-[#8d5f53]">先展示 A 股核心标的与涨跌幅占位</p>
                </div>
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                  <CandlestickChart size={20} aria-hidden="true" />
                </div>
              </div>

              <div className="mt-6 overflow-hidden rounded-lg border border-[#f3ddd2]">
                <div className="grid grid-cols-[minmax(0,1.2fr)_92px_110px_92px] bg-[#fff4ee] px-4 py-3 text-xs font-semibold tracking-[0.16em] text-[#9e7163]">
                  <span>名称</span>
                  <span>代码</span>
                  <span>最新价</span>
                  <span>涨跌幅</span>
                </div>
                {movers.map((item) => (
                  <div
                    key={item.code}
                    className="grid grid-cols-[minmax(0,1.2fr)_92px_110px_92px] items-center border-t border-[#f7e6dd] px-4 py-4 text-sm"
                  >
                    <span className="font-semibold text-[#341812]">{item.name}</span>
                    <span className="text-[#8d5f53]">{item.code}</span>
                    <span className="text-[#341812]">{item.price}</span>
                    <span className={item.positive ? "font-semibold text-[#c84f2a]" : "font-semibold text-[#b33b32]"}>
                      {item.change}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="space-y-5">
              <div className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                    <LayoutGrid size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-[#341812]">板块热度</h2>
                    <p className="text-sm text-[#8d5f53]">观察资金偏好和风格轮动</p>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  {sectors.map((item) => (
                    <div key={item.name} className="rounded-md bg-[#fffaf7] px-4 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium text-[#341812]">{item.name}</span>
                        <span className="text-sm font-semibold text-[#c84f2a]">{item.change}</span>
                      </div>
                      <p className="mt-1 text-sm text-[#8d5f53]">{item.heat}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[#d06a46] bg-[linear-gradient(180deg,#d65f36_0%,#b94728_100%)] p-6 text-white shadow-[0_24px_50px_rgba(186,76,41,0.25)]">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[rgba(255,255,255,0.16)] text-white">
                    <Flame size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold">后续可扩展</h2>
                    <p className="text-sm text-[#ffe3d8]">行情页后面很适合做深</p>
                  </div>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-7 text-[#ffe8df]">
                  <li>接入沪深京三市真实行情数据</li>
                  <li>增加分时、日 K、周 K、月 K 视图</li>
                  <li>接入自选股和涨跌分布统计</li>
                </ul>
              </div>
            </aside>
          </section>

          <section className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                <ChartColumnIncreasing size={20} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#341812]">行情页下一步建议</h2>
                <p className="text-sm text-[#8d5f53]">先有结构，再接数据源和筛选能力</p>
              </div>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {[
                "接 A 股实时行情接口",
                "加入指数与板块筛选",
                "把行情页与首页分析入口打通",
              ].map((item) => (
                <div key={item} className="rounded-md bg-[#fffaf7] px-4 py-4 text-sm text-[#6d4a42]">
                  {item}
                </div>
              ))}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
