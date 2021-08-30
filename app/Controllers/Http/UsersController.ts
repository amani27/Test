import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import User from "App/Models/User";

export default class UsersController {


    public async register(ctx) {
        try {
            let data = ctx.request.all()
            let user = await User.create({ email: data.email, password: data.password });

            return ctx.response.status(200).send(user);
        } catch (error) {
            return ctx.response.status(422).send({ message: error.message });
        }
    }

    // public async login(ctx) {
    //     let data = ctx.request.all()

    //     try {
    //         // return 'abc'
    //         return ctx.auth.use("web").attempt(data.email, data.password)
    //     } catch (errors) {
    //         console.log(errors)
    //         return errors;
    //     }

    // }
    public async login({ request, auth, session, response }: HttpContextContract) {
        const { email, password } = request.all()
        try {
            return await auth.attempt(email, password)
            // return response.redirect('/')
        } catch (error) {
            console.log(error)
            return error;
        }
    }

    public async getUser({ auth }) {
        // return 'abc';
        try {

            const user = await auth.use('web').authenticate()
            return user;
        }
        catch (errors) {
            console.log(errors)
            return errors;
        }
    }

    public async logout({ auth }) {
        return await auth.logout()
    }
}
