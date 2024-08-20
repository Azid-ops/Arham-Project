export const validateEmail = (e, validator, setMessage) => {
    const email = e.target.value;
    if (validator.isEmail(email)) {
        setMessage("");
    } else
        setMessage('Please enter a valid Email');
}

export const sendUserData = async (userPassword, confirmPass, userEmail, setPassword, setEmail, setConPass, navigate) => {
    if (userPassword === confirmPass) {

        if (userPassword !== "" && confirmPass !== "" && userEmail !== "") {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "userPassword": userPassword,
                    "userEmail": userEmail
                })
            })
            if (response.status === 200) {
                setPassword("");
                setEmail("");
                setConPass("");
                alert("You have successfully Sign Up in");
                const responseObject = await JSON.parse(await response.text());
                const token = responseObject.token;
                console.log(responseObject);
                localStorage.setItem("token", token);
                navigate("/userinfo", { state: { update: "UPDATE", userID: responseObject.ID } });
            } else if (response.status === 409) {
                alert("Email already exists");
            }
        }
    } else
        alert("Passwords do not match");
}