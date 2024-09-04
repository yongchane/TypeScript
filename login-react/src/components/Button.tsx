import { MouseEvent, ReactNode } from "react";
import styles from "./Button.module.css";

// props는 객체니 인터페이스를 써서 지정할거다
interface Props {
  className?: string;
  id?: string;
  children?: ReactNode;
  // 리엑트에서는 children 타입이 ReactNode로 대부분 정해져 있음
  // 만약 children이 없는 경우도 처리하고 싶으면 children옆에 ? 를 써서 Optional로 만들기
  onClick: (e: MouseEvent) => void; // 주로 다른 함수 타입들과 일관되게 다음과 같은 화살표 함수로 사용
  // 또는 onClick MouseEventHandler<HTMLButtonElement>

  //이벤트 컴포넌트 타입 설정 방법
}

export default function Button({ className = "", ...rest }: Props) {
  const classNames = `${styles.button} ${className}`;
  return <button className={classNames} {...rest} />;
}
// 아래 코드와 동일함
//const Button = ({ className = "", ...rest }: Props) => {
//  const classNames = `${styles.button} ${className}`;
//  return <button className={classNames} {...rest} />;
//};
