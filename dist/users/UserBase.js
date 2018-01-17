"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UserBase = (function () {
    function UserBase(data) {
        this.validationOptions = {
            breakOnFirstError: false,
            customValidator: this.customValidation.bind(this)
        };
        Object.assign(this, data);
    }
    UserBase.prototype.validate = function () {
        return Promise.resolve({
            valid: this.validator.validate(this, this.jsonSchema),
            errors: this.validator.getLastErrors(),
            value: this.toJSON()
        });
    };
    UserBase.prototype.getRawSchema = function () {
        return this.jsonSchema;
    };
    UserBase.prototype.toJSON = function () {
        return {
            username: this.username,
            email: this.email,
            birthYear: this.birthYear
        };
    };
    UserBase.prototype.customValidation = function (report, schema, json) {
        if (json && typeof json === "object") {
            this.checkAuthTokenPasswordPeers(report, schema, json);
            this.checkForAuthTokenOrPassword(report, schema, json);
        }
    };
    UserBase.prototype.checkAuthTokenPasswordPeers = function (report, schema, json) {
        if (json.authToken && json.password) {
            report.addCustomError("FORBIDDEN_PEER_EXCEPTION", "User cannot have both password and authToken", ["authToken", "password"], null, "user");
        }
    };
    UserBase.prototype.checkForAuthTokenOrPassword = function (report, schema, json) {
        if (!json.authToken && !json.password) {
            report.addCustomError("REQUIRED_ALTERNATIVES_EXCEPTION", "User must have either password or authToken", ["password", "authToken"], null, "user");
        }
    };
    return UserBase;
}());
exports.UserBase = UserBase;
