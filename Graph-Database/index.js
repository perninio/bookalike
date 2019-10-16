const Neode = require('neode');

 
const instance = new Neode('bolt://localhost:7687', 'neo4j', 'admin');

instance.model('Person', {
    person_id: {
        primary: true,
        type: string
    },
    name:string,
    surename:string,  
    age: 'number'
});


//cypher queris
instance.cypher('CREATE (p:Person {name: {name}}) RETURN p', {name: "Adam"})
    .then(res => {
        console.log(res.records.length);
    })h