import { ModuleMetadata } from '@nestjs/common';
export * from './parse-server.module';
export * from './parse-server.service';
export * from './parse-server.decorator';
export interface ParseServerOptionsInterface {
    appId: string;
    masterKey: string;
    serverURL: string;
    masterKeyIps?: string[];
    appName?: string;
    allowHeaders?: string[];
    allowOrigin?: string;
    analyticsAdapter?: any;
    filesAdapter?: any;
    push?: any;
    scheduledPush?: boolean;
    loggerAdapter?: any;
    jsonLogs?: boolean;
    logsFolder?: string;
    verbose?: boolean;
    logLevel?: string;
    maxLogFiles?: number | string;
    silent?: boolean;
    databaseURI: string;
    databaseOptions?: string;
    databaseAdapter?: any;
    cloud?: string;
    collectionPrefix?: string;
    clientKey?: string;
    javascriptKey?: string;
    dotNetKey?: string;
    encryptionKey?: string;
    restAPIKey?: string;
    readOnlyMasterKey?: string;
    webhookKey?: string;
    fileKey?: string;
    preserveFileName?: boolean;
    userSensitiveFields?: string[];
    protectedFields?: any;
    enableAnonymousUsers?: boolean;
    allowClientClassCreation?: boolean;
    allowCustomObjectId?: boolean;
    auth?: any;
    maxUploadSize?: string;
    verifyUserEmails?: boolean;
    preventLoginWithUnverifiedEmail?: boolean;
    emailVerifyTokenValidityDuration?: number;
    emailVerifyTokenReuseIfValid?: boolean;
    accountLockout?: any;
    passwordPolicy?: any;
    cacheAdapter?: any;
    emailAdapter?: any;
    publicServerURL?: string;
    pages?: any;
    customPages?: any;
    liveQuery?: any;
    sessionLength?: number;
    maxLimit?: number;
    expireInactiveSessions?: boolean;
    revokeSessionOnPasswordReset?: boolean;
    cacheTTL?: number;
    cacheMaxSize?: number;
    directAccess?: boolean;
    enableExpressErrorHandler?: boolean;
    objectIdSize?: number;
    port?: number;
    host?: string;
    mountPath?: string;
    cluster?: number | boolean;
    middleware?: (() => void) | string;
    startLiveQueryServer?: boolean;
    liveQueryServerOptions?: any;
    idempotencyOptions?: any;
    fileUpload?: any;
    graphQLSchema?: string;
    mountGraphQL?: boolean;
    graphQLPath?: string;
    mountPlayground?: boolean;
    playgroundPath?: string;
    serverStartComplete?: (error?: Error) => void;
    serverCloseComplete?: () => void;
    security?: any;
}
export interface ParseServerModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
    useFactory?: (...args: any[]) => ParseServerOptionsInterface | Promise<ParseServerOptionsInterface>;
    inject?: any[];
}
