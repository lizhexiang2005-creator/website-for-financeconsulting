"use client";

import { FormEvent, useMemo, useState, useTransition } from "react";
import { Eye, EyeOff, Loader2, LockKeyhole, LogIn, Phone, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

type Mode = "register" | "login";

type FormState = {
  phone: string;
  password: string;
  confirmPassword: string;
};

type ApiErrorResponse = {
  message?: string;
  errors?: Partial<Record<keyof FormState, string>>;
};

const rememberedPhoneStorageKey = "mingjian:last-login-phone";

function createInitialFormState(): FormState {
  if (typeof window === "undefined") {
    return {
      phone: "",
      password: "",
      confirmPassword: "",
    };
  }

  return {
    phone: window.localStorage.getItem(rememberedPhoneStorageKey) ?? "",
    password: "",
    confirmPassword: "",
  };
}

export function AccountAuthPanel() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("register");
  const [form, setForm] = useState<FormState>(() => createInitialFormState());
  const [errors, setErrors] = useState<ApiErrorResponse["errors"]>({});
  const [message, setMessage] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isRefreshing, startTransition] = useTransition();

  const passwordStrength = useMemo(() => {
    const checks = [
      form.password.length >= 8,
      /[A-Za-z]/.test(form.password),
      /\d/.test(form.password),
    ];

    return checks.filter(Boolean).length;
  }, [form.password]);

  function updateField(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setErrors({});

    if (mode === "register" && form.password !== form.confirmPassword) {
      setErrors({ confirmPassword: "两次输入的密码不一致" });
      return;
    }

    setIsPending(true);

    const endpoint = mode === "register" ? "/api/auth/register" : "/api/auth/login";
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: form.phone,
        password: form.password,
      }),
    });

    const result = (await response.json().catch(() => ({}))) as ApiErrorResponse;
    setIsPending(false);

    if (!response.ok) {
      setErrors(result.errors ?? {});
      setMessage(result.message ?? "提交失败，请稍后再试");
      return;
    }

    if (mode === "register") {
      window.localStorage.setItem(rememberedPhoneStorageKey, form.phone);
      setMode("login");
      setMessage("注册成功，请使用刚设置的手机号和密码登录");
      setForm({
        phone: form.phone,
        password: "",
        confirmPassword: "",
      });
      return;
    }

    window.localStorage.setItem(rememberedPhoneStorageKey, form.phone);
    setMessage("登录成功，欢迎回来");
    setForm((current) => ({
      ...current,
      password: "",
      confirmPassword: "",
    }));

    startTransition(() => {
      router.refresh();
    });
  }

  return (
    <section className="w-full">
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-2xl rounded-[28px] border border-[#f1d3c3] bg-white p-6 shadow-[0_24px_60px_rgba(130,64,40,0.1)] sm:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#b44a27]">手机号账户</p>
            <h2 className="mt-2 text-2xl font-semibold text-[#341812]">
              {mode === "register" ? "注册账号" : "账号登录"}
            </h2>
          </div>

          <div className="grid grid-cols-2 rounded-lg border border-[#efcfbf] bg-[#fffaf7] p-1 text-sm font-semibold">
            {[
              { value: "register", label: "注册", icon: UserPlus },
              { value: "login", label: "登录", icon: LogIn },
            ].map((item) => {
              const Icon = item.icon;
              const active = mode === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setMode(item.value as Mode);
                    setErrors({});
                    setMessage("");
                    if (item.value === "login") {
                      const rememberedPhone = window.localStorage.getItem(rememberedPhoneStorageKey);

                      if (rememberedPhone) {
                        setForm((current) => ({
                          ...current,
                          phone: rememberedPhone,
                          password: "",
                          confirmPassword: "",
                        }));
                        return;
                      }
                    }

                    setForm((current) => ({
                      ...current,
                      password: "",
                      confirmPassword: "",
                    }));
                  }}
                  className={`flex items-center justify-center gap-2 rounded-md px-4 py-2 transition ${
                    active ? "bg-[#c84f2a] text-white shadow-[0_8px_18px_rgba(200,79,42,0.2)]" : "text-[#7c564d]"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[#5c3830]">手机号</span>
            <span className="flex items-center gap-3 rounded-lg border border-[#efcfbf] bg-[#fffaf7] px-4 py-3 focus-within:border-[#c84f2a]">
              <Phone size={18} className="text-[#b44a27]" aria-hidden="true" />
              <input
                value={form.phone}
                onChange={(event) => updateField("phone", event.target.value)}
                inputMode="tel"
                autoComplete="tel"
                placeholder="13800138000"
                className="w-full bg-transparent text-base text-[#341812] outline-none placeholder:text-[#ba9186]"
              />
            </span>
            {errors?.phone ? <span className="text-sm text-[#b42318]">{errors.phone}</span> : null}
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[#5c3830]">密码</span>
            <span className="flex items-center gap-3 rounded-lg border border-[#efcfbf] bg-[#fffaf7] px-4 py-3 focus-within:border-[#c84f2a]">
              <LockKeyhole size={18} className="text-[#b44a27]" aria-hidden="true" />
              <input
                value={form.password}
                onChange={(event) => updateField("password", event.target.value)}
                type={showPassword ? "text" : "password"}
                autoComplete={mode === "register" ? "new-password" : "current-password"}
                placeholder="至少 8 位，含字母和数字"
                className="w-full bg-transparent text-base text-[#341812] outline-none placeholder:text-[#ba9186]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="rounded-md p-1 text-[#8d5f53] transition hover:bg-[#fff0e7] hover:text-[#b24322]"
                aria-label={showPassword ? "隐藏密码" : "显示密码"}
              >
                {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
              </button>
            </span>
            {errors?.password ? <span className="text-sm text-[#b42318]">{errors.password}</span> : null}
          </label>

          {mode === "register" ? (
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-[#5c3830]">确认密码</span>
              <input
                value={form.confirmPassword}
                onChange={(event) => updateField("confirmPassword", event.target.value)}
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                placeholder="再次输入密码"
                className="rounded-lg border border-[#efcfbf] bg-[#fffaf7] px-4 py-3 text-base text-[#341812] outline-none transition placeholder:text-[#ba9186] focus:border-[#c84f2a]"
              />
              {errors?.confirmPassword ? (
                <span className="text-sm text-[#b42318]">{errors.confirmPassword}</span>
              ) : null}
            </label>
          ) : null}

          {mode === "register" ? (
            <div className="grid gap-2">
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className={`h-2 rounded-full ${passwordStrength > index ? "bg-[#c84f2a]" : "bg-[#f2d8cb]"}`}
                  />
                ))}
              </div>
              <p className="text-sm text-[#8d5f53]">密码强度：{["待设置", "偏弱", "可用", "较好"][passwordStrength]}</p>
            </div>
          ) : null}

          {message ? (
            <div
              className={`rounded-lg px-4 py-3 text-sm ${
                errors && Object.values(errors).some(Boolean)
                  ? "bg-[#fff1f0] text-[#b42318]"
                  : "bg-[#effaf3] text-[#287947]"
              }`}
            >
              {message}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={isPending || isRefreshing}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#c84f2a] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b24322] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" aria-hidden="true" /> : null}
            {mode === "register" ? "创建账号" : "登录账号"}
          </button>
        </div>
      </form>
    </section>
  );
}
