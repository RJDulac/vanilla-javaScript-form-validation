const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//show input error message
const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.classList.remove("success");
  formControl.classList.add("error");
  const small = formControl.querySelector("small");
  small.innerText = message;
};
//show success outline
const showSuccess = input => {
  const formControl = input.parentElement;
  formControl.classList.remove("error");
  formControl.classList.add("success");
};
//check if email is valid
const checkEmail = input => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} is not valid.`);
  }
};
//check required fields
const checkRequired = inputArr => {
  inputArr.forEach(input => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
};
//check input length
const checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters long.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters long.`
    );
  } else {
    showSuccess(input);
  }
};
//check password match
const checkPasswordsMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input1, null);
    showError(input2, `${input1.id}s don't match`);
  }
};
//get field name
const getFieldName = input => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};
//event listeners
form.addEventListener("submit", e => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkEmail(email);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkPasswordsMatch(password, password2);
});
