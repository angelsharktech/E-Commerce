// src/utils/payment.js
import axios from "axios";

export const startRazorpayPayment = async ({
  amount,
  data,
  product,
  keyId,
  webuser,
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  try {
    const res = await axios.post("/order/createOrder", {
      amount,
    });

    const order = res.data;
    console.log("order:", order);

    const options = {
      key: keyId,
      amount: order.amount,
      currency: "INR",
      name: "Satrbasket.in",
      description: "Order Payment",
      // image: "/logo.png",
      order_id: order.id,
      handler: function (response) {
        (async () => {
          try {
            console.log("Payment successful:", response);
            alert("Payment successful!");

            const orderData = {
              user: webuser._id,
              products: [
                {
                  product: product._id,
                  quantity: product.quantity,
                  price: product.selling_price,
                },
              ],
              shippingInfo: {
                name: data.name,
                mob_no: data.mob_no,
                email: data.email,
                address: data.address,
                city: data.city,
                state:data.state,
                pincode: data.pincode,
              },
              paymentMethod: "RAZORPAY",
              paymentStatus: "Paid",
              razorpayDetails: {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              },
              totalAmount: product.price,
            };

            const saveRes = await axios.post("/order/placeOrder", orderData);
            alert("Order placed successfully!");
            onSuccess(saveRes.data);
          } catch (err) {
            console.error("Error saving order:", err);
            alert("Failed to place order after payment.");
            onFailure(err);
          }
        })();
      },
      prefill: {
        name: data.name,
        email: data.email,
        contact: data.mob_no,
      },
      notes: {
        address: data.address,
      },
      theme: {
        color: "#471396",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    console.log("response:", rzp);

    rzp.on("payment.failed", function (response) {
      console.error(response.error);
      alert("Payment failed. Try again.");
    });
  } catch (err) {
    console.error(err);
    alert("Error in payment setup.");
    onFailure(err);
  }
};

export const cashOnDeliveryPayment = async ({
  data,
  product,
  webuser,
  onSuccess = () => {},
  onFailure = () => {},
}) => {
  console.log("COD product:", product);
  const productList = Array.isArray(product) ? product : [product];

  // Build product items array
  const productItems = productList?.map((item) => ({
    product: item._id,
    quantity: item.quantity,
    price: item.price,
  }));
  console.log("product array before totalAmount:", productItems);

  // Calculate total amount
  const totalAmount = productList.reduce((acc, item) => {
    console.log("totalAmount:", acc);

    return acc + item.price;
  }, 0);

  // console.log('COD product:',productItems);
  const orderData = {
    user: webuser._id,
    products: productItems,
    shippingInfo: {
      name: data.name,
      mob_no: data.mob_no,
      email: data.email,
      address: data.address,
      city: data.city,
      state:data.state,
      address: data.address,
      pincode: data.pincode,
    },
    paymentMethod: "COD",
    paymentStatus: "Pending",
    totalAmount: totalAmount,
  };
  console.log("cart COD:", orderData);

  try {
    const saveRes = await axios.post("/order/placeOrder", orderData);
    //   alert("Order placed successfully with Cash on Delivery!");
    onSuccess(saveRes.data);
  } catch (err) {
    console.error("Error saving order:", err);
    alert("Error in payment setup.");
    onFailure(err);
  }
};
