const Neode = require('neode');
//connecting to db
const instance = new Neode.fromEnv()
const builder = instance.query()
instance.setEnterprise(true)
//loading models
instance.with({
    User: require("./models/User")
});

//creating User node 
function createUserNode(properties) {
    instance.create('User', properties)
        .then(User => {
            console.log("User: " + User.get('userid') + " created");
        }).catch((e) => {
            console.log("Failed to create node \n" + e)
        })
}

//example creating User
//createUserNode({name:'Przemek'})//no success, missing min required data:userid,email,name,password
//createUserNode({userid:'przemek.1',name:'Przemek',email:'user@gmail.com',password:'admin1'})//success
//find User by name with cypher qurey language
function findUserByName(paramname) {
    var imie = null
    instance.cypher('MATCH (p:User {name: {name}}) RETURN p', { name: paramname })
        .then(res => {
            console.log(/*JSON.jsonify*/(res.length))
            console.log(/*JSON.jsonify*/(res.records[28]._fields[0].properties))
            console.log(/*JSON.jsonify*/(res.records[28]._fields[0].properties.name))
            imie = res.records[28]._fields[0].properties.name
        })
}
//example
//console.log("imie:"+findUserByName('Przemek'))//oanswer undenified due to asynchronues javascript

//id is element defined in ogm-in this case it's userid which is string
function findUserByPrimaryID(id) {
    instance.find('User', id)
        .then(User => {
            console.log("User found with id: " + User.get('userid'))
        }).catch((e) => {
            console.log("Failed to find User with id: " + id + e)
        })

}

//delete all nodes
function dropAllNodes() {
    instance.deleteAll('User')
        .then(() => console.log('Everyone has been deleted'));
}

//find User by name



//create relationship for two User
function makerelationship() {
    Promise.all([
        instance.create('User', { email: 'user2@gmail.com', password: 'admin2' ,status:"public"}),
        instance.create('User', { email: 'user3@gmail.com', password: 'admin4',status:"public" }),
        instance.create('User', { email: 'user4@gmail.com', password: 'admin5',status:"public" }),
        instance.create('User', { email: 'user4@gmail.com', password: 'admin5',status:"public" }),
        instance.create('User', { email: 'user5@gmail.com', password: 'admin5',status:"public" }),
        instance.create('User', { email: 'user6@gmail.com', password: 'admin5',status:"public" }),
        instance.create('User', { email: 'user7@gmail.com', password: 'admin5',status:"public" }),
        instance.create('User', { email: 'user8@gmail.com', password: 'admin5',status:"public" })
    ])
        .then(([user1, user2, user3, user4, user5, user6, user7, user8]) => {
            user1.relateTo(user2, 'friends', { relation: 'request_send' })
                .then(res => {
                    console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('relation'));
                }).catch((e) => {
                    console.log("Failed to create relationship \n" + e);
                })
            user1.relateTo(user3, 'friends', { relation: 'request_accepted' })
                .then(res => {
                    console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('relation'));
                }).catch((e) => {
                    console.log("Failed to create relationship \n" + e);
                });
            user2.relateTo(user4, 'friends', { relation: 'request_accepted' })
                .then(res => {
                    console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('relation'));
                }).catch((e) => {
                    console.log("Failed to create relationship \n" + e);
                });
            user2.relateTo(user8, 'friends', { relation: 'request_accepted' })
                .then(res => {
                    console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('relation'));
                }).catch((e) => {
                    console.log("Failed to create relationship \n" + e);
                })
            user2.relateTo(user6, 'friends', { relation: 'request_accepted' })
                .then(res => {
                    console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('relation'));
                }).catch((e) => {
                    console.log("Failed to create relationship \n" + e);
                })
            //user3
            user3.relateTo(user4, 'friends', { relation: 'request_accepted' })
                .then(res => {
                    console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('relation'));
                }).catch((e) => {
                    console.log("Failed to create relationship \n" + e);
                });
            user3.relateTo(user7, 'friends', { relation: 'request_accepted' })
                .then(res => {
                    console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('relation'));
                }).catch((e) => {
                    console.log("Failed to create relationship \n" + e);
                });
            user3.relateTo(user5, 'friends', { relation: 'request_accepted' })
                .then(res => {
                    console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('relation'));
                }).catch((e) => {
                    console.log("Failed to create relationship \n" + e);
                })
        });
}

function makerelationshipbetween(uid1, uid2) {
    Promise.all([
        instance.create('User', { userid: 'arek.2', name: 'Arek', email: 'user2@gmail.com', password: 'admin2' }),
        instance.create('User', { userid: 'arek.3', name: 'Marek', email: 'user3@gmail.com', password: 'admin4' })
    ])
        .then(([user1, user2]) => {
            user1.relateTo(user2, 'friends', { relation: 'request_send' })
                .then(res => {
                    console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('relation'));
                }).catch((e) => {
                    console.log("Failed to create relationship \n" + e);
                })
        });
}
//setTimeout(makerelationship, 6000);


//user authorization
function login(useremail, userpassword) {
    instance.first('User', { email: useremail, password: userpassword })
        .then(result => {
            console.log("Proper email and password for user:" + result.get('email'))
            return result.get('email');
        }).catch((e) => {
            console.log("Failed to find node \n" + e)

        })
}


function findUser() {
    return instance.first('User', { name: 'Przemek' })

}

//createUserNode({userid:'przemek.1',name:'Przemek',email:'user@gmail.com',password:'admin1'})
//createUserNode({userid:'adam.2',name:'Przemek',email:'user@gmail.com',password:'admin2'})

//makerelationship()

//działa
//findUser().then(przemek => { console.log(przemek.get('email')) })

console.log("////////////////////////////")
//działa ale musi być odpowiedni index tablicy
//findUserByName()//.then(res=>console.log(/*JSON.jsonify*/(res.records[28]._fields[0].properties.name)))

function findUserByName2() {
    instance.cypher('MATCH (p:User {name: {name}}) RETURN p', { name: "Przemek" })
        .then(res => {
            console.log(res.records.length);
            console.log(/*JSON.jsonify*/(res.records[20]._fields[0].properties))
        })
}
//działa
//findUserByName2()

//znajdowanie znajomych
//tworzymy przykładową strukturę
//makerelationship()

function find_friends_of_my_friends_by_name(myname, name) { //znajduje przyjaciół moich przyjaciół po imieniu
    return instance.cypher("MATCH (:User {name: {myname}})-[:friends {relation:'request_accepted'}]-(friends:User)-[:friends {relation:'request_accepted'}]-(friend_of_myfriend:User {name:{name}})RETURN friend_of_myfriend AS users", { myname: myname, name: name })
}
//find_friends_of_my_friends_by_name("Arek", "Kamil").then(res => { console.log("Find dla imion"+res.records.length); console.log(res.records.map(user=>user.get('users'))) })

function find_friends_of_my_friends_by_id(myid, Userid) { //znajduje przyjaciół moich przyjaciół po imieniu
    return instance.cypher("MATCH (me:User)-[:friends {relation:'request_accepted'}]-(friends:User)-[:friends {relation:'request_accepted'}]-(friend_of_myfriend:User) WHERE id(me)={myid} AND id(friend_of_myfriend)={Userid} RETURN friend_of_myfriend", { myid: Number(myid), Userid: Number(Userid) })
}
//find_friends_of_my_friends_by_id(292,114).then(res => { console.log("Find dla ID "+res.records.length) })

function make_relation(id1, id2) {
    return instance.findById("User", id1)
}
//make_relation(292,3).then(res=>{console.log(res)})

function makerelationshipbetween(uid1, uid2, relation_type) {
    Promise.all([
        instance.findById("User", uid1),
        instance.findById("User", uid2)
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
//makerelationshipbetween(211,114,"friends")

function changerelation(user1, user2, relation_type) {
    instance.cypher("match (user1:User)-[rel:friends]-(user2:User) where id(user1)=" + user1 + " and id(user2)=" + user2 + " set rel.relation={relation_type} return  rel.relation", { relation_type: relation_type }).then(res => { console.log("Success") }).catch(e => { console.log(e) })
}
//changerelation(232,253,"ziomy")  

function find_friends2(Userid) {
    Promise.all(
        instance.cypher("MATCH (me:User)-[:friends {relation:'request_accepted'}]-(friends:User) WHERE id(me)=" + Userid + " RETURN friends")
    ).then(res => { console.log(res) }).catch(e => { console.log(e) })
}


function find_friends(Userid) {
    return instance.cypher("MATCH (me:User)-[:friends {relation:'request_accepted'}]-(friends:User) WHERE id(me)=" + Userid + " RETURN friends").catch(e=>{console.log(e)})
}

const get_ids_of_my_friends = async (Userid) => {
    const users = await find_friends(Userid)
    var tab = []
    console.log(users ? "Succesfully found "+users.records.length+" users":"No users found")
    Promise.all(
        users.records.map(x => { tab.push(x._fields[0].identity.low)})).catch(e=>{console.log(e)})
    return tab
}

//get_ids_of_my_friends(371).then(res => { console.log(res) })
//find_friends(234)
//find_friends2(234).then(res=>console.log(res))

async function findrelation(userid,relation_type){
   var tab=[];
   var res=await instance.cypher("match (me:User)-[:friends {relation:{relation_type}}]-(users:User) where id(me)="+userid+" return users",{relation_type:relation_type})
   res.records.map(rec=>{tab.push(rec._fields[0].identity.low)})
   return  tab
}

//console.log()
//findrelation(411,"request_send").then(res=>console.log(res))

async function test2()
{   
    var res=await findrelation(634,"request_accepted")
    console.log(res)
}
//makerelationship();
test2();

  //res.records.map(rec=>{tab.push(rec._fields[0].identity.low
  //.records.map(rec=>{rec._fields[0].identity.low})
