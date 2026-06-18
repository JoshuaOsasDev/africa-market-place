"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ContactInformationForm } from "@/components/checkout/contactInformationForm";
import { ShippingAddressForm } from "@/components/checkout/shippingAddressForm";
import { PaymentMethodForm } from "@/components/checkout/paymentMethodForm";
import { CheckoutOrderSummary } from "@/components/checkout/checkoutOrderSummary";
import {
  CheckoutSummary,
  ContactInformation,
  ShippingAddress,
  PaymentMethod,
  CardPayment,
} from "@/types/checkout";
import { CartItem } from "@/types/cart";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useCart } from "@/lib/hooks/useCart";

import {
  useAllDelivery,
  useRemoveFromCart,
  useCreateOrder,
  useCourier,
} from "@/lib/hooks/userDashboard/useUser";
import { deleteCart, setShippingFee } from "@/redux/slices/product";
import { Product } from "@/types/product";
import { DeliveryAddressSelector } from "@/components/checkout/deliveryAddressSelector";
import Loader from "@/components/common/loader";
//import { postUserOrder } from "@/services/apiServices/userDashboard";
import {
  CourierSelector,
  CourierType,
} from "@/components/checkout/courierSelector";

export function CheckoutPageClient() {
  const [courier, setCourier] = useState<CourierType>("evri");
  const router = useRouter();

  const handleCourierSelect = (id: CourierType) => {
    setCourier(id);
    const selectedPrice = carrierData?.data?.[id]?.price;
    //console.log(selectedPrice, "selected price");
    dispatch(setShippingFee(selectedPrice));
  };
  // console.log(carrierResponse, "Courir");
  const dispatch = useAppDispatch();
  const cart: CartItem[] = useAppSelector(
    (state) => state.product.checkout.cart,
  );

  const user = useAppSelector((state) => state.user.user);
  const shippingCost = useAppSelector(
    (state) => state.product.checkout.shipping,
  );
  const subtotal = useAppSelector((state) => state.product.checkout.subtotal);
  const total = useAppSelector((state) => state.product.checkout.total);
  const discount = useAppSelector((state) => state.product.checkout.discount);

  const { cartItems, updateQuantity } = useCart();
  const { mutate: removeFromCartAPI } = useRemoveFromCart();

  console.log(cartItems, "items");

  const totalQuantity = cartItems?.reduce(
    (total: number, item: CartItem) => total + item.quantity,
    0,
  );

  const totalWeight = cartItems?.reduce(
    (total: number, item: CartItem) =>
      total + (item.weight || 0) * item.quantity,
    0,
  );

  console.log(totalWeight, totalQuantity, "weight", "quantity");
  const { data: carrierResponse, isLoading: loadingCarrier } =
    useCourier(totalWeight);
  const carrierData = carrierResponse;

  //console.log(totalWeight, "weight");
  const { mutate: createOrder, isPending } = useCreateOrder();
  const { deliveries } = useAllDelivery();
  // console.log(deliveries, "delivery");
  const delivery = deliveries?.addresses || [];

  //console.log(delivery, "delivery");
  const [loading, setLoading] = useState(false);

  const [contact, setContact] = useState<ContactInformation>({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phoneNumber: user?.phone,
    emailAddress: user?.email,
  });

  const [shipping, setShipping] = useState<ShippingAddress>({
    id: delivery._id,
    address: `${delivery.houseNumber} ${delivery.address}`,
    country: delivery.country,
    city: delivery.city,
    county: delivery.county,
    zip: delivery.postCode,
    email: delivery.email,
    phoneNumber: delivery.phoneNumber,
  });

  //console.log(shipping.address, delivery, "ship");
  const [useDifferentBilling, setUseDifferentBilling] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("stripe");

  const [cardDetails, setCardDetails] = useState<CardPayment>({
    cardNumber: "",
    expirationDate: "",
    cvc: "",
  });

  const removeP = (productToRemove: Product) => {
    // Update Redux store
    dispatch(deleteCart(productToRemove.slug));

    // Sync with backend
    removeFromCartAPI({ pid: productToRemove });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    // console.log(quantity, "qut");
    updateQuantity(productId, quantity);
  };
  const handleRemove = (productId: string) => {
    const product = cartItems?.find(
      (item: CartItem) => item.slug === productId,
    );

    if (product) {
      removeP(product);
    }
  };

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const data = {
        user: {
          ...shipping,
          firstName: contact.firstName,
          lastName: contact.lastName,
          phone: contact.phoneNumber,
          address: shipping.address,
          city: shipping.city,
          state: shipping.county,
          country: shipping.country,
          // zip: shipping.zip,
          email: contact.emailAddress,
        },
        items: cart?.map((item: CartItem) => ({
          pid: item.pid,
          name: item.name,
          salePrice: item.salePrice,
          sku: item.sku,
          shop: item.shop,
          quantity: item.quantity,
          subtotal: item.subtotal,
          image: item.images?.[0]?.url,
          variantId: item.variantId || undefined,
        })),
        subtotal,
        shipping: shippingCost,
        discount,
        total,
        paymentMethod: "Stripe",
        currency: "gbp",
        conversionRate: 1200,
        totalItems: cart?.length,
        parcel: {
          name: `${contact.firstName} ${contact.lastName}`,
          telephone: contact.phoneNumber,
          email: contact.emailAddress,
          city: shipping.city,
          country: shipping.country,
          county: shipping.county,
          postal_code: shipping.zip,
          address: shipping.address,
          house_number: shipping.address.split(" ")[0],
          order_number: "ORD-" + Date.now(),
          shipment: { id: 27227 },
          currency: "GB",
          weight: totalWeight,
          shipping_method:
            courier === "evri" ? "home_delivery" : "locker_collection",
          request_label: true,
        },
      };

      console.log(data);
      createOrder(data);
      //postUserOrder(data);
      //console.log(data, "checkout data");
      // console.log("Order placed:", {
      //   contact,
      //   shipping,
      //   useDifferentBilling,
      //   paymentMethod,
      //   cardDetails: paymentMethod === "stripe" ? "stripe" : null,
      //   cart,
      // });

      // router.push("/user/payment");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      router.push("/user/cart");
    }
    if (deliveries?.addresses?.length) {
      const firstAddress = deliveries.addresses[0];

      setShipping({
        id: firstAddress._id,
        address: `${firstAddress.houseNumber} ${firstAddress.address}`,
        country: firstAddress.country,
        city: firstAddress.city,
        county: firstAddress.county,
        zip: firstAddress.postCode,
        phoneNumber: firstAddress.phoneNumber,
        email: firstAddress.email,
      });
    }
  }, [deliveries]);

  if (isPending) return <Loader />;
  if (cart?.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F9FAFB] px-4">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-[#111827]">
            Your cart is empty
          </h1>
          <p className="mb-6 text-[#6F6F6F]">
            Add some items to your cart before checking out.
          </p>
          <Link href="/user/products">
            <button className="rounded-full bg-[#2E7D32] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#246628]">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // console.log(shipping, "ship");
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/user/cart"
          className="mb-6 inline-flex items-center gap-2 text-[#111827] transition-colors hover:text-[#2E7D32]"
        >
          <ArrowLeft size={18} />
          <span className="font-medium">Back to shop</span>
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            <ContactInformationForm values={contact} onChange={setContact} />
            <DeliveryAddressSelector
              deliveries={delivery}
              shipping={shipping}
              setShipping={setShipping}
              useDifferentBilling={useDifferentBilling}
              setUseDifferentBilling={setUseDifferentBilling}
            />
            {delivery.length > 0 && (
              <CourierSelector
                data={carrierData?.data}
                selectedCourier={courier}
                isLoading={loadingCarrier}
                onSelect={handleCourierSelect}
              />
            )}
            <PaymentMethodForm
              paymentMethod={paymentMethod}
              onPaymentMethodChange={setPaymentMethod}
              cardDetails={cardDetails}
              onCardDetailsChange={setCardDetails}
            />
          </div>

          <div className="h-fit lg:sticky lg:top-8">
            <CheckoutOrderSummary
              summary={cart}
              delivery={delivery}
              courier={courier}
              onQuantityChange={handleQuantityChange}
              onRemove={handleRemove}
              onPlaceOrder={handlePlaceOrder}
              loading={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
