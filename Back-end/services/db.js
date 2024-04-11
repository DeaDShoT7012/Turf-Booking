const mongoose = require('mongoose')
// mongoose.connect('mongodb://localhost:27017/salon')
// mongoose.connect('mongodb+srv://bejese9468:wUpFuyMSizSGQaQt@cluster0.wyms4nn.mongodb.net/beutyparler?retryWrites=true&w=majority')
mongoose.connect('mongodb+srv://devanand272003:27fyZSxPrXMg6aqA@cluster0.tqvmvco.mongodb.net/project')



const Price = mongoose.model('Price',
{
    styling:[]
})

const Product = mongoose.model('Product',
{
    id:String,
    name:String,
    image:String,
    price:String,
    tags:String,
    categories:String,
    sku:String,
    desc:String
}
)


const Item = mongoose.model('Item',
{
    title:String,
    image:String,
    price:String,
    location:String,
    time:String,
    slots:[]
})

// const Turf = mongoose.model('Turf',
// {
//     title:String,
//     image:String,
//     price:String,
//     location:String,
//     time:String
// })




const Barber = mongoose.model('Barber',
{
    id:String,
    name:String,
    image:String
})

const User = mongoose.model('User',
{
    
    uname:String,
    email:String,
    password:String,
    address:[]
}
)

const Cart = mongoose.model('Cart',
{
    id:String,
    name:String,
    price:String,
    image:String,
    quantity:String,
    userId:mongoose.Schema.Types.ObjectId,
    turfId:mongoose.Schema.Types.ObjectId,
    slot:String,
    location:String,

})

const Book = mongoose.model('Book',
{
    name:String,
    price:String,
    image:String,
    slot:String,
    location:String,
    userId:mongoose.Schema.Types.ObjectId,
    turfId:mongoose.Schema.Types.ObjectId

})




module.exports={
    Price,
    Product,
    Barber,
    User,
    Cart,
    Item,
    Book
}