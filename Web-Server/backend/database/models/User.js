module.exports = {
  userid: {
    type: "string"
  },
  email: {
    type: "string",
    required: true,
    primary: true
  },
  password: {
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
  friend: {
    type: "relationship",
    target: "Person",
    relationship: "friends",
    direction: "out",
    properties: {
      since: "date"
    },
    eager: true
  }
};
