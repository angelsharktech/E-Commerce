import React from 'react'
import './NewFooter.css'

const NewFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-section">
          <h4>ABOUT</h4>
          <a href="#">Contact Us</a>
          <a href="#">About Us</a>
          
        </div>
        <div className="footer-section">
          <h4>HELP</h4>
          <a href="#">Payments</a>
          <a href="#">Shipping</a>
          <a href="#">Cancellation & Returns</a>
         
        </div>
        <div className="footer-section">
          <h4>POLICY</h4>
          <a href="#">Return Policy</a>
          <a href="#">Terms Of Use</a>
         
        </div>
        <div className="footer-section">
          <h4>SOCIAL</h4>
          <a href="#">Facebook</a>
          <a href="#">Instagram</a>
          <a href="#">Google</a>
        </div>
        <div className="footer-section ">
          <h4>Mail Us:</h4>
          <p>
           starbasket@gmail.com
          </p>
        </div>
        <div className="footer-section">
          <h4>Registered Office Address:</h4>
          <p>
            StarBasket <br />
            Karanje-Mhasave Road,<br />
            Satara, Maharashtra, 415002,<br />
            India
          </p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>&copy; {new Date().getFullYear()} StarBasket. All Rights Reserved.</span>
      </div>
    </footer>
  )
}

export default NewFooter