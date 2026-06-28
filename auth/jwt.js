/**
 * ============================================================
 * JWT Utility
 * ============================================================
 */

import jwt from "jsonwebtoken";

/*
|--------------------------------------------------------------------------
| Access Token
|--------------------------------------------------------------------------
*/

export function generateAccessToken(user){

    return jwt.sign(

        {

            id:user._id,

            email:user.email,

            role:user.role

        },

        process.env.JWT_SECRET,

        {

            expiresIn:"1h"

        }

    );

}

/*
|--------------------------------------------------------------------------
| Refresh Token
|--------------------------------------------------------------------------
*/

export function generateRefreshToken(user){

    return jwt.sign(

        {

            id:user._id

        },

        process.env.JWT_REFRESH_SECRET,

        {

            expiresIn:"7d"

        }

    );

}

/*
|--------------------------------------------------------------------------
| Verify
|--------------------------------------------------------------------------
*/

export function verifyToken(token){

    return jwt.verify(

        token,

        process.env.JWT_SECRET

    );

}