import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

function Cart() {
  const [allProducts, setallProducts] = useState([]);
  const [name,setName] =useState("")
  const [mobile,setMobile] =useState("")
  const [address,setAddress] =useState("")

  const handleName = ({target}) => setName(target.value)
  const handleMobile = ({target}) => setMobile(target.value)
  const handleAddress = ({target}) => setAddress(target.value)

  const handleSubmit = async ()=>{
    const body={
      id,
      name,
      mobile,
      address
    }
    const result = await axios.post("http://localhost:8000/add-address",body)
    console.log("add",result);
    alert(result.data.message)
  }
  

  const id = localStorage.getItem("_id");

  const fetchData = async () => {
    const result = await axios.get("http://localhost:8000/get-cart/" + id);
    console.log("cart", result);
    setallProducts(result.data.cart);
  };

  const deleteCart = async (id) => {
    const result = await axios.delete(
      "http://localhost:8000/delete-cart/" + id
    );
    console.log("de", result.data.message);
    alert(result.data.message);
    window.location.reload()
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalPrice = allProducts.reduce((acc, item) => acc + parseFloat(item.price), 0);
  return (
    <div>
      <Header />

      <h1 className="text-center mt-3">My Cart</h1>
      <div className="container">
        <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center ">
          {allProducts.map((item) => (
            <div class="col mt-5">
              <div className="holder">
                <div id="card" class="card mb-4 p-4">
                  <img
                    height="250px"
                    class="card-img-top"
                    src={item.image}
                    alt=""
                  />
                </div>
                <div className="search">
                  <button onClick={() => deleteCart(item._id)} className="btn1">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </div>
              </div>
              <h3 class="text-center">{item.name}</h3>
              {item.slot?<h3 class="text-center">Slot :⏱︎ {item.slot}</h3>:""}
              {item.location?<h3 class="text-center">location : {item.location}</h3>:""}
              <h4 class="text-center fw-bolder">₹ {item.price}</h4>
            </div>
          ))}
        </div>
        <div className="cart-payment mt-5">
          <div>
            <h1>Add Address</h1>

            <div class="modal-body">
              <form className="cart-forms" >
                <div className="form-floating mb-3">
                  <input
                    name="name"
                    formControlName="name"
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="Enter Name"
                    onChange={handleName}
                  />
                  <label for="floatingInput">Enter Name</label>
                </div>

                <div className="form-floating mb-2">
                  <input
                    name="mobile"
                    formControlName="mobile"
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Enter Mobile No"
                    onChange={handleMobile}
                  />
                  <label for="floatingPassword">Enter Mobile No</label>
                </div>

                <div className="form-floating mb-2">
                  <textarea
                    name="address"
                    formControlName="address"
                    type="text"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Enter Address"
                    onChange={handleAddress}
                  ></textarea>
                  <label for="floatingPassword">Enter Address</label>
                </div>
                <button type="button" className="cart-btns" onClick={handleSubmit}>
                  Deliver Here
                </button>
              </form>
            </div>
          </div>
          <div>
            <h1>Payment Details</h1>
            <div>
              <table>
                <tbody>
                  <tr>
                    <th  style={{ width: "30%" }}>N0.</th>
                    <th  style={{ width: "60%" }}>Product</th>
                    <th  style={{ width: "10%" }}>Price</th>
                  </tr>
               {allProducts.map((item,index)=>(
                <tr key={item._id}>
                  <td>{index+1}</td>
                  <td>{item.name}</td>
                  <td>₹{item.price}</td>
                </tr>
               ))}
                </tbody>
              </table>
              <hr width="100%;" color="black" size="5"></hr>
              <div className="cart-total">
                <h4>Total Amount</h4>
                <h4>₹{totalPrice} </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
