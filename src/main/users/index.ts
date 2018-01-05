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
      "type": "string"
    }
  }
};

export class User {

  constructor(data: any) {
    Object.assign(this, data);
  }

  getRawSchema() {
    return jsonSchema;
  }

  showTestString(): string {
    return "this is a test";
  }
}
