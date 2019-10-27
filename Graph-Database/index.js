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
function createPersonNode(properties){
    instance.create('Person',properties)
    .then(person => {
        console.log("Person: "+person.get('userid')+" created");
    }).catch((e) => {
        console.log("Failed to create node \n" + e )
    })
}
//example creating person
//createPersonNode({name:'Przemek'})//no success, missing min required data:userid,email,name,password
//createPersonNode({userid:'przemek.1',name:'Przemek',email:'user@gmail.com',password:'admin1'})//success
//find person by name with cypher qurey language
function findPersonByName(paramname){
    var imie=null
    instance.cypher('MATCH (p:Person {name: {name}}) RETURN p', {name: paramname})
    .then(res => {
        console.log(/*JSON.jsonify*/(res.length))
        console.log(/*JSON.jsonify*/(res.records[28]._fields[0].properties))
        console.log(/*JSON.jsonify*/(res.records[28]._fields[0].properties.name))
        imie=res.records[28]._fields[0].properties.name
        return imie 
    })
}
//example
//console.log("imie:"+findPersonByName('Przemek'))//oanswer undenified due to asynchronues javascript

//id is element defined in ogm-in this case it's userid which is string
function findPersonByPrimaryID(id){    
	instance.find('Person',id)
    .then(person => {
        console.log("Person found with id: " + person.get('userid'))
    }).catch((e) => {
        console.log("Failed to find person with id: " +id+ e )
    })
	
}

//delete all nodes
function dropAllNodes()
{
    instance.deleteAll('Person')
    .then(() => console.log('Everyone has been deleted'));
}

//find person by name



//create relationship for two person
function makerelationship()
{
	Promise.all([
    instance.create('Person', {userid:'arek.2',name:'Arek',email:'user2@gmail.com',password:'admin2'}),
	instance.create('Person', {userid:'arek.3',name:'Marek',email:'user3@gmail.com',password:'admin4'})
])
.then(([user1, user2]) => {
    user1.relateTo(user2, 'friends', {since: '10-25-2019'})
        .then(res => {
            console.log(res._start.get('name'), ' is friend ', res._end.get('name'), 'since', res.get('since')); 
        }).catch((e) => {
        console.log("Failed to create relationship \n" + e );
		})
});
}
//setTimeout(makerelationship, 6000);


//user authorization
function login(useremail,userpassword)
{
	instance.first('Person', {email: useremail, password: userpassword})
    .then(result => {console.log("Proper email and password for user:"+result.get('email'))
	 		return result.get('email');
	}).catch((e) => {
        console.log("Failed to find node \n" + e )
 
	})
}


function findPerson()
{
return  instance.first('Person', {name: 'Przemek'})
    
}

findPerson().then( przemek => {
console.log(przemek.get('email'))})


