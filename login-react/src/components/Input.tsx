import { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}
//Attributes : 특정 태그의 속성들을 타입으로 만들어 놓음
//제네릭의 타입 파라미터로는 DOM 노드에 해당하는 타입을 적어줌
// className 같은 것도 HTMLAttributes에 포함되어있으니 생략해도 좋음
// 이런식으로 HTML 태그에서 쓰는 기본 Prop을 가져올 수 있다
export default function Input({ className = "", ...rest }: Props) {
  const classNames = `${styles.input} ${className}`;
  return <input className={classNames} {...rest} />;
}

//  <Input
// id="password"
// name="password"
// type="password"
// placeholder={t("password")}
// value={values.password}
// onChange={handleChange}
// />  --> App.tsx에서
