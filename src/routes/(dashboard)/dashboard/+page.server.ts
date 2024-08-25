import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { getLatestUsers } from "$lib/server/functions/user";
import { getRoleWithUserCount } from "$lib/server/functions/role";
import { getTotalRevenue, getTransactionsCount } from "$lib/server/functions/transaction";
import { getTotalMember } from "$lib/server/functions/member";
import { getTotalStylist } from "$lib/server/functions/stylist";

export const load:PageServerLoad = async (event) => {
    if ( !event.locals.session || ( event.locals.user === null || event.locals.user?.role !== "ADMIN" ) ) {
        return redirect(302, '/');
    }

    const [
        rolesWithUserCount,
        getUser,
        plaintotalRevenue,
        totalMember,
        totalTransaction,
        totalStylist
    ] = await Promise.all([
        getRoleWithUserCount(), 
        getLatestUsers(),
        getTotalRevenue(),
        getTotalMember(),
        getTransactionsCount(),
        getTotalStylist()
    ])
    let totalRevenue = 0
    if(plaintotalRevenue?._sum.totalPrice) { totalRevenue = plaintotalRevenue._sum.totalPrice }
    return {
        users: getUser,
        roles: rolesWithUserCount,
        totalRevenue: totalRevenue,
        totalMember: totalMember,
        totalTransaction: totalTransaction,
        totalStylist: totalStylist,
    }
}