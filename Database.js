const {MongoClient} = require("mongodb");

const url =
"mongodb+srv://gsdhoni2000:jpR9eO0WSlDYPj6B@namastenode.ckfu4.mongodb.net/?retryWrites=true&w=majority&appName=NamasteNode";

const client = new MongoClient(url);

const dbName = "NodeDatabase";

async function main(){
    await client.connect();
    console.log("connected successfully to server");
    const db = client.db(dbName);
    const collection = db.collection('User');
    // await collection.insertMany([{
    //     first_name: 'Kaku',
    //     last_name: 'Adhikari',
    //     phoneNumber: '9891213511'
    // },
    // {
    //     first_name: 'Xyz',
    //     last_name: 'ABC',
    //     phoneNumber: '989213511'
    // }
    // ])
   // await collection.updateOne({ first_name: "Gaurav" }, { $set: { first_name: "wxy" } });
   //await collection.deleteMany({ first_name: "Kaku" });
    const filteredData = await collection.find({}).toArray()
    console.log(filteredData);
    return "done";
}
main()
.then (console.log)
.catch(console.error)
.finally(()=> client.close())