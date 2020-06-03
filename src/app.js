import axios from "axios";
let e = document.getElementById("input");
e.onclick = btnRequest;
function btnRequest() {
  axios
    .get("/user?ID=12345")
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
}
