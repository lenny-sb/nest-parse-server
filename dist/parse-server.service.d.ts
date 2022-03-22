import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost } from '@nestjs/core';
import { ParseServerOptionsInterface } from '.';
export declare class ParseServerService {
    private readonly configService;
    private adapterHost;
    private readonly logger;
    private static parseServer;
    private readonly parseOptions;
    readonly parseGraphQLServer: any;
    readonly expressApp: any;
    private static dashboard;
    private dashboardConfig;
    constructor(configService: ConfigService, adapterHost: HttpAdapterHost, providerOptions: ParseServerOptionsInterface);
    onApplicationBootstrap(): void;
    startQueryServer(): void;
    getParseServer(): any;
    getConfig(): ParseServerOptionsInterface;
    private getParseOptionFromEnv;
    getDashBoard(): any;
    getDashboardConfig(): any;
}
