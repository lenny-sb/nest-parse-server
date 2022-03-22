import { DynamicModule, MiddlewareConsumer, OnModuleInit } from '@nestjs/common';
import { ParseServerService } from './parse-server.service';
import { ParseServerModuleAsyncOptions } from '.';
export declare class ParseServerModule implements OnModuleInit {
    private readonly parseServerService;
    private readonly logger;
    constructor(parseServerService: ParseServerService);
    onModuleInit(): void;
    configure(consumer: MiddlewareConsumer): void;
    static forRootAsync(options: ParseServerModuleAsyncOptions): DynamicModule;
}
