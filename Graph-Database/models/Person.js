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
        relationship: "relationship",
        direction: "out",
        properties: {
            relation: "string" //there are a few states: "request_send","request_accepted","request_rejected"
        },
        eager: true 
    }
   
};