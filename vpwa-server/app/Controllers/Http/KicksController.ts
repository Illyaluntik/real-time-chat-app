/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/indent */
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kick from 'App/Models/Kick'
import Member from 'App/Models/Member'

export default class KicksController {
    async kick({ request }: HttpContextContract) {
        const { kickedUser, kickedBy, kickedIn } = request.all()
        const kicks = await Kick.create({
            kickedUser: kickedUser,
            kickedBy: kickedBy,
            kickedIn: kickedIn,
        })

        //overenie, ci nie su tri kicky
        const kickCount = (await Kick.query().where('kicked_user', kickedUser).where('kicked_in', kickedIn)).length
        if (kickCount === 3) {
            const deleteFrom = await Member.query().where('user_id', kickedUser).where('channel_id', kickedIn).first()
            await deleteFrom?.delete()
            await Kick.query().where('kicked_in', kickedIn).where('kicked_user', kickedUser).delete()
            return {}
        }
        return kicks
    }
}
