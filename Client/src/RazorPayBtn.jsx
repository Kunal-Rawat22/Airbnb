import { useEffect} from "react";

const RazorpayButton = () => {

  useEffect(() => {
    // Check if the script is already present
    const existingScript = document.querySelector(
      'script[src="https://checkout.razorpay.com/v1/payment-button.js"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/payment-button.js";
      script.setAttribute("data-payment_button_id", "pl_OrRk1X00W1bQex");
      script.async = true;
      document.getElementById("razorpay-form").appendChild(script);
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <form id="razorpay-form">
      {/* Razorpay button will be injected here */}
    </form>
  );
};

export default RazorpayButton;
