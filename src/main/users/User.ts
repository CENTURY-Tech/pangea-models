import * as ZSchema from "z-schema";
import { UserBase, UserInterface } from "./UserBase";

export class User extends UserBase {
  constructor(data: UserInterface) {
    super(data);
    this.validator = new ZSchema(this.validationOptions);
  }
}
