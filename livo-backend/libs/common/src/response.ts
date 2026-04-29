// ─── Base Response ────────────────────────────────────────────────────────────
export class ApiResponse<T = unknown> {
  success: boolean
  data?: T
  message?: string
  timestamp: string

  constructor(data?: T, message?: string, success = true) {
    this.success = success
    this.data = data
    this.message = message
    this.timestamp = new Date().toISOString()
  }

  static ok<T>(data: T, message?: string) {
    return new ApiResponse(data, message, true)
  }

  static fail(message: string) {
    return new ApiResponse(undefined, message, false)
  }
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export class PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number
  page: number
  limit: number

  constructor(data: T[], total: number, page: number, limit: number) {
    super(data)
    this.total = total
    this.page = page
    this.limit = limit
  }
}
