export const deleteAcc = async (state, navigate) => {
    const response = await fetch(`/api/deleteUser?userID=${encodeURIComponent(state?.ID)}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status === 200) {
        console.log("Account deleted");
        logOut(navigate);
    }
    else
        console.log("Error deleting account");
}

export const logOut = (navigate) => {
    localStorage.removeItem('token');
    navigate('/');
}

export const getUserData = async (state) => {
    const response = await fetch(`/api/getuserinfo?userID=${encodeURIComponent(state?.ID)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        return data.user;
    }
    else {
        console.log("Error fetching user data");
        return "Error";
    }
}

export const fetchData = async (state, setUserData) => {
    const data = await getUserData(state);
    if (data !== "Error") {
        setUserData(data);
    } else
        alert("Error");
}

export const showData = (setShowDataButton) => {
    setShowDataButton(false);
}

export const hideData = (setShowDataButton) => {
    setShowDataButton(true);
}