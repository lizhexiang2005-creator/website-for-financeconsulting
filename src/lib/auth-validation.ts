export type AuthErrors = {
  phone?: string;
  password?: string;
  nickname?: string;
};

const chinaMobilePhonePattern = /^1[3-9]\d{9}$/;

export function normalizePhone(phone: unknown) {
  return String(phone ?? "").replace(/\s+/g, "");
}

export function validatePhone(phone: string) {
  if (!chinaMobilePhonePattern.test(phone)) {
    return "请输入 11 位中国大陆手机号";
  }

  return undefined;
}

export function validatePassword(password: unknown) {
  const value = String(password ?? "");

  if (value.length < 8) {
    return "密码至少 8 位";
  }

  if (!/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    return "密码需同时包含字母和数字";
  }

  return undefined;
}

export function validateNickname(nickname: unknown) {
  const value = String(nickname ?? "").trim();

  if (value.length > 24) {
    return "昵称最多 24 个字符";
  }

  return undefined;
}
