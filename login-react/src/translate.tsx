import { ReactNode, createContext, useContext, useState } from "react";

type Locale = "ko" | "en"; // setLocale에서 발생한 타입 오류 떄문에 명시적으로 타입 선언

interface LocaleContextValue {
  locale: Locale;
  setLocale: (value: Locale) => void;
}
// 해당 타입에서는 context 값의 형태를 정해줌

const LocaleContext = createContext<LocaleContextValue>({
  locale: "ko",
  setLocale: () => {},
});
// 초깃값으로 타입을 지정하고나 제네릭으로 타입을 명시적으로 지정할 것 같다

export function LocaleContextProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ko");

  return (
    <LocaleContext.Provider
      value={{
        locale,
        setLocale,
      }}
    >
      {children}
    </LocaleContext.Provider>
  );
}

const dict = {
  ko: {
    signin: "로그인",
    username: "아이디",
    "email or phone number": "Email 또는 전화번호",
    password: "비밀번호",
    "forgot your password?": "비밀번호를 잊으셨나요?",
    "new user?": "회원이 아니신가요?",
    signup: "가입하기",
  },
  en: {
    signin: "Signin",
    username: "Username",
    "email or phone number": "Email or phone number",
    password: "Password",
    "forgot your password?": "Forgot your password?",
    "new user?": "New user?",
    signup: "Signup",
  },
};

function useLocale() {
  const { locale } = useContext(LocaleContext);
  return locale;
}

export function useSetLocale() {
  const { setLocale } = useContext(LocaleContext);
  return setLocale;
}

export function useTranslate() {
  const locale = useLocale();
  const t = (key: keyof (typeof dict)[Locale]) => dict[locale][key];
  return t;
}
