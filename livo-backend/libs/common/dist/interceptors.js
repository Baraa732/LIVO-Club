"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutInterceptor = exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const response_1 = require("./response");
let TransformInterceptor = class TransformInterceptor {
    intercept(_ctx, next) {
        return next.handle().pipe((0, operators_1.map)(data => {
            if (data instanceof response_1.ApiResponse)
                return data;
            return response_1.ApiResponse.ok(data);
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
let TimeoutInterceptor = class TimeoutInterceptor {
    intercept(_ctx, next) {
        return next.handle().pipe((0, operators_1.timeout)(10000), (0, operators_1.catchError)(err => {
            if (err.name === 'TimeoutError') {
                return (0, rxjs_1.throwError)(() => new common_1.HttpException('Request timeout', common_1.HttpStatus.GATEWAY_TIMEOUT));
            }
            return (0, rxjs_1.throwError)(() => err);
        }));
    }
};
exports.TimeoutInterceptor = TimeoutInterceptor;
exports.TimeoutInterceptor = TimeoutInterceptor = __decorate([
    (0, common_1.Injectable)()
], TimeoutInterceptor);
//# sourceMappingURL=interceptors.js.map