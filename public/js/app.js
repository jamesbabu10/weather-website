console.log("client side javascript");
// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });
// fetch("http://localhost:3000/weather?address=!").then((response) => {
//   response.json().then((data) => {
//     console.log(data);
//   });
// });
const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");
const weatherform = document.querySelector("form");
const search = document.querySelector("input");
weatherform.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);
  message1.textContent = "Loading";

  fetch(`/weather?address=${location}`).then((response) => {
    message1.textContent = "";
    response.json().then((data) => {
      if (data.error) {
        message2.textContent = data.error;
      } else {
        message1.textContent = data.location;
        message2.textContent = data.forecast;

        console.log(data);
      }
    });
  });
});
