import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Greetings from "./Greetings";
import Counter from "./Counter";

const App = () => {
  // const onClick = (name: string) => {
  //   console.log(`${name} says hello`);
  // };
  // return <Greetings name="Hello" onClick={onClick} />;
  // props 를 빠뜨리게 된다면 에디터에 오류 발생
  return <Counter />;
};

export default App;
