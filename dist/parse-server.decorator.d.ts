import { CustomDecorator } from '@nestjs/common';
import type Parse from 'parse';
export declare function ParseCloudJob(name: string): CustomDecorator;
export declare function ParseCloudFunction(name: string): CustomDecorator;
export declare function ParseCloudBeforeSave(name: string | string[] | Object): CustomDecorator;
export declare function ParseCloudAfterSave(name: string | string[] | Parse.Object): CustomDecorator;
export declare function ParseCloudBeforeDelete(name: string | string[] | Parse.Object): CustomDecorator;
export declare function ParseCloudAfterDelete(name: string | string[] | Parse.Object): CustomDecorator;
export declare function ParseCloudBeforeFind(name: string | string[] | Parse.Object): CustomDecorator;
export declare function ParseCloudAfterFind(name: string | string[] | Parse.Object): CustomDecorator;
export declare function ParseCloudBeforeLogin(): CustomDecorator;
export declare function ParseCloudAfterLogout(): CustomDecorator;
