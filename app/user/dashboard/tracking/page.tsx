import TrackerComp from "@/components/pageComponents/user/tracker/trackerComp";
const placeholderParcel = {
  parcel: {
    id: 648917857,
    reference: "0",
    status: {
      id: 1000,
      message: "Ready to send",
    },
    tracking_number: "JJD0002233487011017",
    weight: "1.000",
    order_number: "ORD-1777423277971",
    total_insured_value: 0,
    parcel_items: [],
    documents: [],
    external_reference: null,
    is_return: false,
    note: "",
    total_order_value: null,
    total_order_value_currency: null,
    length: null,
    width: null,
    height: null,
    contract: 40353,
    address_divided: {
      street: "Fletcher road",
      house_number: "62",
    },
    shipment: {
      id: 27227,
      name: "InPost Locker to Address Two Day 0-15kg",
    },
    shipping_method: 27227,
    shipping_method_checkout_name: null,
    insured_value: 0,
    shipment_uuid: null,
    data: {},
    type: "parcel",
    external_order_id: "648917857",
    external_shipment_id: "",
    colli_uuid: "d843fb82-86a7-4039-adcb-5032e76d200a",
    collo_nr: 0,
    collo_count: 1,
    label: {
      normal_printer: [],
      label_printer:
        "https://panel.sendcloud.sc/api/v2/labels/label_printer/648917857",
    },
    customs_declaration: {
      normal_printer:
        "https://panel.sendcloud.sc/api/v2/customs_declaration/normal_printer/648917857",
    },
    to_state: null,
    date_created: "29-04-2026 00:41:18",
    date_announced: "29-04-2026 00:41:20",
    date_updated: "29-04-2026 00:41:20",
    customs_information: null,
    awb_tracking_number: null,
    box_number: null,
    customs_invoice_nr: "",
    customs_shipment_type: null,
    address: "62 Fletcher road",
    address_2: "",
    city: "Stoke-on-trent",
    company_name: "Acme Corp",
    country: {
      iso_2: "GB",
      iso_3: "GBR",
      name: "United Kingdom",
    },
    email: "user@example.com",
    name: "John Doe",
    postal_code: "ST4 4AJ",
    telephone: "+447123456789",
    to_post_number: "",
    to_service_point: null,
    carrier: {
      code: "inpost_gb",
    },
    tracking_url:
      "https://tracking.eu-central-1-0.sendcloud.sc/forward?carrier=inpost_gb&code=JJD0002233487011017&destination=GB&lang=en-us&source=GB&type=parcel&verification=ST4+4AJ&servicepoint_verification=&shipping_product_code=inpost_gb%3Alockertoaddress&created_at=2026-04-29",
  },
};
export default function Page() {
  return (
    <div>
      <TrackerComp data={placeholderParcel} />
    </div>
  );
}
