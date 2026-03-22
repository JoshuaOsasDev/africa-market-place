export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-gray-700">
      <h1 className="mb-6 text-3xl font-bold">Shipping Policy</h1>

      <p className="mb-4">
        Thank you for shopping with us. We are committed to delivering your
        orders quickly and safely. Please review our shipping policy below for
        more information.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Processing Time</h2>
      <p className="mb-4">
        All orders are processed within 1–3 business days. Orders are not
        shipped or delivered on weekends or public holidays. If we are
        experiencing a high volume of orders, shipments may be delayed slightly.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">
        Shipping Rates & Delivery Time
      </h2>
      <ul className="mb-4 list-disc pl-6">
        <li>Standard Shipping: 3–7 business days</li>
        <li>Express Shipping: 1–3 business days</li>
        <li>International Shipping: 7–14 business days</li>
      </ul>

      <p className="mb-4">
        Shipping charges for your order will be calculated and displayed at
        checkout.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">
        Shipment Confirmation & Tracking
      </h2>
      <p className="mb-4">
        You will receive a shipment confirmation email once your order has
        shipped, containing your tracking number. The tracking number will be
        active within 24 hours.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Delivery Issues</h2>
      <p className="mb-4">
        If your order is delayed, lost, or damaged during transit, please
        contact our support team immediately. We will work with the shipping
        carrier to resolve the issue as quickly as possible.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Incorrect Address</h2>
      <p className="mb-4">
        Please ensure that your shipping address is correct at checkout. We are
        not responsible for orders shipped to incorrectly provided addresses.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Contact Us</h2>
      <p>
        If you have any questions about your order or shipping, please contact
        our support team at{" "}
        <span className="font-medium">support@yourstore.com</span>.
      </p>
    </div>
  );
}
