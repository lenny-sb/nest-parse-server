"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseCloudAfterLogout = exports.ParseCloudBeforeLogin = exports.ParseCloudAfterFind = exports.ParseCloudBeforeFind = exports.ParseCloudAfterDelete = exports.ParseCloudBeforeDelete = exports.ParseCloudAfterSave = exports.ParseCloudBeforeSave = exports.ParseCloudFunction = exports.ParseCloudJob = void 0;
const common_1 = require("@nestjs/common");
const ParseServerConst = require("./parse-server.constants");
function ParseCloudJob(name) {
    return (0, common_1.SetMetadata)(ParseServerConst.PARSE_SERVER_CLOUD_JOB_OPTIONS, name);
}
exports.ParseCloudJob = ParseCloudJob;
function ParseCloudFunction(name) {
    return (0, common_1.SetMetadata)(ParseServerConst.PARSE_SERVER_CLOUD_FUNC_OPTIONS, name);
}
exports.ParseCloudFunction = ParseCloudFunction;
function ParseCloudBeforeSave(name) {
    return (0, common_1.SetMetadata)(ParseServerConst.PARSE_SERVER_CLOUD_BEFORE_SAVE_OPTIONS, name);
}
exports.ParseCloudBeforeSave = ParseCloudBeforeSave;
function ParseCloudAfterSave(name) {
    return (0, common_1.SetMetadata)(ParseServerConst.PARSE_SERVER_CLOUD_AFTER_SAVE_OPTIONS, name);
}
exports.ParseCloudAfterSave = ParseCloudAfterSave;
function ParseCloudBeforeDelete(name) {
    return (0, common_1.SetMetadata)(ParseServerConst.PARSE_SERVER_CLOUD_BEFORE_DELETE_OPTIONS, name);
}
exports.ParseCloudBeforeDelete = ParseCloudBeforeDelete;
function ParseCloudAfterDelete(name) {
    return (0, common_1.SetMetadata)(ParseServerConst.PARSE_SERVER_CLOUD_AFTER_DELETE_OPTIONS, name);
}
exports.ParseCloudAfterDelete = ParseCloudAfterDelete;
function ParseCloudBeforeFind(name) {
    return (0, common_1.SetMetadata)(ParseServerConst.PARSE_SERVER_CLOUD_BEFORE_FIND_OPTIONS, name);
}
exports.ParseCloudBeforeFind = ParseCloudBeforeFind;
function ParseCloudAfterFind(name) {
    return (0, common_1.SetMetadata)(ParseServerConst.PARSE_SERVER_CLOUD_AFTER_FIND_OPTIONS, name);
}
exports.ParseCloudAfterFind = ParseCloudAfterFind;
function ParseCloudBeforeLogin() {
    return (0, common_1.SetMetadata)(ParseServerConst.PARSE_SERVER_CLOUD_BEFORE_LOGIN_OPTIONS, true);
}
exports.ParseCloudBeforeLogin = ParseCloudBeforeLogin;
function ParseCloudAfterLogout() {
    return (0, common_1.SetMetadata)(ParseServerConst.PARSE_SERVER_CLOUD_AFTER_LOGOUT_OPTIONS, true);
}
exports.ParseCloudAfterLogout = ParseCloudAfterLogout;
