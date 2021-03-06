"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var pangea_json_schemas_1 = require("pangea-json-schemas");
var ZSchema = require("z-schema");
var UserBase_1 = require("./UserBase");
var UserModel = (function (_super) {
    __extends(UserModel, _super);
    function UserModel(data) {
        var _this = _super.call(this, data) || this;
        _this.jsonSchema = JSON.parse(pangea_json_schemas_1.PangeaJSONSchemas.GetSchema("models/UserInterface.json").toString());
        _this.validator = new ZSchema(_this.validationOptions);
        return _this;
    }
    return UserModel;
}(UserBase_1.UserBase));
exports.UserModel = UserModel;
