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

export async function updateProfile(obj) {
    var json = JSON.stringify(obj);

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/updateprofile",
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

export async function searchMealTime(userId, range, token) {
    var json = JSON.stringify({
        userId: userId,
        range: range,
        jwtToken: token,
    });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/searchmealtime",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function addMeal(obj) {
    var json = JSON.stringify(obj);

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/addmeal",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function mealtimeCheck(userId, token) {
    var json = JSON.stringify({
        userId: userId,
        jwtToken: token,
    });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/mealtimecheck",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function addMealtime(userId, meals, token) {
    var json = JSON.stringify({
        userId: userId,
        info: meals,
        jwtToken: token,
    });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/addmealtime",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function addMeals(mealtimeId, meals, mealtimeToken) {
    var json = JSON.stringify({
        mealtimeId: mealtimeId,
        info: meals,
        jwtToken: mealtimeToken,
    });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/addmeals",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function viewMealTime(mealtimeId, mealtimeToken) {
    var json = JSON.stringify({
        mealtimeId: mealtimeId,
        jwtToken: mealtimeToken,
    });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/viewmealtime",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function removeMealFromMealtime(mealtimeId, mealId, userToken) {
    var json = JSON.stringify({
        mealtimeId: mealtimeId,
        mealId: mealId,
        jwtToken: userToken,
    });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/removemealtimemeal",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}

export async function searchMealByName(userId, search, userToken) {
    var json = JSON.stringify({
        userId: userId,
        search: search,
        jwtToken: userToken,
    });

    return await fetch(
        "https://nutrition-intuition.herokuapp.com/api/searchmealname",
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
        }
    ).then((response) => response.json());
}
