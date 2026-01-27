"use client";
import TextStyle from "@/components/common/textStyle";
import ToggleSwitch from "@/components/common/toggleSwitch";
import React, { useState } from "react";

function page() {
  const [enabledOrderConfirmation, setEnabledOrderConfirmation] =
    useState(false);
  const [enabledOrderStatusChange, setEnabledOrderStatusChange] =
    useState(false);
  const [enabledOrderDelivered, setEnabledOrderDelivered] = useState(false);
  const [enabledEmailNotification, setEnabledEmailNotification] =
    useState(false);

  console.log(
    enabledOrderConfirmation,
    enabledOrderStatusChange,
    enabledOrderDelivered,
    enabledEmailNotification,
  );

  const notificationData = [
    {
      heading: "Order Confirmation",
      text: "You will be notified when customer Order products",
      id: 1,
    },
    {
      heading: "Order Status Change",
      text: "You will be notified when customer Order products",
      id: 2,
    },
    {
      heading: "Order Delivered",
      text: "You will be notified when customer Order products",
      id: 3,
    },
    {
      heading: "Email Notification",
      text: "Turn on email notification to get updates through email",
      id: 4,
    },
  ];
  return (
    <div className="flex flex-col space-y-3 mx-auto my-4  w-full rounded-md bg-white p-4 md:w-4/5 md:p-6 lg:w-3/5 ">
      {notificationData.map((data) => {
        return (
          <div key={data.id} className="flex justify-between items-baseline">
            <div>
              <TextStyle textContent={data.heading}
              textStyle="text-4 text-[#000000] font-medium"
              />
              <TextStyle textContent={data.text}
              textStyle="text-sm text-[#595959] "
              />
            </div>
            <div>
              <ToggleSwitch
                checked={
                  data.id === 1
                    ? enabledOrderConfirmation
                    : data.id === 2
                      ? enabledOrderStatusChange
                      : data.id === 3
                        ? enabledOrderDelivered
                        : enabledEmailNotification
                }
                onChange={() => {
                  data.id === 1
                    ? setEnabledOrderConfirmation(!enabledOrderConfirmation)
                    : data.id === 2
                      ? setEnabledOrderStatusChange(!enabledOrderStatusChange)
                      : data.id === 3
                        ? setEnabledOrderDelivered(!enabledOrderDelivered)
                        : setEnabledEmailNotification(
                            !enabledEmailNotification,
                          );
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default page;
