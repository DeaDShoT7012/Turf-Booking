const db = require('./db')


//signup
const signup = (uname,email,password)=>{
    return db.User.findOne({
        email
    }).then((result)=>{
        if(result){
            return{
                statusCode:401,
                message:'Account Already Exist'
            }
        }else{
            const newUser = new db.User({
                uname:uname,
                email:email,
                password:password
            })
            newUser.save()
            return{
                statusCode:200,
                message:'sign up succesfully'
            }
        }
    })
}

//login
const login = (email,password)=>{
 return db.User.findOne({
    email,
    password
 }).then((result)=>{
    if(result){
        return{
            statusCode:200,
            message:'logged succesfully',
            uname:result.uname, 
            email:result.email,
            _id:result._id
        }
    }else{
        return{
            statusCode:401,
            message:'Invalid Account / Password'
        }
    }
 })
}

//get price
const getprice = ()=>{
    return db.Price.findOne()
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                price:result.styling
            }
        }
        else{
            return{
                statusCode:401,
                message:'No data is available'
            }
        }
    })
}

//get barbers
const getbarbers = ()=>{
    return db.Barber.find()
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                barbers:result
            }
        }
        else{
            return{
                statusCode:401,
                message:'No data is available'
            }
        }
    })
}
    

const getTurf = () => {
    return db.Item.find()
        .then((result) => {
            if (result) {
                return {
                    statusCode: 200,
                    items: result
                };
            } else {
                return {
                    statusCode: 404, // Changed status code to 404 for "Not Found"
                    message: 'No turf data available'
                };
            }
        })
};

const viewTurf = (_id)=>{
    return db.Item.findOne({
        _id
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                items:result
            }
        }
        else{
            return{
                statusCode:401,
                message:'No data is available'
            }
        }
    })  
}

//get products
const getproducts = ()=>{
    return db.Product.find()
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                products:result
            }
        }
        else{
            return{
                statusCode:404,
                message:'Please login'
            }
        }
    })
}

//get a perticular producrt details
const viewproduct = (_id)=>{
    return db.Product.findOne({
        _id
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                product:result
            }
        }
        else{
            return{
                statusCode:401,
                message:'No data is available'
            }
        }
    })  
}

//add to cart
const addtocart = (item)=>{
    // console.log(item);
    return db.Cart.findOne({
        id:item.id
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:404,
                message:'Item already in the cart'
            }
        }
        else{
            let newCart = new db.Cart({
                id:item._id,
                name:item.title,
                price:item.price,
                image:item.image,
                userId:item.userId
                
            })
            newCart.save()
            return{
                statusCode:200,
                message:'Item added to the cart'
            }
        }
    })
}

const getCart = (userId)=>{
    console.log("id",userId);
    return db.Cart.find({
        userId
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                cart:result
            }
        }
        else{
            return{
                statusCode:404,
                message:'Please login'
            }
        }
    })
}

const deleteCart = (_id)=>{
    return db.Cart.deleteOne({
        _id
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:200,
                message:"Item Deleted from Cart"
            }
        }
        else{
            return{
                statusCode:401,
                message:"No data available"
            }
        }
    })
}

const addAddress = (name,mobile,address,id)=>{
    console.log("adid",id);
    return db.User.findOne({
        _id:id
    }).then((result)=>{
        if(result){
            result.address.push({
               name,
               mobile,
               address   
            })
            result.save()
            return{
                statusCode:200,
                message:'Address Saved'
            }
        }
        else{
            return{
                statusCode:401,
                message:'please login   '
            }
        }
    })
}

// const bookTurf = (item)=>{
//     console.log("tu",item);
//     return db.Book.findOne({
//         id:item
//     })
//     .then((result)=>{
//         if(result){
//             return{
//                 statusCode:404,
//                 message:'Item not find'
//             } 
//         }
//         else{
//            let newBook = new db.Book({
//             id:item._id,
//             name:item.title,
//             price:item.price,
//             image:item.image,
//             location:item.location,
//             slot:item.selectedSlot,
//             userId:item.userId
//            })
//            newBook.save()
//            return{
//             statusCode:200,
//             message:'Turf Booked'
//         }
//         }
//     })
// }


const bookTurf = (item)=>{
    console.log("tu",item);
    return db.Cart.findOne({
        id:item.id  
    })
    .then((result)=>{
        if(result){
            return{
                statusCode:404,
                message:'Item not find'
            } 
        }
        else{
           let newCart = new db.Cart({
            id:item._id,
            name:item.title,
            price:item.price,
            image:item.image,
            location:item.location,
            slot:item.selectedSlot,
            userId:item.userId
           })
           newCart.save()
           return{
            statusCode:200,
            message:'Turf Booked'
        }
        }
    })
}








module.exports={
    getprice,
    getproducts,
    viewproduct,
    getbarbers,
    getTurf,
    signup,
    login,
    addtocart,
    viewTurf,
    getCart,
    deleteCart,
    addAddress,
    bookTurf
    
}