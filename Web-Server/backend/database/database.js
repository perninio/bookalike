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
  resp = await instance
    .create("User", properties)
    .then(user => {
      return {
        userid: user.id()
      };
    })
    .catch(e => {
      console.log("Failed to create node \n" + e);
    });
  return resp;
}

function findUserByEmail(paramemail) {
  return instance.first("User", { email: paramemail }).then(user => {
    if (user) {
      return {
        userid: user.id(),
        email: user.get("email"),
        password: user.get("password"),
        salt: user.get("salt"),
        role: user.get("role"),
        status: user.get("status")
      };
    } else {
      throw new Error("User not found");
    }
  });
}

function updateAccountData(user, newData) {
  return instance.first("User", { email: user.email }).then(userDb => {
    if (userDb) {
      return userDb
        .update(newData)
        .then(userUpdated => {
          return {
            userid: userUpdated.id(),
            email: userUpdated.get("email"),
            role: userUpdated.get("role"),
            status: userUpdated.get("status")
          };
        })
        .catch(err => {
          throw new Error("Can't update user's data");
        });
    } else {
      throw new Error("User not found");
    }
  });
}

function findUserById(id) {
  return instance.findById("User", id).then(user => {
    if (user) {
      return {
        userid: user.id(),
        email: user.get("email"),
        password: user.get("password"),
        salt: user.get("salt"),
        role: user.get("role"),
        account_code: user.get("account_code"),
        status: user.get("status")
      };
    } else {
      throw new Error("User not found");
    }
  });
}

async function getAllUsers() {
  let resp = await instance.all("User").then(users => {
    data = users.map(user => {
      return {
        email: user.get("email"),
        role: user.get("role"),
        account_code: user.get("account_code"),
        status: user.get("status")
      };
    });
    return data;
  });
  return resp;
}

// TODO: FIX
function deleteUserByEmail(paramemail) {
  return instance.first("User", { email: paramemail }).then(user => {
    if (user) {
      user.delete();
      return;
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

module.exports = {
  createUserNode,
  findUserByEmail,
  findUserById,
  deleteUserByEmail,
  updateAccountData,
  getAllUsers
};
