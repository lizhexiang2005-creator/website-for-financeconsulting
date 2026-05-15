import { CalendarDays, Newspaper, Radar, Rss } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const sections = [
  {
    title: "市场快讯",
    description: "放盘中异动、政策消息和突发新闻，后续接多来源聚合。",
    icon: Radar,
  },
  {
    title: "公司公告",
    description: "放财报、分红、回购、管理层变动和监管公告。",
    icon: Newspaper,
  },
  {
    title: "来源管理",
    description: "后续接入网页来源、更新时间、抓取状态和人工审核入口。",
    icon: Rss,
  },
];

export default function NewsPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff1e7_0%,#fff7f2_45%,#fffdfb_100%)] text-[#2d1812]">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
          <div className="rounded-[28px] border border-[#f1d3c3] bg-[linear-gradient(135deg,#fff8f3_0%,#fff2eb_100%)] p-8 shadow-[0_24px_60px_rgba(130,64,40,0.08)]">
            <p className="text-sm font-medium text-[#b44a27]">资讯模块框架</p>
            <h1 className="mt-3 text-4xl font-semibold text-[#341812]">财经资讯与公司动态</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#7c564d]">
              这一页先把产品结构搭起来，后续接入新闻源、公告源和抓取任务之后，就能在这里沉淀成统一的信息流。
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {sections.map((section) => {
              const Icon = section.icon;

              return (
                <article
                  key={section.title}
                  className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-[#341812]">{section.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#6d4a42]">{section.description}</p>
                </article>
              );
            })}
          </div>

          <section className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                <CalendarDays size={20} aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-[#341812]">内容区占位</h2>
                <p className="text-sm text-[#8d5f53]">后续在这里接资讯列表、筛选和来源标签</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {["宏观要闻占位", "行业观察占位", "公司公告占位"].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-dashed border-[#efc8b6] bg-[#fffaf7] px-5 py-4 text-sm text-[#7c564d]"
                >
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
