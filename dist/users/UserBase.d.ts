export interface ValidationResult {
    errors: ZSchema.SchemaErrorDetail[];
    valid: boolean;
    value: Ctek.UserInterface;
}
export declare class UserBase implements Ctek.UserInterface {
    validationOptions: ZSchema.Options;
    validator: ZSchema;
    username: string;
    password: string;
    authToken: string;
    email: string;
    birthYear: number;
    protected jsonSchema: any;
    constructor(data: any);
    validate(): Promise<ValidationResult>;
    getRawSchema(): any;
    toJSON(): Ctek.UserInterface;
    private customValidation(report, schema, json);
    private checkAuthTokenPasswordPeers(report, schema, json);
    private checkForAuthTokenOrPassword(report, schema, json);
}
