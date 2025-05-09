// import axios from "axios";
import { useEffect } from "react";
// import { Link } from "react-router-dom";
const RazorpayButton = () => {
  useEffect(() => {
    // Check if the script is already present
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/payment-button.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute("data-payment_button_id", "pl_QSV52J0lJ3GpOO");
      script.async = true;
      document.getElementById("razorpay-form").appendChild(script);
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    // <Link
    //   to={`/payment/success?payment_id=pay_${Math.random()
    //     .toString(36)
    //     .substring(2, 12)}`}
    //   className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition duration-300 ease-in-out"
    // >
    //   Proceed to Payment
    // </Link>
    <form id="razorpay-form">
    </form>
  );
};

export default RazorpayButton;
