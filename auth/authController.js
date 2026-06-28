import {

    login

}

from "./authService.js";

export async function loginUser(

    req,

    res,

    next

){

    try{

        const result =

            await login(

                req.body

            );

        res.status(200).json({

            success:true,

            data:result

        });

    }

    catch(error){

        next(error);

    }

}