import { getAllMembers } from '$lib/server/functions/member.js'
import { json } from '@sveltejs/kit'

export const GET = async (event) => {
    if(!event.locals.user) {
        return Response.error()
    }

    const data = await getAllMembers()
    return json(data)
}