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
createPersonNode({name:'Przemek'})//no success, missing min required data:userid,email,name,password
createPersonNode({userid:'przemek.1',name:'Przemek',email:'user@gmail.com',password:'admin1'})//success
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
console.log("imie:"+findPersonByName('Przemek'))//oanswer undenified due to asynchronues javascript

//id is element defined in ogm-in this case it's userid which is string
function findPersonByID(id){    
	instance.find('Person',id)
    .then(person => {
        console.log("Person found with id: " + person.get('userid'))
    }).catch((e) => {
        console.log("Failed to find person with id: " +id+ e )
    })
	
}

//findPersonByID('przemek.1')

function dropAllNodes()
{
    instance.deleteAll('Person')
    .then(() => console.log('Everyone has been deleted'));
}
function findPerson()
{
instance.first('Person', {name: 'Przemek'})
    .then(przemek => {console.log(przemek.get('email'))})
}
//findPerson()