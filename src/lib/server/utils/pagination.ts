export class Pagination 
{
    pagination = {
        maxPages: 1,
        currentPage: 1,
        take: 0,
        skip: 0,
        showing: {
            from: 0,
            to: 0,
            of: 0
        },
        canGoNext: false,
        canGoPrev: false,
    }

    private maxData: number = 0

    constructor(maxData: number|null, private perPage: number = 10) {
        if(maxData && maxData > 0) { this.maxData = maxData }
        if(perPage && perPage > 0) { 
            this.perPage = perPage 
            this.pagination.take = this.perPage
        }
        this.pagination.maxPages = Math.ceil(this.maxData / this.perPage)
        this.pagination.showing.from = this.maxData == 0 ? 0 : 1
        this.pagination.showing.to = this.maxData >= this.pagination.take ? this.pagination.take : this.maxData
        this.pagination.showing.of = this.maxData
    }

    move(page: number) {
        if(this.maxData < 1) return
        if(page <= 1) { this.pagination.canGoNext = this.pagination.maxPages > page ; return }

        this.pagination.currentPage = page
        this.pagination.skip = this.pagination.currentPage > 1 ? this.pagination.take * ( this.pagination.currentPage - 1 ) : 0
        this.pagination.showing.from = this.pagination.skip + 1
        this.pagination.showing.to = this.pagination.skip + this.pagination.take > this.maxData ? this.maxData : this.pagination.skip + this.pagination.take 
        this.pagination.canGoNext = this.pagination.currentPage + 1 <= this.pagination.maxPages
        this.pagination.canGoPrev = true
    }
}