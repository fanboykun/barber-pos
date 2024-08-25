import type { getAllTransactionsWithPagination } from "$lib/server/functions/transaction";
import type { Prisma } from "@prisma/client";

export type AllTransactionWithPagination = Prisma.PromiseReturnType<typeof getAllTransactionsWithPagination>
