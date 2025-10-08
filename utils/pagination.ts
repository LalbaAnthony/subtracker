import { Pagination } from '@/types/pagination'

function validate(page?: number, limit?: number, count?: number): void {
    if (limit && limit > 100) throw new Error('limit cannot exceed 100 posts') // To prevent abuse
    if (limit && limit < 1) throw new Error('Limit must be greater than 0')
    if (page && page < 1) throw new Error('Page must be greater than 0')
    if (count && limit && page && Math.ceil(count / limit) < page) throw new Error('Page exceeds total pages')
}

export function paginate(page: number, limit: number, count: number): Pagination {
    validate(page, limit, count)

    if (count === 0) return { page: 1, limit, total: 0, offset: 0 }

    const total: number = Math.ceil(count / limit)
    const offset: number = (page - 1) * limit
    const pagination: Pagination = { page, limit, total, offset }

    return pagination
}