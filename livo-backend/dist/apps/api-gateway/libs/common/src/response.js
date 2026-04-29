"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaginatedResponse = exports.ApiResponse = void 0;
class ApiResponse {
    constructor(data, message, success = true) {
        this.success = success;
        this.data = data;
        this.message = message;
        this.timestamp = new Date().toISOString();
    }
    static ok(data, message) {
        return new ApiResponse(data, message, true);
    }
    static fail(message) {
        return new ApiResponse(undefined, message, false);
    }
}
exports.ApiResponse = ApiResponse;
class PaginatedResponse extends ApiResponse {
    constructor(data, total, page, limit) {
        super(data);
        this.total = total;
        this.page = page;
        this.limit = limit;
    }
}
exports.PaginatedResponse = PaginatedResponse;
//# sourceMappingURL=response.js.map