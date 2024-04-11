import React,{useState,useRef} from 'react'
import './Header.css'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';


function Header() {
 const [uname,setuname] = useState('')
 const [email,setemail] = useState('')
 const [password,setpassword] = useState('')

 const handlesignup =async(e)=>{
  // e.preventDefault()
  const body ={
    uname,
    email,
    password
  }
  const result = await axios.post('http://localhost:8000/signup',body)
  console.log("result",result);
  alert("User Sign up")
 }

 const handlelogin = async(e)=>{
  e.preventDefault()
  const body ={
    email,
    password
  }
  const result = await axios.post('http://localhost:8000/login',body)
  console.log("login",result);
  localStorage.setItem('name',result.data.uname)
  localStorage.setItem('email',result.data.email)
  localStorage.setItem("_id",result.data._id)
  alert(result.data.message)
 }



  const switchers = useRef([]);
  const handleSwitcherClick = (e) => {
    switchers.current.forEach(item => item.parentElement.classList.remove('is-active'));
    e.target.parentElement.classList.add('is-active');
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('_id');
    window.location.reload()
    setShow(false);
  };

  
  const navigate = useNavigate();
  const handleCartClick = () => {
    const userId = localStorage.getItem('_id');
    if (userId) {
        navigate('/cart');
    } else {
        alert('Please login');
    }
};

  const isLoggedIn = localStorage.getItem('name') && localStorage.getItem('email');
  const loginName = localStorage.getItem("name")

  return (
    <div className='navbar'>
         <Navbar>
             <Link to={'/'}>
               <img
                      id='img1'
                    alt=""
                    src="https://demo2wpopal.b-cdn.net/barbero/wp-content/uploads/2021/09/logo_2.svg"/>
                     {/* src="logo.png"/> */}


             </Link >
      </Navbar>
      <Nav  id='items' className="me-auto">
            <Nav.Link  href='/' className='text-white'>HOME</Nav.Link>
            <Nav.Link href='/shop'  className='text-white'>SHOP</Nav.Link>
            <Nav.Link href='/slot'  className='text-white'>WATCH LIVE</Nav.Link>
            {/* <Nav.Link ><i  onClick={handleShow} class='fa-solid fa-user'></i></Nav.Link> */}
            {isLoggedIn ? (
           <NavDropdown title={loginName} id="basic-nav-dropdown">
           <NavDropdown.Item onClick={handleLogout}>Log Out</NavDropdown.Item>
         </NavDropdown>
        ) : (
          <Nav.Link onClick={handleShow} className='text-white'><i className='fa-solid fa-user'></i></Nav.Link>
        )}
            <Nav.Link onClick={handleCartClick}><i class="fa-solid fa-cart-shopping"></i></Nav.Link>
     </Nav>
     
     <Modal  show={show} onHide={handleClose}>
    <Modal.Body  style={{background:'#f7f7f7'}}>
    <section className="forms-section">
      <div className="forms">
        <div className="form-wrapper is-active">
          <button type="button" className="switcher switcher-login" onClick={handleSwitcherClick} ref={el => switchers.current.push(el)}>
            Login
            <span className="underline"></span>
          </button>
          <form className="form form-login" >
            <fieldset>
              <legend>Please, enter your email and password for login.</legend>
              <div className="input-block">
                <label htmlFor="login-email">E-mail</label>
                <input id="login-email" type="email" name='email' onChange={(e)=>setemail(e.target.value)}  required/>
              </div>
              <div className="input-block">
                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" name='password' onChange={(e)=>setpassword(e.target.value)} required/>
              </div>
            </fieldset>
            <button type="submit" onClick={(e)=>handlelogin(e)}  className="btn-login">Login</button>
          </form>
        </div>
        <div className="form-wrapper">
          <button type="button" className="switcher switcher-signup" onClick={handleSwitcherClick} ref={el => switchers.current.push(el)}>
            Sign Up
            <span className="underline"></span>
          </button>
          <form   className="form form-signup">
            <fieldset>
              <legend>Please, enter your email, password and password confirmation for sign up.</legend>
              <div className="input-block">
                <label htmlFor="signup-email">User Name</label>
                <input id="signup-email" type="text" name='uname' onChange={(e)=>setuname(e.target.value)}  required/>
              </div>
              <div className="input-block">
                <label htmlFor="signup-password">E-Mail</label>
                <input id="signup-password" type="email" name='email' onChange={(e)=>setemail(e.target.value)}  required/>
              </div>
              <div className="input-block">
                <label htmlFor="signup-password-confirm">Password</label>
                <input id="signup-password-confirm" type="password" name='password' onChange={(e)=>setpassword(e.target.value)}  required/>
              </div>
            </fieldset>
            <button type="submit" onClick={(e)=>handlesignup(e)}   className="btn-signup">Signup </button>
          </form>
        </div>
      </div>
    </section>
    </Modal.Body>
      </Modal>
    </div>
  )
}

export default Header