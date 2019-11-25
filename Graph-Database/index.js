const Neode = require('neode');
//connecting to db
const instance = new Neode.fromEnv()
const builder = instance.query()
instance.setEnterprise(true)
//loading models
instance.with({
    Person: require("./models/Person")
});

//creating Person node 
function createPersonNode(properties) {
    instance.create('Person', properties)
        .then(person => {
            console.log("Person: " + person.get('userid') + " created");
        }).catch((e) => {
            console.log("Failed to create node \n" + e)
        })
}

//example creating person
//createPersonNode({name:'Przemek'})//no success, missing min required data:userid,email,name,password
//createPersonNode({userid:'przemek.1',name:'Przemek',email:'user@gmail.com',password:'admin1'})//success
//find person by name with cypher qurey language
function findPersonByName(paramname) {
    var imie = null
    instance.cypher('MATCH (p:Person {name: {name}}) RETURN p', { name: paramname })
        .then(res => {
            console.log(/*JSON.jsonify*/(res.length))
            console.log(/*JSON.jsonify*/(res.records[28]._fields[0].properties))
            console.log(/*JSON.jsonify*/(res.records[28]._fields[0].properties.name))
            imie = res.records[28]._fields[0].properties.name
        })
}
//example
//console.log("imie:"+findPersonByName('Przemek'))//oanswer undenified due to asynchronues javascript

//id is element defined in ogm-in this case it's userid which is string
function findPersonByPrimaryID(id) {
    instance.find('Person', id)
        .then(person => {
            console.log("Person found with id: " + person.get('userid'))
        }).catch((e) => {
            console.log("Failed to find person with id: " + id + e)
        })

}

//delete all nodes
function dropAllNodes() {
    instance.deleteAll('Person')
        .then(() => console.log('Everyone has been deleted'));
}

//find person by name



//create relationship for two person
function makerelationship() {
    Promise.all([
        instance.create('Person', { userid: 'arek.2', name: 'Arek', email: 'user2@gmail.com', password: 'admin2' }),
        instance.create('Person', { userid: 'arek.3', name: 'Marek', email: 'user3@gmail.com', password: 'admin4' }),
        instance.create('Person', { userid: 'darek.1', name: 'Darek', email: 'user4@gmail.com', password: 'admin5' }),
        instance.create('Person', { userid: 'kamil.1', name: 'Kamil', email: 'user4@gmail.com', password: 'admin5' }),
        instance.create('Person', { userid: 'basia.1', name: 'Basia', email: 'user5@gmail.com', password: 'admin5' }),
        instance.create('Person', { userid: 'czarek.1', name: 'Czarek', email: 'user6@gmail.com', password: 'admin5' }),
        instance.create('Person', { userid: 'Kamil.2', name: 'Kamil', email: 'user7@gmail.com', password: 'admin5' }),
        instance.create('Person', { userid: 'Kamil.3', name: 'Kamil', email: 'user8@gmail.com', password: 'admin5' })
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
        instance.create('Person', { userid: 'arek.2', name: 'Arek', email: 'user2@gmail.com', password: 'admin2' }),
        instance.create('Person', { userid: 'arek.3', name: 'Marek', email: 'user3@gmail.com', password: 'admin4' })
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
    instance.first('Person', { email: useremail, password: userpassword })
        .then(result => {
            console.log("Proper email and password for user:" + result.get('email'))
            return result.get('email');
        }).catch((e) => {
            console.log("Failed to find node \n" + e)

        })
}


function findPerson() {
    return instance.first('Person', { name: 'Przemek' })

}

//createPersonNode({userid:'przemek.1',name:'Przemek',email:'user@gmail.com',password:'admin1'})
//createPersonNode({userid:'adam.2',name:'Przemek',email:'user@gmail.com',password:'admin2'})

//makerelationship()

//działa
//findPerson().then(przemek => { console.log(przemek.get('email')) })

console.log("////////////////////////////")
//działa ale musi być odpowiedni index tablicy
//findPersonByName()//.then(res=>console.log(/*JSON.jsonify*/(res.records[28]._fields[0].properties.name)))

function findPersonByName2() {
    instance.cypher('MATCH (p:Person {name: {name}}) RETURN p', { name: "Przemek" })
        .then(res => {
            console.log(res.records.length);
            console.log(/*JSON.jsonify*/(res.records[20]._fields[0].properties))
        })
}
//działa
//findPersonByName2()

//znajdowanie znajomych
//tworzymy przykładową strukturę
makerelationship()

function find_friends_of_my_friends_by_name(myname, name) { //znajduje przyjaciół moich przyjaciół po imieniu
    return instance.cypher("MATCH (:Person {name: {myname}})-[:friends {relation:'request_accepted'}]-(friends:Person)-[:friends {relation:'request_accepted'}]-(friend_of_myfriend:Person {name:{name}})RETURN friend_of_myfriend AS users", { myname: myname, name: name })
}
find_friends_of_my_friends_by_name("Arek", "Kamil").then(res => { console.log("Find dla imion"+res.records.length); console.log(res.records.map(user=>user.get('users'))) })

function find_friends_of_my_friends_by_id(myid, personid) { //znajduje przyjaciół moich przyjaciół po imieniu
    return instance.cypher("MATCH (me:Person)-[:friends {relation:'request_accepted'}]-(friends:Person)-[:friends {relation:'request_accepted'}]-(friend_of_myfriend:Person) WHERE id(me)={myid} AND id(friend_of_myfriend)={personid} RETURN friend_of_myfriend", { myid: Number(myid), personid: Number(personid) })
}
find_friends_of_my_friends_by_id(292,114).then(res => { console.log("Find dla ID "+res.records.length) })
