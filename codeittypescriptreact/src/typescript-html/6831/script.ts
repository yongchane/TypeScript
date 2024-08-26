const usernameInput = document.getElementById("username") as HTMLInputElement;
const submitButton = document.getElementById("submit") as HTMLButtonElement;
// 다음 코드와 같이 as HTML~Element를 선언해줌으로서 dom 노드에서 보편적으로 사용할 수 있는 타입을 선언
usernameInput.focus();
submitButton.addEventListener("click", handleClick);

//이벤트 헨들러를 만들때 보편적으로 Event나 UIEvent 타입을 쓸 수 있다
// 또는 구체적으로 MouseEvent와 같이 이벤트 이름하고 Event로 끝나는 타입을 쓸 수 있다
function handleClick(e: Event) {
  e.preventDefault();
  const message = `${usernameInput.value}님 반갑습니다!`;
  alert(message);
}
