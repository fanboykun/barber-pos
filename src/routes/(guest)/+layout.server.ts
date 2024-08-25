import type { LayoutServerLoad } from "./$types"

export const load: LayoutServerLoad = async ({ locals }) => {
  const isAuthenticatedUser = locals.session != null
  const hasCustomerSession = locals.customer != null
  return {
    user: locals.user,
    isAuthenticatedUser: isAuthenticatedUser,
    hasCustomerSession
  }
}

