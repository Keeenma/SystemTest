import express, { application } from 'express';
import { MongoClient } from 'mongodb';
import path from 'path';
// import { itemsCart as cartItemsRaw, products as productsRaw } from './temp-data';

// let itemsCart = cartItemsRaw
// let products = productsRaw

async function execute() {
    const url = `mongodb+srv://Keeenma:Password12451245@systemtestdb.wfnniuj.mongodb.net/?retryWrites=true&w=majority`
    const clientCon = new MongoClient(url)
    const app = express();

    app.use(express.json());

    app.use('/images', express.static(path.join(__dirname, '/assets')))

    await clientCon.connect();
    const db = clientCon.db('SystemTestDB');

    app.get('/api/products', async (req, res) => {
        const products = await db.collection('products').find({}).toArray();
        res.json(products);
    })

    async function populatedCartIds(ids) {
        return Promise.all(ids.map(itemID => db.collection('products').findOne({ id: itemID })));
    }

    app.get('/api/users/:userId/cart', async (req, res) => {
        const user = await db.collection('users').findOne({ id: req.params.userId });
        const populatedCart = await populatedCartIds(user.itemsCart);
        res.json(populatedCart);
    })

    app.get('/api/details/:productId', async (req, res) => {
        const product = await db.collection('products').findOne({ id: req.params.productId })
        res.json(product);
    })

    app.post('/api/users/:usersId/cart', async (req, res) => {
        const paramsID = req.params.usersId
        const reqBodyID = req.body.id

        await db.collection('users').updateOne({ id: paramsID }, {
            $addToSet: { itemsCart: reqBodyID }
        })

        const user = await db.collection('users').findOne({ id: paramsID })
        const populatedCart = await populatedCartIds(user.itemsCart)
        res.json(populatedCart)
    })

    app.delete('/api/users/:usersId/cart', async (req, res) => {
        //:productId
        const paramsID = req.params.usersId
        const reqBodyID = req.params.productId


        await db.collection('users').updateOne({ id: paramsID }, {
            $pull: { itemsCart: reqBodyID }
        })

        const user = await db.collection('users').findOne({ id: paramsID })
        const populatedCart = await populatedCartIds(user.itemsCart)
        res.json(populatedCart)
    })

    app.listen(8000, () => {
        console.log("The server is running in port 8000")
    })
}
execute();