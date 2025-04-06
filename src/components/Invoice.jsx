import React, { useRef, useEffect, useState } from "react";
import { useCart } from "../context/CartContext"; // Update this path as needed
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiPrinter, FiDownload, FiArrowLeft } from "react-icons/fi";

const Invoice = () => {
  const { cart } = useCart();
  const invoiceRef = useRef(null);
  const [qrCode, setQrCode] = useState(null);
  const [paymentId, setPaymentId] = useState(null);

  // Group identical items together (same as in Cart component)
  const groupedItems = cart.reduce((acc, item) => {
    const existingItem = acc.find((i) => i.id === item.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ ...item, quantity: 1 });
    }
    return acc;
  }, []);

  // Calculate total price
  const totalPrice = cart
    .reduce((total, item) => total + item.price, 0)
    .toFixed(2);

  // Generate a random invoice number
  const invoiceNumber = `INV-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  // Current date formatted as DD/MM/YYYY
  const currentDate = new Date().toLocaleDateString('en-GB');

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Handle Razorpay payment
  const handlePayment = () => {
    // Replace these values with your actual Razorpay key and order details
    const options = {
      key: "rzp_test_your_key_here", // Replace with your actual Razorpay key
      amount: parseFloat(totalPrice) * 100, // Amount in smallest currency unit (paise for INR)
      currency: "INR",
      name: "Your Business Name",
      description: `Payment for invoice ${invoiceNumber}`,
      image: "https://your-logo-url.com/logo.png", // Replace with your logo URL
      handler: function(response) {
        // Handle successful payment
        setPaymentId(response.razorpay_payment_id);
        // Generate QR code after successful payment
        generateQRCode(response.razorpay_payment_id);
      },
      prefill: {
        name: "Customer Name",
        email: "customer@example.com",
        contact: "9876543210"
      },
      notes: {
        address: "Customer Address"
      },
      theme: {
        color: "#7c3aed" // Purple color to match the theme
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  // Generate QR code (simulate for now)
  const generateQRCode = (paymentId) => {
    // In a real implementation, you would generate a QR code using the payment ID
    // For this example, we'll use a placeholder QR code
    setQrCode(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${paymentId}`);
  };

  // Print invoice function
  const handlePrint = () => {
    const printContent = invoiceRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;

    // This is a hack to restore React functionality after printing
    window.location.reload();
  };

  // Function to download as PDF (this is a simplified version)
  // In a real app, you'd use a library like jsPDF or html2pdf
  const handleDownload = () => {
    alert("In a real app, this would generate a PDF for download. You'd need to implement this with a library like jsPDF or html2pdf.");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen p-4 md:p-8 bg-gray-50"
    >
      <div className="max-w-3xl mx-auto py-22">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/cart"
            className="text-purple-700 hover:text-purple-900 font-medium flex items-center"
          >
            <FiArrowLeft className="mr-2" /> Back to Cart
          </Link>

          <div className="flex gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-lg border border-purple-600 text-purple-600 font-medium hover:bg-purple-50 transition-all duration-300 flex items-center"
            >
              <FiPrinter className="mr-2" /> Print
            </button>
            <button
              onClick={handleDownload}
              className="px-4 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300 flex items-center"
            >
              <FiDownload className="mr-2" /> Download
            </button>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg mb-6">No items to invoice</p>
            <Link
              to="/menu"
              className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div
            ref={invoiceRef}
            className="bg-white rounded-lg shadow-md p-6 md:p-8"
          >
            {/* Invoice Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-4 border-b">
              <div>
                <h1 className="text-2xl font-bold text-purple-800">INVOICE</h1>
                <p className="text-gray-600">{invoiceNumber}</p>
              </div>
              <div className="mt-4 md:mt-0 text-right">
                <p className="font-bold">Date:</p>
                <p>{currentDate}</p>
              </div>
            </div>

            {/* Business & Customer Info */}
            <div className="flex flex-col md:flex-row justify-between mb-8">
              <div>
                <h2 className="font-bold text-gray-800 mb-2">From:</h2>
                <p className="text-gray-600">Your Business Name</p>
                <p className="text-gray-600">123 Business Street</p>
                <p className="text-gray-600">City, State, ZIP</p>
                <p className="text-gray-600">contact@yourbusiness.com</p>
              </div>
              <div className="mt-4 md:mt-0">
                <h2 className="font-bold text-gray-800 mb-2">To:</h2>
                <p className="text-gray-600">Customer</p>
                <p className="text-gray-600">Customer Address</p>
                <p className="text-gray-600">Customer Contact</p>
              </div>
            </div>

            {/* Items Table */}
            <table className="w-full mb-8">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-2">Item</th>
                  <th className="text-center py-3 px-2">Quantity</th>
                  <th className="text-right py-3 px-2">Price</th>
                  <th className="text-right py-3 px-2">Amount</th>
                </tr>
              </thead>
              <tbody>
                {groupedItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3 px-2">
                      <div className="flex items-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 rounded-lg object-cover mr-3 hidden md:block"
                        />
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-center">{item.quantity}</td>
                    <td className="py-3 px-2 text-right">₹{item.price}</td>
                    <td className="py-3 px-2 text-right">₹{(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="flex justify-end">
              <div className="w-full md:w-1/3">
                <div className="flex justify-between py-2">
                  <span className="font-medium">Subtotal:</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="font-medium">Tax (0%):</span>
                  <span>₹0.00</span>
                </div>
                <div className="flex justify-between py-2 border-t border-gray-200 font-bold">
                  <span>Total:</span>
                  <span className="text-purple-700">₹{totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Payment Status and QR Code */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              {qrCode ? (
                <div className="flex flex-col items-center mt-4">
                  <p className="text-green-600 font-medium mb-4">Payment Successful! (ID: {paymentId})</p>
                  <div className="bg-white p-2 border rounded-lg shadow-sm mb-2">
                    <img src={qrCode} alt="QR Code" className="w-48 h-48" />
                  </div>
                  <p className="text-sm text-gray-600">Scan this QR code to verify payment</p>
                </div>
              ) : (
                <div className="flex flex-col items-center mt-4">
                  <p className="text-gray-600 mb-4">Pay now to generate a unique QR code for the invoice</p>
                  <button
                    onClick={handlePayment}
                    className="px-6 py-3 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition-all duration-300"
                  >
                    Pay with Razorpay
                  </button>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="mt-8 pt-4 border-t border-gray-200">
              <h2 className="font-bold text-gray-800 mb-2">Notes:</h2>
              <p className="text-gray-600">Thank you for your business!</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Invoice;