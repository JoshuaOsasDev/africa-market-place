export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10 text-gray-700">
      <h1 className="mb-6 text-3xl font-bold">Return & Refund Policy</h1>

      <p className="mb-4">
        Thank you for shopping with us. If you are not entirely satisfied with
        your purchase, we&ldquo;re here to help.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Returns</h2>
      <p className="mb-4">
        You have 7 days from the date you received your item to request a
        return. To be eligible for a return, your item must be unused, in the
        same condition that you received it, and in its original packaging.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Non-Returnable Items</h2>
      <ul className="mb-4 list-disc pl-6">
        <li>Perishable goods (e.g., food, flowers)</li>
        <li>Personal care items</li>
        <li>Gift cards</li>
        <li>Downloadable software or digital products</li>
      </ul>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Refunds</h2>
      <p className="mb-4">
        Once we receive and inspect your returned item, we will notify you of
        the status of your refund. If approved, your refund will be processed to
        your original method of payment within 5–10 business days.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">
        Late or Missing Refunds
      </h2>
      <p className="mb-4">
        If you haven’t received your refund yet, please first check your bank
        account again. Then contact your bank or payment provider, as it may
        take some time before your refund is officially posted.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Exchanges</h2>
      <p className="mb-4">
        We only replace items if they are defective or damaged. If you need to
        exchange an item, please contact our support team to initiate the
        process.
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Shipping Returns</h2>
      <p className="mb-4">
        You will be responsible for paying your own shipping costs for returning
        your item. Shipping costs are non-refundable unless the return is due to
        our error (e.g., wrong or defective item).
      </p>

      <h2 className="mt-6 mb-2 text-xl font-semibold">Contact Us</h2>
      <p>
        If you have any questions about returns or refunds, please contact us at{" "}
        <span className="font-medium">support@yourstore.com</span>.
      </p>
    </div>
  );
}
