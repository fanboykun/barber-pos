/* eslint-disable @typescript-eslint/no-unused-vars */
import type { LayoutServerLoad } from './$types'

export const load: LayoutServerLoad = async ({ locals }) => {
  return {
    user: locals.customer,
  }
}

