import * as ZSchema from "z-schema";

export interface UserInterface {
  username: string;
  password?: string;
  authToken: string;
  email: string;
  birthYear: string;
}

export interface ValidationError {
  error: string;
}

const jsonSchema = {
  "type": "object",
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
    "access_token": {
      "type": ["string", "integer"]
    },
    "birthyear": {
      "type": "integer",
      "minimum": 1900,
      "maximum": 2013
    },
    "email": {
      "type": "string",
      "format": "email"
    }
  }
};

let validator: ZSchema;

export class User implements UserInterface {

  username: string;
  password: string;
  authToken: string;
  email: string;
  birthYear: string;

  public constructor(data: any) {
    validator = new ZSchema({ breakOnFirstError: false });
    Object.assign(this, data);
  }

  public validate() {
    validator.validate(this, jsonSchema);
  }

  public getRawSchema() {
    return jsonSchema;
  }

  // private checkForPasswordAndAuthToken(): Promise<ValidationError | void> {
  //   if (this.authToken && this.password) {
  //     return Promise.resolve({
  //       error: "Peer error: auth token and password not allowed in same user"
  //     });
  //   }
  //   return Promise.resolve();
  // }
}
