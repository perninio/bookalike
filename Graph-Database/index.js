const Neode = require('neode');
//connecting to db
const instance = new Neode.fromEnv()
instance.setEnterprise(true)
//loading models
instance.with({
    Person: require("./models/Person")
});

//creating node
function createNode(label,properties){
    instance.create(label,properties)
    .then(person => {
        console.log("Person: "+person.get('userid')+" created"); // 'Adam'
    }).catch((e) => {
        console.log("Failed to create node \n" + e )
    })
}

createNode('Person',{name:'Przemek'})
createNode('Person',{userid:'przemek.1',name:'Przemek',email:'user@gmail.com',password:'admin1'})