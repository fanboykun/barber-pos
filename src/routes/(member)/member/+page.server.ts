/* eslint-disable @typescript-eslint/no-unused-vars */
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getMembersTotalMoneySaved, getMembersTotalPointsUsed, getMembersTotalTransaction, getMembersTransaction } from "$lib/server/functions/member";

export const load: PageServerLoad =  async(event) => {
    if (!event.locals.customer) {
        redirect(302, '/sign-in');
    }
    const allTransaction = await getMembersTransaction(event.locals.customer.id)
    const totalTransaction = await getMembersTotalTransaction(event.locals.customer.id)
    const totalMoneySaved = await getMembersTotalMoneySaved(event.locals.customer.id)
    const totalPointUsedData = await getMembersTotalPointsUsed(event.locals.customer.id)
    
    let totalPointUsed = 0
    if(totalPointUsedData) {
        const pointsSum: number[] = []
        totalPointUsedData.forEach((v) => {
            pointsSum.push(v.point?.minimum ?? 0)
        })
        pointsSum.forEach((p) => {
            totalPointUsed += p
        })
        console.log(totalPointUsed)
    }
    return { allTransaction, totalTransaction, totalMoneySaved, totalPointUsed }
}