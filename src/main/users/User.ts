import { PangeaJSONSchemas } from "pangea-json-schemas";
import * as ZSchema from "z-schema";
import { UserBase } from "./UserBase";

export class User extends UserBase {
  constructor(data: Ctek.UserInterface) {
    super(data);
    this.jsonSchema = PangeaJSONSchemas.GetSchema("models/UserInterface.json");
    this.validator = new ZSchema(this.validationOptions);
  }
}
