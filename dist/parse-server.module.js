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
var ParseServerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseServerModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const parse_server_constants_1 = require("./parse-server.constants");
const parse_server_explorer_1 = require("./parse-server.explorer");
const parse_server_service_1 = require("./parse-server.service");
const debug = require('debug')('nest-parse-server:ParseServerModule');
let ParseServerModule = ParseServerModule_1 = class ParseServerModule {
    constructor(parseServerService) {
        this.parseServerService = parseServerService;
        this.logger = new common_1.Logger(ParseServerModule_1.name);
    }
    onModuleInit() { }
    configure(consumer) {
        const dashboard = this.parseServerService.getDashBoard();
        if (dashboard) {
            let { mountPath: dashboardMountPath, dashboardPublicURL } = this.parseServerService.getDashboardConfig();
            this.logger.log('dashboard: ' + dashboardPublicURL);
            consumer.apply(dashboard).forRoutes(dashboardMountPath || 'dashboard');
        }
        const { mountPath, graphQLPath, publicServerURL } = this.parseServerService.getConfig();
        this.logger.log('parse-server: ' + publicServerURL);
        consumer
            .apply(this.parseServerService.getParseServer().app)
            .forRoutes(mountPath);
        if (Reflect.has(this.parseServerService.parseGraphQLServer || {}, 'app')) {
            this.logger.log('parse-GraphQLServer path: ' + graphQLPath);
            consumer
                .apply(this.parseServerService.parseGraphQLServer.app)
                .forRoutes(graphQLPath);
        }
    }
    static forRootAsync(options) {
        return {
            module: ParseServerModule_1,
            imports: options.imports,
            providers: [
                {
                    provide: parse_server_constants_1.PARSE_SERVER_OPTION_PROVIDER,
                    useFactory: options.useFactory,
                    inject: options.inject || [],
                },
                parse_server_explorer_1.ParseServerExplorer,
                parse_server_service_1.ParseServerService,
            ],
            exports: [],
            global: true,
        };
    }
};
ParseServerModule = ParseServerModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [core_1.DiscoveryModule],
        providers: [parse_server_service_1.ParseServerService, parse_server_explorer_1.ParseServerExplorer],
        exports: [parse_server_service_1.ParseServerService, parse_server_explorer_1.ParseServerExplorer],
    }),
    __metadata("design:paramtypes", [parse_server_service_1.ParseServerService])
], ParseServerModule);
exports.ParseServerModule = ParseServerModule;
