const {program} = require("commander");


const contacts = require('./phonebook');

const invokeAction = async ({action, id, name, phone, email}) => {
    switch(action) {
        case "list":
            const allContacts = await contacts.getAll();
            return console.table(allContacts);
        case "get":
            const oneContact = await contacts.getById(id);
            return console.log(oneContact);
        case "add":
            const newContact = await contacts.add({name, phone, email});
            return console.log(newContact);        
        case "remove":
            const deleteContact = await contacts.deleteById(id);
            return console.log(deleteContact);
        default: 
            return console.warn('\x1B[31m Unknown action type!');
    }
}

program
.option('-a, --action <type>', 'choose action')
.option('-i, --id <type>', 'user id')
.option('-n, --name <type>', 'user name')
.option('-e, --email <type>', 'user email')
.option('-p, --phone <type>', 'user phone');

program.parse();

const options = program.opts();
invokeAction(options)