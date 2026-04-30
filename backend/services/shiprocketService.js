import axios from "axios";

export async function getShiprocketToken() {
  const response = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/auth/login",
    {
      email: process.env.SHIPROCKET_EMAIL,
      password: process.env.SHIPROCKET_PASSWORD
    }
  );

  return response.data.token;
}

export async function createShiprocketOrder(order) {
  const token = await getShiprocketToken();

  const allItems = [...order.products, ...(order.addons || [])];

  const orderItems = allItems.map((item, index) => ({
    name: item.name || "LUNÉVA Product",
    sku: `LUNEVA-${item.id || index}`,
    units: 1,
    selling_price: item.price || 0
  }));

  const response = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
    {
      order_id: order.orderId,
      order_date: new Date().toISOString().slice(0, 10),

      pickup_location: process.env.SHIPROCKET_PICKUP_LOCATION || "Primary",

      billing_customer_name: order.customer.name,
      billing_last_name: "",
      billing_address: order.customer.address,
      billing_city: order.customer.city,
      billing_pincode: order.customer.pincode,
      billing_state: order.customer.state,
      billing_country: "India",
      billing_email: order.customer.email || "info@luneva.co.in",
      billing_phone: order.customer.phone,

      shipping_is_billing: true,
      order_items: orderItems,

      payment_method: order.paymentMode === "COD" ? "COD" : "Prepaid",
      sub_total: order.total,

      length: 20,
      breadth: 15,
      height: 8,
      weight: 0.5
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

export async function assignShiprocketAWB(shipmentId) {
  const token = await getShiprocketToken();

  const response = await axios.post(
    "https://apiv2.shiprocket.in/v1/external/courier/assign/awb",
    {
      shipment_id: shipmentId
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data;
}

export async function trackByAWB(awb) {
  const token = await getShiprocketToken();

  const response = await axios.get(
    `https://apiv2.shiprocket.in/v1/external/courier/track/awb/${awb}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
}