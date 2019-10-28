const Neode = require("neode");

//connecting to db
const instance = new Neode.fromEnv();
const builder = instance.query();
instance.setEnterprise(true);
//loading models
instance.with({
  User: require("./models/User")
});

//creating User node
async function createUserNode(properties) {
  instance
    .create("User", properties)
    .then(User => {
      console.log("User: " + User.get("email") + " created");
    })
    .catch(e => {
      console.log("Failed to create node \n" + e);
    });
}

function findUserByEmail(paramemail) {
  return instance.first("User", { email: paramemail }).then(user => {
    if (user) {
      return {
        email: user.get("email"),
        password: user.get("password"),
        salt: user.get("salt"),
        role: user.get("role")
      };
    } else {
      throw new Error("User not found");
    }
  });
}

function findUserByName(paramname) {
  var imie = null;
  instance
    .cypher("MATCH (p:User {name: {name}}) RETURN p", { name: paramname })
    .then(res => {
      console.log(/*JSON.jsonify*/ res.length);
      console.log(/*JSON.jsonify*/ res.records[28]._fields[0].properties);
      console.log(/*JSON.jsonify*/ res.records[28]._fields[0].properties.name);
      imie = res.records[28]._fields[0].properties.name;
      return imie;
    });
}

//id is element defined in ogm-in this case it's userid which is string
function findUserByID(id) {
  instance
    .find("User", id)
    .then(User => {
      console.log("User found with id: " + User.get("userid"));
    })
    .catch(e => {
      console.log("Failed to find User with id: " + id + e);
    });
}

function dropAllNodes() {
  instance
    .deleteAll("User")
    .then(() => console.log("Everyone has been deleted"));
}

function findUser() {
  instance.first("User", { name: "Przemek" }).then(przemek => {
    console.log(przemek.get("email"));
  });
}

module.exports = { createUserNode, findUserByEmail };
