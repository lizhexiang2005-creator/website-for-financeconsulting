import { KeyRound, Phone, ShieldCheck, UserRound } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

const accountCards = [
  {
    title: "手机号注册",
    description: "第一版建议使用短信验证码注册和登录，统一承接社区和功能记录。",
    icon: Phone,
  },
  {
    title: "账户资料",
    description: "放昵称、头像、注册时间、账户状态和风险提示设置。",
    icon: UserRound,
  },
  {
    title: "登录安全",
    description: "短信验证码、频率限制、设备会话和异常登录提醒。",
    icon: ShieldCheck,
  },
];

export default function AccountPage() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[radial-gradient(circle_at_top,#fff1e7_0%,#fff7f2_45%,#fffdfb_100%)] text-[#2d1812]">
        <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 py-8 sm:px-8 lg:px-10">
          <div className="rounded-[28px] border border-[#f1d3c3] bg-[linear-gradient(135deg,#fff8f3_0%,#fff2eb_100%)] p-8 shadow-[0_24px_60px_rgba(130,64,40,0.08)]">
            <p className="text-sm font-medium text-[#b44a27]">用户模块框架</p>
            <h1 className="mt-3 text-4xl font-semibold text-[#341812]">账户中心与手机号体系</h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-[#7c564d]">
              这一页会承接手机号注册、登录态、账户资料和功能使用记录。等数据库接通后，就能把分析记录和社区身份都归到同一个用户体系里。
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {accountCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]"
                >
                  <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <h2 className="mt-4 text-xl font-semibold text-[#341812]">{card.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-[#6d4a42]">{card.description}</p>
                </article>
              );
            })}
          </div>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
              <h2 className="text-xl font-semibold text-[#341812]">登录流程占位</h2>
              <div className="mt-6 grid gap-4">
                <div className="rounded-md border border-[#f0d1c3] bg-[#fffaf7] px-4 py-3 text-sm text-[#7c564d]">
                  手机号输入框
                </div>
                <div className="rounded-md border border-[#f0d1c3] bg-[#fffaf7] px-4 py-3 text-sm text-[#7c564d]">
                  短信验证码输入框
                </div>
                <button className="rounded-lg bg-[#c84f2a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b24322]">
                  获取验证码
                </button>
              </div>
            </div>

            <aside className="rounded-lg border border-[#f1d3c3] bg-white p-6 shadow-[0_18px_40px_rgba(130,64,40,0.07)]">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-[#fff0e7] text-[#c84f2a]">
                  <KeyRound size={20} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#341812]">后续接入重点</h2>
                  <p className="text-sm text-[#8d5f53]">手机号是全站身份主键</p>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-sm leading-7 text-[#6d4a42]">
                <li className="rounded-md bg-[#fffaf7] px-4 py-3">短信验证码过期机制</li>
                <li className="rounded-md bg-[#fffaf7] px-4 py-3">发送频率限制</li>
                <li className="rounded-md bg-[#fffaf7] px-4 py-3">分析记录与账户绑定</li>
              </ul>
            </aside>
          </section>
        </section>
      </main>
    </>
  );
}
