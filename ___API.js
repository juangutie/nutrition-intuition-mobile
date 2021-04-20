export async function login(username, password) {
    var json = JSON.stringify({
        login: username,
        password: password,
    });

    return await fetch("https://nutrition-intuition.herokuapp.com/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: json,
    }).then((response) => response.json());
}

export async function checkUsernameAndEmail(username, email) {
    var json = JSON.stringify({
        login: username,
        email: email,
    });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/checkusernameemail",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function register(obj) {
    var json = JSON.stringify(obj);

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/register",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function resendVerificationEmail(email) {
    var json = JSON.stringify({ email: email });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/resendverifyemail",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function sendPasswordResetEmail(username, newPassword) {
    var json = JSON.stringify({
        login: username,
        newPassword: newPassword,
    });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/resetpassword",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function getUserInfo(userId, token) {
    var json = JSON.stringify({
        userId: userId,
        jwtToken: token,
    });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/viewprofile",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}
