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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseServerExplorer = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const Parse = require('parse/node');
const ParseServerConst = require("./parse-server.constants");
let ParseServerExplorer = class ParseServerExplorer {
    constructor(discoveryService, metadataScanner, reflector) {
        this.discoveryService = discoveryService;
        this.metadataScanner = metadataScanner;
        this.reflector = reflector;
    }
    onModuleInit() {
        this.explore();
    }
    explore() {
        const providers = this.discoveryService.getProviders();
        providers.forEach((wrapper) => {
            const { instance } = wrapper;
            if (!instance) {
                return;
            }
            this.metadataScanner.scanFromPrototype(instance, Object.getPrototypeOf(instance), (key) => {
                this.parseCloudJob(instance, key);
                this.parseCloudFunction(instance, key);
                this.parseCloudBeforeSave(instance, key);
                this.parseCloudAfterSave(instance, key);
            });
        });
    }
    parseCloudSetName(funcName, refKey) {
        return (instance, key) => {
            const name = this.reflector.get(refKey, instance[key]);
            if (!name) {
                return;
            }
            if (Array.isArray(name)) {
                name.forEach((myName) => {
                    Parse.Cloud[funcName](myName, instance[key].bind(instance));
                });
            }
            if (name) {
                Parse.Cloud[funcName](name, instance[key].bind(instance));
            }
        };
    }
    parseCloudJob(instance, key) {
        this.parseCloudSetName('job', ParseServerConst.PARSE_SERVER_CLOUD_JOB_OPTIONS)(instance, key);
    }
    parseCloudFunction(instance, key) {
        this.parseCloudSetName('define', ParseServerConst.PARSE_SERVER_CLOUD_FUNC_OPTIONS)(instance, key);
    }
    parseCloudBeforeSave(instance, key) {
        this.parseCloudSetName('beforeSave', ParseServerConst.PARSE_SERVER_CLOUD_BEFORE_SAVE_OPTIONS)(instance, key);
    }
    parseCloudAfterSave(instance, key) {
        this.parseCloudSetName('afterSave', ParseServerConst.PARSE_SERVER_CLOUD_AFTER_SAVE_OPTIONS)(instance, key);
    }
};
ParseServerExplorer = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.DiscoveryService,
        core_1.MetadataScanner,
        core_1.Reflector])
], ParseServerExplorer);
exports.ParseServerExplorer = ParseServerExplorer;
