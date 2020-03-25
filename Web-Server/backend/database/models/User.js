module.exports = {
  email: {
    type: "string",
    required: true,
    primary: true
  },
  password: {
    type: "string",
    required: true
  },
  status: {
    type: "string",
    required: true
  },
  account_code: {
    type: "string",
    required: true
  },
  salt: {
    type: "string",
    required: true
  },
  role: "string",
  name: {
    type: "string"
  },
  surname: "string",
  birthdate: "date",
  friends: {
    type: "relationship",
    target: "User",
    relationship: "friends",
    direction: "out",
    properties: {
      relation: "string"
    },
    eager: true
  }
};
