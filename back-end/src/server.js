import express, { application } from 'express';
import { itemsCart as cartItemsRaw, products as productsRaw } from './temp-data';

let itemsCart = cartItemsRaw
let products = productsRaw

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json(products);
})
function populatedCartIds(ids){
    return ids.map(itemID => products.find(product => product.id === itemID))
}
app.get('/cart', (req, res) => {
    const populatedCart = populatedCartIds(itemsCart);
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