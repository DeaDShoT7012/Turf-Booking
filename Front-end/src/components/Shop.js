import React,{useState,useEffect}from 'react'
import './Shop.css'
import Header from './Header'
import axios from 'axios'
import Footer from './Footer'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
import Modal from 'react-bootstrap/Modal';




function Shop() {
    const [counter,setcounter] = useState(1)

    const inc = ()=>{
        setcounter(counter+1)
    }
    const dec = ()=>{
        if(counter>=2){
            setcounter(counter-1)
        }
    }   

    const [allProducts,setallProducts] = useState([])
    const [viewProduct,setviewProduct] = useState([])
    const [search,setsearch] = useState('')

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = async (id) =>{
        console.log("id",id);
        const result = await axios.get('http://localhost:8000/view-product/'+id)
        setviewProduct(result.data.product);
        setShow(true);
    } 

    const userId = localStorage.getItem("_id")
    const handleCart = async (item) => {
        if (userId) {
            try {
                const result = await axios.post('http://localhost:8000/addtocart', { ...item, userId });
                console.log(result);
                alert(result.data.message);
            } catch (error) {
                console.error('Error adding item to cart:', error);
                alert("Item already In the cart")
            }
        } else {
            alert("Please log in to add items to your cart");
        }
    };

    const fetchData = async ()=>{
        const result = await axios.get('http://localhost:8000/get-products')
        setallProducts(result.data.products)
    }
    
    const sorting = () => {
        const sortedProducts = [...allProducts].sort((a, b) => a.price - b.price);
        setallProducts(sortedProducts);
    }
    
    const sorting2 = () => {
        const sortedProducts = [...allProducts].sort((a, b) => b.price - a.price);
        setallProducts(sortedProducts);
    }
    

   

    useEffect(()=>{
        fetchData()
    },[])

  return (
    <div>
        <Header/>
        <div className='first1'>
            <p className='shop'>SHOP</p>
        </div>
    <section>
    <div class="container px-4 px-lg-5 mt-5 mb-5">  
        <div className='sorting p-3'>
            <div className='bg-white sort1'>
                <h3>Showing 1-{allProducts.length} results</h3>
            </div>
            <div className='sort3'>
                <InputGroup >  
                <Form.Control style={{border:'1px solid black'}} onChange={(e)=>setsearch(e.target.value)} placeholder='Search'/>
                </InputGroup>
            </div>
            <div className='sort2'>
            <button className='inc me-3' onClick={(e)=>sorting(e)}>low to high</button>
            <button className='inc' onClick={(e)=>sorting2(e)}>high to low</button>
            </div>
        </div>
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center ">

        {
            allProducts.filter((item)=>{
                return search.toLowerCase()===''?item:item.title.toLowerCase().includes(search)
            })
            .map((item)=>(
                <div class="col mt-5">
                <div className='holder'>
                    <div id='card'  class="card mb-4 p-4">
                        <img  height="250px" class="card-img-top" src={item.image} alt=''/>
                    </div>
                    <div className='search'>
                    {/* <button onClick={()=>handleShow(item._id)} className='btn1'><i class="fa-solid fa-magnifying-glass"></i></button > */}
                    <button onClick={()=>handleCart(item)} className='btn1'><i class="fa-solid fa-cart-shopping"></i></button >
                    </div>
                </div>
                <h3 class="text-center">{item.title}</h3>
                <h4 class="text-center fw-bolder">₹ {item.price}</h4>
            </div>
            
            ))
        }

        </div>
    </div>
    </section>

    
    <Modal 
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
            <div className='view'>
            <div className='viewimg'>
            <img src={viewProduct.image}/>
            </div>
            <div className='viewdetails'>
                <h1>{viewProduct.title}</h1><br/>
                <h2>₹ {viewProduct.price}</h2><br/>
                <h5>{viewProduct.desc}</h5><br/>
                <div>
                    <button style={{width:'40px',height:'40px',background:'none'}} onClick={dec}><i class="fa-solid fa-minus"></i></button>
                    <input style={{width:'40px',height:'40px'}} className='ms-1 text-center' type={Text} value={counter}/>
                    <button style={{width:'40px',height:'40px',background:'none'}} onClick={inc} className='ms-1'><i class="fa-solid fa-plus"></i></button>
                    <button style={{height:'40px',background:'black'}} className='ms-1 text-white'>Add to Cart</button>
                </div><br/>
                <h5><b>SKU: &nbsp;</b>{viewProduct.sku}</h5>
                <h5><b>Categories: &nbsp;</b>{viewProduct.categories}</h5>
                <h5><b>Tags: &nbsp;</b>{viewProduct.tags}</h5>
            </div>

            </div>
        </Modal.Body>
      </Modal>

<Footer/>
    </div>
  )
}
export default Shop