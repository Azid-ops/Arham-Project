export const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

export const handleDOBChange = (e, setDOB, setAge) => {
    const dob = e.target.value;
    setDOB(dob);
    const age = calculateAge(dob);
    if (age < 18) {
        alert("You must be at least 18 years old to register.");
        setDOB("");
        setAge("");
    } else {
        setAge(age);
    }
};

export const saveUserInfo = async (userId, userName, userAge, userGender, userDOB, navigate, state) => {
    console.log("Here: 1 & ", state.ID);
    const response = await fetch("/api/saveuserinfo", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userID": userId,
            "userName": userName,
            "userAge": userAge,
            "userGender": userGender,
            "userDOB": userDOB,
        })
    }).then(async (response) => {
        console.log(response.status);
        if (response.status === 200) {
            alert("User info saved successfully.");
            navigate("/home", { state: { ID: userId } });
        } else
            alert("Failed to save user info.");
    }
    ).catch(
        (error) => {
            console.error(error);
        }
    );
};

export const getUserData = async (userId, setName, setAge, setGen, setDOB) => {
    const response = await fetch(`/api/getuserinfo?userID=${encodeURIComponent(userId)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    setName(data.user?.usdName || "");
    setAge(data.user?.usdAge || "");
    setGen(data.user?.usdGender || "");
    setDOB(data.user?.usdDOB || "");
}