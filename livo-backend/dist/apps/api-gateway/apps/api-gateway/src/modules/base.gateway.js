"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGatewayService = void 0;
const rxjs_1 = require("rxjs");
class BaseGatewayService {
    async send(client, pattern, payload) {
        return (0, rxjs_1.firstValueFrom)(client.send(pattern, payload).pipe((0, rxjs_1.timeout)(8000), (0, rxjs_1.catchError)(err => (0, rxjs_1.throwError)(() => err))));
    }
}
exports.BaseGatewayService = BaseGatewayService;
//# sourceMappingURL=base.gateway.js.map