"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ParseServerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseServerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const uuid = require('uuid');
const { default: ParseServer, ParseGraphQLServer, InMemoryCacheAdapter, logger, } = require('parse-server');
const { ParseServerOptions, LiveQueryOptions, } = require('parse-server/lib/Options/Definitions');
const parseDashboard = require('parse-dashboard/Parse-Dashboard/app');
const express = require('express');
const url = require('url');
const debug = require('debug')('nest-parse-server:ParseServerService');
let ParseServerService = ParseServerService_1 = class ParseServerService {
    constructor(configService, adapterHost, providerOptions) {
        this.configService = configService;
        this.adapterHost = adapterHost;
        this.logger = new common_1.Logger(ParseServerService_1.name);
        this.dashboardConfig = undefined;
        const parseOptions = (this.parseOptions = this.getConfig());
        const options = this.parseOptions;
        if (providerOptions) {
            Object.assign(options, providerOptions);
            debug('providerOptions', options);
        }
        const parseServer = (ParseServerService_1.parseServer = new ParseServer(options));
        if (options.mountGraphQL === true) {
            this.parseGraphQLServer = new ParseGraphQLServer(parseServer, {
                graphQLPath: '*',
            });
            const app = new express();
            this.parseGraphQLServer.applyGraphQL(app);
            this.parseGraphQLServer.app = app;
        }
    }
    onApplicationBootstrap() {
        this.startQueryServer();
    }
    startQueryServer() {
        let parseOptions = this.getConfig();
        if (parseOptions.liveQuery !== undefined &&
            Array.isArray(parseOptions.liveQuery.classNames) &&
            parseOptions.liveQuery.classNames.length > 0) {
            this.logger.log('Parse-LiveQueryServer live classes: ' +
                parseOptions.liveQuery.classNames.join(','));
            ParseServer.createLiveQueryServer(this.adapterHost.httpAdapter.getHttpServer(), this.parseOptions.liveQuery);
        }
        else {
            this.logger.log('Parse-LiveQueryServer: 不启用liveq query');
        }
    }
    getParseServer() {
        return ParseServerService_1.parseServer;
    }
    getConfig() {
        if (this.parseOptions) {
            return this.parseOptions;
        }
        const config = this.getParseOptionFromEnv();
        if (!Reflect.has(config, 'loggerAdapter')) {
            let PARSE_SERVER_LOGGER_ADAPTER = {
                module: 'parse-server/lib/Adapters/Logger/WinstonLoggerAdapter',
                options: {
                    logsFolder: './logs',
                    jsonLogs: true,
                    logLevel: 'debug',
                    silent: false,
                    maxLogFiles: 10,
                },
            };
            Reflect.set(config, 'loggerAdapter', PARSE_SERVER_LOGGER_ADAPTER);
        }
        if (!Reflect.has(config, 'cacheAdapter')) {
            let PARSE_SERVER_CACHE_ADAPTER = {
                module: 'parse-server/lib/Adapters/Cache/InMemoryCacheAdapter',
                options: {
                    ttl: 5000,
                    maxSize: 10000,
                },
            };
            Reflect.set(config, 'cacheAdapter', PARSE_SERVER_CACHE_ADAPTER);
        }
        config.serverStartComplete = (err) => {
            if (err) {
                this.logger.error(err);
            }
            else {
                this.logger.log('on serverStartComplete');
            }
        };
        return config;
    }
    getParseOptionFromEnv() {
        let getOptionFromDefinitions = (Definitions) => {
            let options = {};
            Object.keys(Definitions).forEach((key) => {
                let { env, action } = Reflect.get(Definitions, key);
                let value = this.configService.get(env);
                if (value !== undefined) {
                    Reflect.set(options, key, typeof action === 'function' ? action(value) : value);
                }
            });
            return options;
        };
        const liveQuery = getOptionFromDefinitions(LiveQueryOptions);
        const parseOptions = getOptionFromDefinitions(ParseServerOptions);
        Reflect.set(parseOptions, 'liveQuery', liveQuery);
        return parseOptions;
    }
    getDashBoard() {
        if (ParseServerService_1.dashboard) {
            return ParseServerService_1.dashboard;
        }
        let config = this.getDashboardConfig();
        if (!config) {
            return;
        }
        debug('getDashBoard this.dashboard', config);
        let dash = parseDashboard(config, {
            allowInsecureHTTP: true,
            cookieSessionSecret: uuid.v4(),
            dev: true,
        });
        let app = express();
        app.use(config.mountPath, dash);
        ParseServerService_1.dashboard = dash;
        return dash;
    }
    getDashboardConfig() {
        if (this.dashboardConfig) {
            return this.dashboardConfig;
        }
        if (!this.configService.get('PARSE_DASHBOARD_MOUNTPATH')) {
            return;
        }
        const { publicServerURL, appId, masterKey, readOnlyMasterKey, graphQLPath, } = this.getConfig();
        this.dashboardConfig = {
            apps: [
                {
                    serverURL: publicServerURL,
                    graphQLServerURL: this.parseOptions.mountGraphQL &&
                        url.resolve(publicServerURL, graphQLPath),
                    appId: appId,
                    masterKey: masterKey,
                    readOnlyMasterKey: readOnlyMasterKey,
                    appName: this.configService.get('PARSE_DASHBOARD_APP_NAME', 'parse-server'),
                    production: true,
                    primaryBackgroundColor: this.configService.get('PARSE_DASHBOARD_PRIMARY_COLOR', '#0c5582'),
                    secondaryBackgroundColor: this.configService.get('PARSE_DASHBOARD_SECONDARY_COLOR', '#169cee;'),
                },
            ],
            users: [
                {
                    user: this.configService.get('PARSE_DASHBOARD_USERNAME', 'admin'),
                    pass: this.configService.get('PARSE_DASHBOARD_PASSWORD', uuid.v4()),
                    apps: [{ appId }],
                },
                {
                    user: this.configService.get('PARSE_DASHBOARD_USERNAME_RO', 'user'),
                    pass: this.configService.get('PARSE_DASHBOARD_PASSWORD_RO', uuid.v4()),
                    apps: [{ appId, readOnly: true }],
                },
            ],
            trustProxy: true,
            mountPath: this.configService.get('PARSE_DASHBOARD_MOUNTPATH', '/dashboard'),
            dashboardPublicURL: url.resolve(publicServerURL, this.configService.get('PARSE_DASHBOARD_MOUNTPATH', '/dashboard')),
        };
        if (this.dashboardConfig.mountPath.indexOf('/') !== 0) {
            this.dashboardConfig.mountPath = '/' + this.dashboardConfig.mountPath;
        }
        return this.dashboardConfig;
    }
};
ParseServerService.dashboard = undefined;
ParseServerService = ParseServerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)('PARSE_SERVER_OPTION_PROVIDER')),
    __metadata("design:paramtypes", [config_1.ConfigService,
        core_1.HttpAdapterHost, Object])
], ParseServerService);
exports.ParseServerService = ParseServerService;
