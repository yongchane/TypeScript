import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Input from "./components/Input";
import Label from "./components/Label";
import { useSetLocale, useTranslate } from "./translate";

function App() {
  // 보통 useState는 타입을 선언할 필요가 없지만 예를 들어 문자열 배열을 state로 만든다고 했을떄
  //빈배열을 초깃값을 쓰면 이런경우에는 타입을 추론할 수 없으니 state 타입이 never(절때로 있을 수 없는 값)이라는 타입의 배열이된다
  //이떄 제너릭을 통해 아래와 같이 타입을 작성한다
  const [values, setValues] = useState<{ username: string; password: string }>({
    username: "",
    password: "",
  });
  //Ref로 HTML DOM 노드를 가져와서 쓸거라면 제네릭으로 HTML DOM 노드에 해당하는 타입을 적어 주면 된다
  // 만약 mutablerefobject htmlformelement|undefined라고 명시되면 초깃값으로 null이라고 적어주면 됨
  // 즉 초깃값이 비어 있으면 추론된 Ref 객체 타입과 Ref를 사용하는 곳의 타입이 맞지 않기 때문에 초깃값으로 null을 지정해 주면 된다
  //useRef에서는 제네릭으로 대상이 되는 노드의 타입을 정해 줄 수 있다
  const formRef = useRef<HTMLFormElement>(null);
  const t = useTranslate();
  const setLocale = useSetLocale();

  //useEffect훅 같은 경우에는 타입을 정의할 일이 거의 없음
  useEffect(() => {
    const form = formRef.current;
    if (form) form["username"].focus();
  }, []);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    //제네릭을 통해 name,value의 타겟(이벤트 타겟)의 타입을 정함
    const { name, value } = e.target;
    const nextValues = {
      ...values,
      [name]: value,
    };
    setValues(nextValues);
  }

  function handleClick(e: MouseEvent) {
    // 만약 해당 컴포넌트 처럼 MouseEvent의 속성을 딱히 활용하고 있지도 않고 타입을 정리하기 귀찮을때는
    // 리엑트에서 제공하는 보편적인 타입인 SyntheticEvent라는 타입을 사용
    //SyntheticEvent는 리액트 이벤트 객체에 조상격인 타입으로 리액트에서는 브라우저 기본 이벤트를 그대로 쓰는게 아니라
    // 리액트에서 추가적인 기능을 덧붙인 객체를 사용하기 때문에 SyntheticEvent라는 이벤트 객체 타입을 쓴다
    //SyntheticEvent는 특별히 이벤트를 구체적으로 지정하지 않아도 괜찮은 경우에는 SyntheticEvent를 쓸 수 있다
    e.preventDefault();

    const message = `${values.username}님 환영합니다`;
    alert(message);
  }

  return (
    <form className="login" ref={formRef}>
      <h1 className="login-title">{t("signin")}</h1>
      <Label>{t("username")}</Label>
      <Input
        id="username"
        name="username"
        type="text"
        placeholder={t("email or phone number")}
        value={values.username}
        onChange={handleChange}
      />
      <Label>{t("password")}</Label>
      <Input
        id="password"
        name="password"
        type="password"
        placeholder={t("password")}
        value={values.password}
        onChange={handleChange}
      />
      <div className="login-forgot">
        <a className="login-forgot-link" href="#login">
          {t("forgot your password?")}
        </a>
      </div>
      <Button id="submit" onClick={handleClick}>
        {t("signin")}
        {/* chidrn prop */}
      </Button>
      <div className="login-signup">
        {t("new user?")}{" "}
        <a className="login-signup-link" href="#signup">
          {t("signup")}
        </a>
      </div>
      <div className="locale">
        <span onClick={() => setLocale("ko")}>한국어</span> |{" "}
        <span onClick={() => setLocale("en")}>English</span>
      </div>
    </form>
  );
}

export default App;
