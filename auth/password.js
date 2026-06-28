/**
 * ============================================================
 * Password Utility
 * ============================================================
 */

import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/*
|--------------------------------------------------------------------------
| Hash Password
|--------------------------------------------------------------------------
*/

export async function hashPassword(password){

    return await bcrypt.hash(

        password,

        SALT_ROUNDS

    );

}

/*
|--------------------------------------------------------------------------
| Compare Password
|--------------------------------------------------------------------------
*/

export async function comparePassword(

    password,

    hashed

){

    return await bcrypt.compare(

        password,

        hashed

    );

}