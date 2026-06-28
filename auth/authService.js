import User from "../models/User.js";

import {

    comparePassword

}

    from "./password.js";

import {

    generateAccessToken,

    generateRefreshToken

}

    from "./jwt.js";

export async function login({

    email,

    password

}) {

    const user = await User.findOne({
        email
    }).select("+passwordHash");

    if (!user) {

        throw new Error(

            "Invalid email or password."

        );

    }

    const valid = await comparePassword(
    password,
    user.passwordHash
    );
    
    if (!valid) {

        throw new Error(

            "Invalid email or password."

        );

    }

    return {

        accessToken:

            generateAccessToken(user),

        refreshToken:

            generateRefreshToken(user),

        user

    };

}