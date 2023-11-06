import type { RequestHandler } from "./$types";
import { MongoClient, ObjectId } from "mongodb";
import { env } from "$env/dynamic/private";
export const GET: RequestHandler = async ({ url }) => {
    let email = url.searchParams.get('email')
    // Connection URL
    const url1 = env.DBurl;
    const client = new MongoClient(url1);
    // Database Name
    const dbName = "food-planner";
    async function main() {
        // Use connect method to connect to the server
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("user");
        let value = await collection.findOne({
            UserEmail: `${email}`,
        });
        if (!value) {
            await collection.insertOne({
                UserEmail: `${email}`,
                FoodGoal: 1800,
                FoodScanDetail: [],
            });
            return;
        }
        value = await collection.findOne({
            UserEmail: `${email}`,
        });
        console.log(value);
        // the following code examples can be pasted here...
        return value;
    }
    try {
        let res1 = await main()
        await client.close();
        return new Response(JSON.stringify(res1), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.error(err);
        await client.close();
        return new Response('{}', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

export const PUT: RequestHandler = async ({ url }) => {
    let email = url.searchParams.get('email');
    let dbinfo = JSON.parse(decodeURIComponent(url.searchParams.get('db')));
    // Connection URL
    const url1 = "mongodb+srv://be2hyu:%40qq26784705@cluster1.br0fnjf.mongodb.net/";
    const client = new MongoClient(url1);
    // Database Name
    const dbName = "food-planner";
    async function main() {
        // Use connect method to connect to the server
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection("user");
        let value = await collection.findOne({
            UserEmail: `${email}`,
        });
        dbinfo._id = new ObjectId(dbinfo._id)
        await collection.updateOne({
            _id: {
                $eq: value._id
            }
        }, {
            $set: dbinfo
        })
        // the following code examples can be pasted here...
        return value;
    }
    try {
        let res1 = await main()
        await client.close();
        return new Response(JSON.stringify(res1), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (err) {
        console.error(err);
        await client.close();
        return new Response('{}', {
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}