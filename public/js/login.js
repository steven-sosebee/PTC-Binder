const loginFormHandler = async (event) => {
  event.preventDefault();
  console.log("Calling login...");

  const user_name = document.querySelector("#username-login").value.trim();
  const passwordEl = document.querySelector("#password-login").value.trim();

  if (user_name && passwordEl) {
    console.log("Checking credentials...");
    const login = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ user_name, password: passwordEl }),
      headers: { "Content-Type": "application/json" },
    });
    console.log("Rendering page...");
    if (login.ok) {
      document.location.replace("/user/login");
    } else {
      alert("Username or password were incorrect...");
    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const user_name = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();

  if (user_name && email && password) {
    const response = await fetch("/api/users/", {
      method: "POST",
      body: JSON.stringify({ user_name, password, email }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
      localStorage.setItem("userName", user_name);
    } else {
      alert("Failed to sign up.");
    }
  }
};

document
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
