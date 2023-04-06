import Messages from "../dao/dbManagers/messages.js";

const messagesManager = new Messages();

//Traer mensajes
const getAll = async (req,res) => {
    let messages = await messagesManager.getAll();
    res.send({status:"success" , payload:messages})
}

export default {
    getAll
}