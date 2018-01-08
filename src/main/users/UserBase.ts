export interface UserInterface {
  username: string;
  password?: string;
  authToken?: string;
  email: string;
  birthYear: string;
}

export interface ValidationResult {
  errors: ZSchema.SchemaErrorDetail[];
  valid: boolean;
  value: UserInterface;
}

const jsonSchema = {
  "type": "object",
  "id": "user",
  "properties": {
    "_id": {
      "type": "string"
    },
    "username": {
      "type": "string"
    },
    "password": {
      "type": "string",
      "pattern": "^[a-zA-Z0-9]{3,30}$"
    },
    "authToken": {
      "type": ["string", "integer"]
    },
    "birthYear": {
      "type": "integer",
      "minimum": 1900,
      "maximum": 2013
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  },
  "required": ["username", "email", "birthYear"]
};

export class UserBase implements UserInterface {

  public validationOptions: ZSchema.Options = {
    breakOnFirstError: false,
    customValidator: this.customValidation.bind(this)
  };
  public validator: ZSchema;
  public username: string;
  public password: string;
  public authToken: string;
  public email: string;
  public birthYear: string;

  public constructor(data: any) {
    Object.assign(this, data);
  }

  public validate(): Promise<ValidationResult> {
    return Promise.resolve({
      valid: this.validator.validate(this, jsonSchema),
      errors: this.validator.getLastErrors(),
      value: this.toJSON()
    });
  }

  public getRawSchema() {
    return jsonSchema;
  }

  public toJSON(): UserInterface {
    return {
      username: this.username,
      email: this.email,
      birthYear: this.birthYear
    };
  }

  private customValidation(report: any, schema: any, json: UserInterface) {
    if (json && typeof json === "object") {
      this.checkAuthTokenPasswordPeers(report, schema, json);
      this.checkForAuthTokenOrPassword(report, schema, json);
    }
  }

  private checkAuthTokenPasswordPeers(report: any, schema: any, json: any): void {
    if (json.authToken && json.password) {
      report.addCustomError(
        "FORBIDDEN_PEER_EXCEPTION",
        "User cannot have both password and authToken",
        ["authToken", "password"],
        null,
        "user"
      );
    }
  }

  private checkForAuthTokenOrPassword(report: any, schema: any, json: any): void {
    if (!json.authToken && !json.password) {
      report.addCustomError(
        "REQUIRED_ALTERNATIVES_EXCEPTION",
        "User must have either password or authToken",
        ["password", "authToken"],
        null,
        "user"
      );
    }
  }
}
