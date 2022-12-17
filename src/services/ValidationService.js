export const isValidPassword = (password) => {
    console.log("Password:", password.length);
    const errors = [];
    if (password.length < 8) {
        errors.push("Your password must be at least 8 characters");
    }
    if (password.search(/[a-z]/i) < 0) {
        console.log("Pushing alpha");
        errors.push("Your password must contain at least one letter.");
    }
    if (password.search(/[0-9]/) < 0) {
        console.log("Pushing NUmber");
        errors.push("Your password must contain at least one digit.");
    }
    return errors;
}

export const isValidEmail = (email) => {
    console.log(email)
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return false;
    }
    return true;
}