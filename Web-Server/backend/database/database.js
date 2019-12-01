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

function updateAccountData(userid, newData) {
  return instance.findById("User", userid).then(userDb => {
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
          console.log(err);
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
        userid: user.id(),
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

function find_friends(personid) {
  return instance.cypher("MATCH (me:Person)-[:friends {relation:'request_accepted'}]-(friends:Person) WHERE id(me)=" + personid + " RETURN friends").catch(e=>{console.log(e)})
}

const get_ids_of_my_friends = async (personid) => {
  const users = await find_friends(personid)
  var tab = []
  console.log(users ? "Succesfully found "+users.records.length+" users":"No users found")
  Promise.all(
      users.records.map(x => { tab.push(x._fields[0].identity.low)})).catch(e=>{console.log(e)})
  return tab
}

get_ids_of_my_friends(371).then(res => { console.log(res) })


function makerelationshipbetween(uid1, uid2, relation_type) {
  Promise.all([
      instance.findById("Person", uid1),
      instance.findById("Person", uid2)
  ])
      .then(([user1, user2]) => {
          user1.relateTo(user2, 'friends', { relation: relation_type })
              .then(res => {
                  console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('relation'));
              }).catch((e) => {
                  console.log("Failed to create relationship \n" + e);
              })
      });
}

function changerelation(user1,user2,relation_type){
  instance.cypher("match (user1:Person)-[rel:friends]-(user2:Person) where id(user1)="+user1+" and id(user2)="+user2+" set rel.relation=relation_type return  rel.relation",{relation_type:relation_type}).then(res=>{console.log("Success")}).catch(e=>{console.log(e)})
}

var relation_type=["accepted_request","send_request","rejected_request","deleted"]

module.exports = {
  createUserNode,
  findUserByEmail,
  findUserById,
  deleteUserByEmail,
  updateAccountData,
  getAllUsers
};
