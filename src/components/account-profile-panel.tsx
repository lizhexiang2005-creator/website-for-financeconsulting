"use client";

import { useRef, useState, useTransition } from "react";
import { Bell, Camera, ChevronRight, CircleHelp, LogOut, ScanFace, ShieldCheck, UserRound, WalletCards, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { CurrentUser } from "@/lib/auth";

type AccountProfilePanelProps = {
  user: CurrentUser;
};

const quickActions = [
  { label: "头像与昵称", description: "先把个人形象补完整", icon: ScanFace },
  { label: "账号与安全", description: "手机号、密码和设备管理", icon: ShieldCheck },
  { label: "消息通知", description: "系统消息与互动提醒", icon: Bell },
  { label: "帮助与反馈", description: "常见问题与产品建议", icon: CircleHelp },
];

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function AccountProfilePanel({ user }: AccountProfilePanelProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const [isUploadPending, setIsUploadPending] = useState(false);
  const [isAvatarPromptOpen, setIsAvatarPromptOpen] = useState(false);
  const [isNicknamePromptOpen, setIsNicknamePromptOpen] = useState(false);
  const [isNicknamePending, setIsNicknamePending] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [nickname, setNickname] = useState(user.nickname || `用户${user.phone.slice(-4)}`);
  const [nicknameDraft, setNicknameDraft] = useState(user.nickname || "");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  async function handleLogout() {
    setMessage("");

    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!response.ok) {
      setMessage("退出失败，请稍后再试");
      return;
    }

    startTransition(() => {
      router.refresh();
    });
  }

  function handleAvatarTrigger() {
    setMessage("");
    setIsAvatarPromptOpen(true);
  }

  function handleAvatarPermissionConfirm() {
    setIsAvatarPromptOpen(false);
    fileInputRef.current?.click();
  }

  function handleNicknameTrigger() {
    setMessage("");
    setNicknameDraft(user.nickname || "");
    setIsNicknamePromptOpen(true);
  }

  async function handleNicknameSave() {
    setMessage("");
    setIsNicknamePending(true);

    const response = await fetch("/api/account/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nickname: nicknameDraft,
      }),
    });

    const result = (await response.json().catch(() => ({}))) as { nickname?: string | null; message?: string };
    setIsNicknamePending(false);

    if (!response.ok) {
      setMessage(result.message ?? "昵称保存失败，请稍后再试");
      return;
    }

    const nextNickname = result.nickname || `用户${user.phone.slice(-4)}`;
    setNickname(nextNickname);
    setIsNicknamePromptOpen(false);
    setMessage("昵称已更新");
    startTransition(() => {
      router.refresh();
    });
  }

  async function handleAvatarChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setMessage("");
    setIsUploadPending(true);

    const formData = new FormData();
    formData.append("avatar", file);

    const response = await fetch("/api/account/avatar", {
      method: "POST",
      body: formData,
    });

    const result = (await response.json().catch(() => ({}))) as { avatarUrl?: string; message?: string };
    setIsUploadPending(false);
    event.target.value = "";

    if (!response.ok) {
      setMessage(result.message ?? "头像上传失败，请稍后再试");
      return;
    }

    setAvatarUrl(result.avatarUrl ? `${result.avatarUrl}?t=${Date.now()}` : null);
    setMessage("头像已更新");
    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <section className="mx-auto grid w-full max-w-3xl gap-5">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        className="hidden"
        onChange={handleAvatarChange}
      />
      <div className="overflow-hidden rounded-[32px] border border-[#f1d3c3] bg-white shadow-[0_24px_60px_rgba(130,64,40,0.1)]">
        <div className="bg-[linear-gradient(135deg,#d4572a_0%,#eb7a49_55%,#f1a07a_100%)] px-6 py-7 text-white sm:px-8">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handleAvatarTrigger}
                disabled={isUploadPending}
                className="group relative flex size-20 shrink-0 flex-col items-center justify-center overflow-hidden rounded-[26px] border border-[rgba(255,255,255,0.26)] bg-[linear-gradient(180deg,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.14)_100%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] backdrop-blur transition hover:bg-[rgba(255,255,255,0.22)]"
              >
                {avatarUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={avatarUrl}
                    alt="用户头像"
                    className="absolute inset-0 size-full object-cover"
                  />
                ) : (
                  <span className="flex size-full items-center justify-center transition group-hover:opacity-0">
                    <span className="flex size-12 items-center justify-center rounded-full bg-[rgba(255,255,255,0.92)] text-[#d4572a] shadow-[0_6px_14px_rgba(140,60,28,0.14)]">
                      <UserRound size={26} aria-hidden="true" />
                    </span>
                  </span>
                )}
                <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-[rgba(86,33,16,0.22)] opacity-0 transition group-hover:opacity-100">
                  <Camera size={18} aria-hidden="true" />
                  <span className="text-[11px] font-medium">{isUploadPending ? "上传中" : "更换头像"}</span>
                </span>
                <span className="absolute bottom-2 rounded-full bg-[rgba(255,255,255,0.2)] px-2 py-0.5 text-[10px] font-medium text-white/92">
                  点击更换
                </span>
              </button>
              <div>
                <p className="text-2xl font-semibold">{nickname}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              disabled={isPending}
              className="flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.24)] bg-[rgba(255,255,255,0.12)] px-4 py-2 text-sm transition hover:bg-[rgba(255,255,255,0.18)] disabled:opacity-70"
            >
              <LogOut size={16} aria-hidden="true" />
              退出
            </button>
          </div>

          <div className="mt-6">
            <div className="rounded-2xl bg-[rgba(255,255,255,0.14)] px-4 py-4">
              <p className="text-sm text-[rgba(255,244,240,0.78)]">最近登录</p>
              <p className="mt-2 text-lg font-semibold">
                {user.lastLoginAt ? formatDate(new Date(user.lastLoginAt)) : "刚刚创建"}
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3 p-5 sm:p-6">
          <div className="rounded-2xl border border-[#f2d7ca] bg-[#fffaf7] px-5 py-4">
            <div className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-[#fff0e7] text-[#c84f2a]">
                <WalletCards size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="text-base font-semibold text-[#341812]">个人资料</p>
                <p className="text-sm text-[#8d5f53]">头像、昵称和账户信息都从这里开始扩展</p>
              </div>
            </div>
          </div>

          <div className="grid gap-3">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.label === "头像与昵称" ? handleNicknameTrigger : undefined}
                  className="flex items-center justify-between rounded-2xl border border-[#f2d7ca] bg-white px-5 py-4 text-left shadow-[0_14px_30px_rgba(130,64,40,0.05)]"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-[#fff0e7] text-[#c84f2a]">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-base font-semibold text-[#341812]">{item.label}</p>
                      <p className="text-sm text-[#8d5f53]">{item.description}</p>
                    </div>
                  </div>
                  <ChevronRight size={18} className="text-[#b98b7d]" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          {message ? <p className="text-sm text-[#b42318]">{message}</p> : null}
        </div>
      </div>

      {isAvatarPromptOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(35,18,12,0.38)] px-5">
          <div className="w-full max-w-sm rounded-[28px] border border-[#f2d7ca] bg-white p-6 shadow-[0_24px_60px_rgba(73,31,18,0.24)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-[#341812]">访问本地文件</p>
                <p className="mt-2 text-sm leading-7 text-[#8d5f53]">
                  导入头像前，需要先打开本地文件选择器。确认后才会访问你本地的图片文件。
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsAvatarPromptOpen(false)}
                className="rounded-full p-1 text-[#8d5f53] transition hover:bg-[#fff0e7] hover:text-[#b24322]"
                aria-label="关闭"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsAvatarPromptOpen(false)}
                className="flex-1 rounded-full border border-[#efcfbf] px-4 py-3 text-sm font-semibold text-[#7c564d] transition hover:bg-[#fff7f2]"
              >
                先不导入
              </button>
              <button
                type="button"
                onClick={handleAvatarPermissionConfirm}
                className="flex-1 rounded-full bg-[#c84f2a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b24322]"
              >
                允许访问
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isNicknamePromptOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(35,18,12,0.38)] px-5">
          <div className="w-full max-w-sm rounded-[28px] border border-[#f2d7ca] bg-white p-6 shadow-[0_24px_60px_rgba(73,31,18,0.24)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-lg font-semibold text-[#341812]">编辑昵称</p>
                <p className="mt-2 text-sm leading-7 text-[#8d5f53]">昵称最多 24 个字符，保存后会立即更新到个人页。</p>
              </div>
              <button
                type="button"
                onClick={() => setIsNicknamePromptOpen(false)}
                className="rounded-full p-1 text-[#8d5f53] transition hover:bg-[#fff0e7] hover:text-[#b24322]"
                aria-label="关闭"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-[#5c3830]">昵称</span>
                <input
                  value={nicknameDraft}
                  onChange={(event) => setNicknameDraft(event.target.value)}
                  maxLength={24}
                  placeholder="输入新的昵称"
                  className="rounded-2xl border border-[#efcfbf] bg-[#fffaf7] px-4 py-3 text-base text-[#341812] outline-none transition placeholder:text-[#ba9186] focus:border-[#c84f2a]"
                />
              </label>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setIsNicknamePromptOpen(false)}
                className="flex-1 rounded-full border border-[#efcfbf] px-4 py-3 text-sm font-semibold text-[#7c564d] transition hover:bg-[#fff7f2]"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleNicknameSave}
                disabled={isNicknamePending}
                className="flex-1 rounded-full bg-[#c84f2a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b24322] disabled:opacity-70"
              >
                {isNicknamePending ? "保存中" : "保存昵称"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
