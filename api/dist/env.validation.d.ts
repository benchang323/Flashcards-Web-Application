declare enum Environment {
    Development = "development",
    Production = "production",
    Test = "test",
    Provision = "provision"
}
declare class EnvironmentVariables {
    DB_HOST: string;
    DB_PORT: number;
    DB_USER: string;
    NODE_ENV: Environment;
    JWT_SECRET: string;
    DB_PASSWORD: string;
    DB_NAME: string;
    JWT_EXPIRATION: string;
}
export declare function validate(config: Record<string, unknown>): EnvironmentVariables;
export {};
