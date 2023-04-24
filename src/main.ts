import "./pages/weekly-learning";
import "./style.scss";

const splited = location.pathname.split("/");
if (splited[splited.length - 1] === "71") {
  const content = document.querySelector("#content");

  if (content) {
    content.innerHTML = "";
  }
}
