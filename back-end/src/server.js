import express, { application } from 'express';
import { MongoClient } from 'mongodb';
import { itemsCart as cartItemsRaw, products as productsRaw } from './temp-data';

let itemsCart = cartItemsRaw
let products = productsRaw

const url = `mongodb+srv://Keeenma:Password12451245@systemtestdb.wfnniuj.mongodb.net/?retryWrites=true&w=majority`
const clientCon = new MongoClient(url)
const app = express();

app.use(express.json());

app.get('/', async (req, res) => {
    await clientCon.connect();
    const db = clientCon.db('SystemTestDB');
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
})

// async function populatedCartIds(ids) {
//     await clientCon.connect();
//     const db = clientCon.db('SystemTestDB');
//     const itemPromises = ids.map(itemID => db.collection('products').findOne({ itemID }));
//     const items = await itemPromises;
//     return items;
// }

async function populatedCartIds(ids){
    await clientCon.connect();
    const db = clientCon.db('SystemTestDB');
    return Promise.all(ids.map(itemID => db.collection('products').findOne({ itemID })))
}

app.get('/users/:userId/cart', async (req, res) => {
    await clientCon.connect();
    const db = clientCon.db('SystemTestDB');
    const user = await db.collection.findOne({ id: req.params.userId });
    const populatedCart = await populatedCartIds(user.itemsCart);
    res.json(populatedCart);
})

app.get('/details/:productId', (req, res) => {
    const product = products.find(product => product.id === req.params.productId)
    res.json(product);
})

app.post('/cart', (req, res) => {
    const product = products.find(product => product.id === req.body.id);
    if (itemsCart.every(item => item.id !== req.body.id)) {
        itemsCart.push(product);
        const populatedCart = populatedCartIds(itemsCart)
        res.json(populatedCart);
    } else {
        const response = {
            message: 'Already Existed in the cart',
            itemsCart: itemsCart,
        };
        res.json(response);
    }
})

app.delete('/cart/:productId', (req, res) => {
    const deleted = itemsCart.filter(items => items !== req.params.productId);
    const populatedCart = populatedCartIds(deleted)
    res.json(deleted);
})

app.listen(8000, () => {
    console.log("The server is running in port 8000")
})