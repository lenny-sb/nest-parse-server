import { OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
export declare class ParseServerExplorer implements OnModuleInit {
    private readonly discoveryService;
    private readonly metadataScanner;
    private readonly reflector;
    constructor(discoveryService: DiscoveryService, metadataScanner: MetadataScanner, reflector: Reflector);
    onModuleInit(): void;
    explore(): void;
    parseCloudSetName(funcName: 'define' | 'job' | 'beforeSave' | 'afterSave', refKey: string): (instance: any, key: string) => void;
    parseCloudJob(instance: any, key: string): void;
    parseCloudFunction(instance: any, key: string): void;
    parseCloudBeforeSave(instance: any, key: string): void;
    parseCloudAfterSave(instance: any, key: string): void;
}
