import { PangeaJSONSchemas } from "pangea-json-schemas";
import * as ZSchema from "z-schema";
import { UserBase } from "./UserBase";

export class UserModel extends UserBase {
  constructor(data: Ctek.UserInterface) {
    super(data);
    this.jsonSchema = JSON.parse(PangeaJSONSchemas.GetSchema("models/UserInterface.json").toString());
    this.validator = new ZSchema(this.validationOptions);
  }
}
