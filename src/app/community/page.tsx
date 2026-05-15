import { CircleUserRound, MessageCircleMore, PenSquare, ShieldAlert } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const posts = [
  {
    title: "如何看待公司的现金流质量",
    author: "用户甲",
    excerpt: "这里后续可以展示用户对财务指标的解读、投资框架和讨论串。",
  },
  {
    title: "财报发布前应该先看哪些信号",
    author: "用户乙",
    excerpt: "这块会承接发帖、评论、点赞和收藏，当前先把社区骨架立住。",
  },
];

export default function CommunityPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff1e7_0%,#fff7f2_45%,#fffdfb_100%)] text-[#2d1812]">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-[28px] border border-[#f1d3c3] bg-[linear-gradient(135deg,#fff8f3_0%,#fff2eb_100%)] p-8 shadow-[0_24px_60px_rgba(130,64,40,0.08)]">
              <p className="text-sm font-medium text-[#b44a27]">社区模块框架</p>
              <h1 className="mt-3 text-4xl font-semibold text-[#341812]">观点交流与用户讨论</h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[#7c564d]">
                社区先从帖子列表和发帖入口开始，等手机号注册和用户系统接通后，再逐步补评论、点赞、举报和审核。
              </p>
            </div>

            <aside className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                  <PenSquare size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#341812]">发帖入口占位</h2>
                  <p className="text-sm text-[#8d5f53]">后续接登录校验与发帖弹窗</p>
                </div>
              </div>
              <button className="mt-6 w-full rounded-lg bg-[#c84f2a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b24322]">
                发布帖子
              </button>
            </aside>
          </div>

          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            <section className="space-y-4">
              {posts.map((post) => (
                <article
                  key={post.title}
                  className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]"
                >
                  <div className="flex items-center gap-2 text-sm text-[#8d5f53]">
                    <CircleUserRound size={16} aria-hidden="true" />
                    <span>{post.author}</span>
                  </div>
                  <h2 className="mt-3 text-xl font-semibold text-[#341812]">{post.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#6d4a42]">{post.excerpt}</p>
                  <div className="mt-5 flex items-center gap-4 text-sm text-[#8d5f53]">
                    <span className="inline-flex items-center gap-1">
                      <MessageCircleMore size={15} aria-hidden="true" />
                      评论区占位
                    </span>
                  </div>
                </article>
              ))}
            </section>

            <aside className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0ed] text-[#b33b32]">
                  <ShieldAlert size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#341812]">治理提醒</h2>
                  <p className="text-sm text-[#8d5f53]">社区上线前必须补内容审核和举报链路</p>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#6d4a42]">
                <li className="rounded-md bg-[#fffaf7] px-4 py-3">敏感内容识别</li>
                <li className="rounded-md bg-[#fffaf7] px-4 py-3">违规帖子下架</li>
                <li className="rounded-md bg-[#fffaf7] px-4 py-3">用户封禁与申诉</li>
              </ul>
            </aside>
          </div>
        </section>
      </main>
    </>
  );
}
