import { getAllMembers } from '$lib/server/functions/member.js'
import { getAllPoints } from '$lib/server/functions/point.js'
import { getAllStylists } from '$lib/server/functions/stylist.js'
import { getAllTreatments } from '$lib/server/functions/treatment.js'
import { redirect } from '@sveltejs/kit'

export const load = async (event) => {
    if(!event.locals.user) {
        return redirect(302, '/')
    }
    // const treatments = getAllTreatments()
    // const points = getAllPoints()
    // const stylists = getAllStylists()
    // const members = getAllMembers()
    const creation = async () => {
        const [treatments, points, stylists, members] = await Promise.all([
            getAllTreatments(),
            getAllPoints(),
            getAllStylists(),
            getAllMembers()
        ]);
        
        return { treatments, points, stylists, members };
    }
    return {
        all: creation()
        // treatments, points, stylists, members
    }
}