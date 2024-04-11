import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "./Header";
import Footer from "./Footer";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";


function Home() {
  const [allturf, setallturf] = useState([]);
  const [viewTurf, setViewTurf] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState("");

  const userId = localStorage.getItem("_id");


  const handleClose = () => setShow(false);

  const handleSlot = ({ target }) => setSelectedSlot(target.value);

  const handleBook = async(viewTurf)=>{
    if (userId) {
      try {
          const result = await axios.post('http://localhost:8000/book-slot', { ...viewTurf, userId ,selectedSlot});
          console.log(result);
          alert(result.data.message);
      } catch (error) {
          console.error('Error adding item to cart:', error);
          alert("Item already In the cart")
      }
  } else {
      alert("Please log in to add items to your cart");
  }
  }

  const handleShow = async (id) => {
    const isLoggedIn = localStorage.getItem('name') && localStorage.getItem('email');
    if (isLoggedIn) {
      const result = await axios.get("http://localhost:8000/view-turf/" + id);
      console.log("re", result.data.items);
      setViewTurf(result.data.items);
      setShow(true);
    } else {
      alert("Please login to view details");
    }
  };

  const fetchTurf = async () => {
    const result = await axios.get("http://localhost:8000/get-turf");
    console.log("turf", result.data.items);
    setallturf(result.data.items);
  };

  useEffect(() => {
    fetchTurf();
  }, []);

  return (
    <div>
      <Header />
      <div className="first">
        <div className="img1"></div>
      </div>
      {/* -------------------------------------------------------------------------------------------------- */}
      <div className="second">
        <h1 className="text-center pt-4 ">
          <span className="services">
            Do you know what my favorite part of the game is? <br /> The
            OPPORTUNITY to play.
          </span>
        </h1>
        <div className="container px-4 px-lg-5 mt-5 mb-5 ">
          <div class="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center ">
            {allturf.map((item) => (
              <div class="col mt-5">
                <div className="holder">
                  <div id="card" className="card mb-4 p-4">
                    <img
                      height="250px"
                      class="card-img-top"
                      src={item.image}
                      alt=""
                    />
                  </div>
                </div>
                <button
                  className="button mb-3"
                  onClick={() => handleShow(item._id)}
                >
                  BOOK BATTLEGROUND
                </button>
                <h3 class="text-center text-white">{item.title}</h3>
                <h3 class="text-center text-white">
                  <i class="fa-solid fa-location-dot">&nbsp;</i>
                  {item.location}
                </h3>
                <h4 class="text-center fw-bolder text-white">
                  ₹ {item.price} | ⏱︎ {item.time}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modal-view">
            <div className="modal-viewimg">
              <img src={viewTurf.image} />
            </div>
            <div className="modal-viewdetails">
              <h1>{viewTurf.title}</h1>
              <br />
              <h2>
                ₹ {viewTurf.price} | ⏱︎ {viewTurf.time}
              </h2>
              <br /> 
              <h2>
                <i class="fa-solid fa-location-dot">&nbsp;</i>
                {viewTurf.location}
              </h2>
              <h2>Available Slots</h2>
              <div className="modal-slots">
               <Form.Select
                    size="lg"
                    id="orderFrom"
                    onChange={handleSlot}
                  >
                    <option disabled selected required>
                      Select Your Slot
                    </option>
                    {viewTurf.slots?.map((item) => (
                  <option key={item._id} value={item.slot}>
                    {item.slot}
                  </option>
                ))}
                
                  </Form.Select>
              </div>
              <div className="mt-5">
                <button className="cart-btns" onClick={()=>handleBook(viewTurf)}> Book Now</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      {/* --------------------------------------------------------------------------------------------------------------------- */}
      <Footer />
    </div>
  );
}

export default Home;
