export const sendUserData = async (userPassword, userEmail, setPassword, setEmail, navigate) => {
    if (userPassword !== "" && userEmail !== "") {
        const response = await fetch("/api/LogIn", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "userPassword": userPassword,
                "userEmail": userEmail
            })
        })
        setPassword("");
        setEmail("");
        if (response.status === 200) {
            alert("You have successfully logged in");
            const responseObject = await JSON.parse(await response.text());
            const token = responseObject.token;
            localStorage.setItem("token", token);
            console.log(responseObject.ID);
            navigate("/home", { state: { ID: responseObject.ID } });
        } else if (response.status === 404) {
            alert("User Not Found!");
        } else
            alert("Invalid Credentials");
    }
}

export const showPassword = (e, setPass) => {
    if (e.target.checked) {
        setPass("text");
    } else
        setPass("password");
}