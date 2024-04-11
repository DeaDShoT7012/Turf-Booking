import React from 'react'
import './Footer.css'

function Footer() {
  return (
    <div>
        <div className='footer continer'>
        <div className='block '>
          <div>
            <h2>VISIT US</h2>
            <h5>7265 Queen Lane</h5>
            <h5>Wethersfield, CT 06109</h5>
            <h5>Mon – sat : 7:00am – 8:00pm</h5>
            <h5>Sunday : Closed</h5>
          </div>
        </div>
        <div className='block '>
            <div className='text'>
                {/* <img className='barberoimg ' src='https://demo2wpopal.b-cdn.net/barbero/wp-content/uploads/2021/10/logo_svg.svg'/> */}

                <br/><br/>
                <h2>THE Albicelestians</h2>
                <p>
                Albicelestians is a lot more than just a Club- <br/> er, it is even far more than a social club for men, it  <br/> is exactly the place where you will find yourself and your identity.
                </p>
            </div>
        </div>
        <div className='block '>
        <div>
            <h2>FOLLOW US</h2>
            <i id='icon' class="fa-brands fa-square-instagram mx-2"></i>
            <i id='icon' class="fa-brands fa-square-facebook mx-2"></i>
            <i id='icon' class="fa-brands fa-square-twitter mx-2"></i>
        </div>
        </div>
        </div>
        <div className='copyright'>
            <h3>Copyright © 2021 Barbero. All rights reserved</h3>
        </div>
    </div>
  )
}

export default Footer