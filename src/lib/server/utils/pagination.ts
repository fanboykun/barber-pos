export class Pagination 
{
    pagination = {
        maxPages: 1,
        currentPage: 1,
        take: 10,
        skip: 0,
        showing: {
            from: 0,
            to: 0,
            of: 0
        }
    }

    private maxData: number = 0

    constructor(maxData: number|null) {
        if(maxData && maxData > 0) { this.maxData = maxData }
        this.pagination.maxPages = Math.ceil(this.maxData / 10)
        this.pagination.showing.from = 1
        this.pagination.showing.to = this.maxData >= this.pagination.take ? this.pagination.take : this.maxData
        this.pagination.showing.of = this.maxData
    }

    move(page: number) {
        if(page > 1 && this.maxData && this.maxData > 0) {
            this.pagination.currentPage = page
            this.pagination.skip = this.pagination.currentPage > 1 && this.pagination.currentPage <= this.pagination.maxPages ? this.pagination.skip + this.pagination.take : 0
            this.pagination.showing.from = this.pagination.skip + 1
            this.pagination.showing.to = this.pagination.showing.from + (this.maxData - this.pagination.showing.from)
        }
    }
}