import mongo from "mongodb"

let connection_string = "mongodb+srv://dsturlan:HH70lRhI51DJmHHz@cluster0.wircu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


let client = new mongo.MongoClient(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


export default () => {
    return new Promise((resolve, reject))
}
