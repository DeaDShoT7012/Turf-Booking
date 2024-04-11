const express = require('express')
const cors = require('cors')
const logic = require('./services/logic')
const server = express()
server.use(cors())
server.use(express.json())
server.listen(8000,()=>{
    console.log('server started at 8000');
})


server.get("/", (req, res) => {
    res.send("Beauty Parlor!!");
  });

//signup 
server.post('/signup',(req,res)=>{
    logic.signup(req.body.uname,req.body.email,req.body.password)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//login
server.post('/login',(req,res)=>{
    logic.login(req.body.email,req.body.password)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get price
server.get('/get-price',(req,res)=>{
    logic.getprice()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get barbers
server.get('/get-barbers',(req,res)=>{
    logic.getbarbers()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// get turf
server.get('/get-turf',(req,res)=>{
    logic.getTurf()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

server.get('/view-turf/:id',(req,res)=>{
    logic.viewTurf(req.params.id)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get products
server.get('/get-products',(req,res)=>{
    logic.getproducts()
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

//get a perticular product details
server.get('/view-product/:id',(req,res)=>{
    logic.viewproduct(req.params.id)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

// add to cart
server.post('/addtocart',(req,res)=>{
    // console.log("req",req.body);
    logic.addtocart(req.body)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({ statusCode: 500, message: 'Internal Server Error' });
    });
})

server.get('/get-cart/:id',(req,res)=>{
    logic.getCart(req.params.id)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

server.delete('/delete-cart/:id',(req,res)=>{
    logic.deleteCart(req.params.id)
    .then((result)=>{
        res.status(result.statusCode).json(result)  
    })
})

server.post("/add-address",(req,res)=>{
    console.log("body",req.body);
    logic.addAddress(req.body.name,req.body.mobile,req.body.address,req.body.id)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})

server.post("/book-slot",(req,res)=>{
    console.log("body",req.body);
    logic.bookTurf(req.body)
    .then((result)=>{
        res.status(result.statusCode).json(result)
    })
})




