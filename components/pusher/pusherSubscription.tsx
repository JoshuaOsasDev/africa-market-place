"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { setPusherState } from "@/redux/slices/pusherState";

function PusherSubscription() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user?.user);

  const userId = user?._id;
  //console.log(userId, "ID");
  useEffect(() => {
    if (!userId) return;

    Pusher.logToConsole = true;

    const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channelName = `user-${userId}`;
    const channel = pusherClient.subscribe(channelName);

    channel.bind("delivery", (data: any) => {
      alert(data);
      console.log("Notification received:", data);
      dispatch(
        setPusherState({
          pusher: {
            connected: true,
            channel: channelName,
            event: "delivery",
            data,
          },
        }),
      );
    });

    channel.bind("payment", (data: any) => {
      alert(data);
      console.log("Notification received:", data);
      //update realtimepayment status with pusher data
      dispatch(
        setPusherState({
          pusher: {
            connected: true,
            channel: channelName,
            paymetStatus: data.status === "success",
            event: "payment",
            data,
          },
        }),
      );
    });

    channel.bind("message", (data: any) => {
      console.log("Message received:", data);
      alert(data);
    });

    channel.bind("pusher:subscription_succeeded", () => {
      dispatch(
        setPusherState({
          pusher: {
            connected: true,
            channel: channelName,
            event: "subscribed",
            data: null,
          },
        }),
      );

      console.log("Subscribed successfully:", `user-${userId}`);
    });

    channel.bind_global((eventName: string, data: any) => {
      dispatch(
        setPusherState({
          pusher: {
            connected: true,
            channel: channelName,
            event: eventName,
            data,
          },
        }),
      );

      console.log("Event received:", eventName, data);
    });

    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
      pusherClient.disconnect();
      dispatch(
        setPusherState({
          pusher: {
            connected: false,
            channel: null,
            event: "disconnected",
            data: null,
          },
        }),
      );
    };
  }, [userId, dispatch]);

  return null;
}

export default PusherSubscription;
