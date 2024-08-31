
import "./App.css"; // Import custom CSS for animation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
const PaymentSuccess = () => {
  return (
    <div className="bg-gray-400 min-h-screen flex items-center justify-center">
      <div className="max-w-[380px] mx-auto overflow-hidden">
        <div className="bg-gray-800 h-[6px] border border-gray-600 border-b-0 rounded-t-lg" />

        <div className="relative overflow-hidden h-[467px]">
          <div className="bg-white h-[447px] relative z-10 mx-3 mt-[-12px] animate-print">
            <div className="mx-3 p-6">
              <div className="flex justify-center">
                <FontAwesomeIcon
                  className="bg-green-600 text-white p-2.5 rounded-full text-4xl mx-auto"
                  icon={faCheck}
                />
              </div>
              <div className="text-center text-2xl font-bold text-gray-600 mt-4 mb-4">
                Payment Complete
              </div>
              <div className="text-center text-sm text-gray-500 mb-6">
                Your payment for $N in USDT has been received and sent to
                SHOPNAME.
              </div>
              <div className="text-center text-gray-800 font-bold">
                <div className="text-lg mb-2">Payment id</div>
                <div className="border-t border-b border-gray-300 py-2 text-lg mb-6">
                  JPZZ1V-WQRR94-78E1VE
                </div>
              </div>
              <div className="text-center text-xl font-bold text-gray-500">
                You can close this page!
              </div>
            </div>
            <div className="relative h-5 w-full mt-[-1px]">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white opacity-75" />
            </div>
          </div>
        </div>

        <div className="bg-gray-800 h-[6px] border border-gray-600 border-t-0 rounded-b-lg" />
      </div>
    </div>
  );
};

export default PaymentSuccess;
