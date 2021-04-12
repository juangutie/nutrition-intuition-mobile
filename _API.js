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
