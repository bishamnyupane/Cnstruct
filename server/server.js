const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth.js');
const cart = require('./routes/cart.js');
const item = require('./routes/item.js');
const order = require('./routes/order.js');

const corsOptions = {
    origin: ['http://localhost:3000', "http://localhost:3001"],
    methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
};

//creating an instance of express and setting up a middleware to parse JSON in requests
const app = express();

app.use(express.json());

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

//making images available
app.use('/productImages', express.static('productImages'));

//loading route modules
app.use('/', auth);
app.use('/', cart);
app.use('/', item);
app.use('/', order);

app.listen(3001, () => console.log('server running on port 3001'));
