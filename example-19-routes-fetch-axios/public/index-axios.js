const btnGreeting = document.querySelector("#btn-greeting");
const spanGreeting = document.querySelector("#greeting");
const btnAdd = document.querySelector("#btn-add");
const txtA = document.querySelector("#inp-a");
const txtB = document.querySelector("#inp-b");
const spanResult = document.querySelector("#result");

btnGreeting.addEventListener("click", () => {
  axios
    .get("/api/greeting")
    .then((response) => (spanGreeting.innerHTML = response.data.message));
});

btnAdd.addEventListener("click", () => {
  const body = {
    a: parseInt(txtA.value),
    b: parseInt(txtB.value),
  };

  axios
    .post("/api/calculate", body)
    .then((response) => (spanResult.innerHTML = response.data.result));
});
