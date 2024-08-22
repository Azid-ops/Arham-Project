export const validateEmail = (e, validator, setMessage) => {
  const email = e.target.value;
  if (validator.isEmail(email)) {
    setMessage("");
  } else setMessage("Please enter a valid Email");
};

export const sendUserData = async (
  userPassword,
  confirmPass,
  userEmail,
  setPassword,
  setEmail,
  setConPass,
  navigate,
  setErrorMsg
) => {
  if (userPassword === confirmPass) {
    if (userPassword !== "" && confirmPass !== "" && userEmail !== "") {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userPassword: userPassword,
          userEmail: userEmail,
        }),
      });
      if (response.status === 200) {
        setPassword("");
        setEmail("");
        setConPass("");
        setErrorMsg("You have successfully Sign Up in");
        const responseObject = await JSON.parse(await response.text());
        const token = responseObject.token;
        localStorage.setItem("token", token);
        navigate("/userinfo", {
          state: { update: "UPDATE", userID: responseObject.ID },
        });
      } else if (response.status === 409) {
        setErrorMsg("Email already exists");
      }
    }
  } else setErrorMsg("Passwords do not match");
};

export const submitFunc = (e, setErrorMsg) => {
  e.preventDefault();
  if (userEmail && userPassword && confirmPass) {
    if (message === "") {
      sendUserData(
        userPassword,
        confirmPass,
        userEmail,
        setPassword,
        setEmail,
        setConPass,
        navigate,
        setErrorMsg
      );
    } else setErrorMsg("Enter a valid Email");
  } else setErrorMsg("Input Fields can't be Empty");
};
