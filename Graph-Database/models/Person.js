module.exports = {
    "userid":{
	type:"string",
	required:true,
	primary:true
	},
    "email":{
	type:"string",
	required:true
	},
    "password":{
	type:"string",
	required:true
	},
    "role":"string",
    "name":{
	type:"string",
	required:true
	},
    "surname": "string",
    "birthdate": "date",
	friends: {
        type: "relationship",
        target: "Person",
        relationship: "friends",
        direction: "out",
        properties: {
            since: "string"
        },
        eager: true 
    }
   
};