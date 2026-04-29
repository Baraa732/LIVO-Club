import { ClientKafka } from '@nestjs/microservices';
export declare abstract class BaseGatewayService {
    protected send<T>(client: ClientKafka, pattern: string, payload: unknown): Promise<T>;
}
