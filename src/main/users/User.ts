import * as ZSchema from "z-schema";
import { UserBase } from "./UserBase";

export class User extends UserBase {
  constructor(data: Ctek.UserInterface) {
    super(data);
    this.jsonSchema = {
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
    this.validator = new ZSchema(this.validationOptions);
  }
}
