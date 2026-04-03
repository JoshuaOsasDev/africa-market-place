"use client";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useAppSelector } from "@/redux/store";

function PusherSubscription() {
  const user = useAppSelector((state) => state.user?.user);

  const userId = user?._id;
  //console.log(userId, "ID");
  useEffect(() => {
    if (!userId) return;

    Pusher.logToConsole = true;

    const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
    });

    const channel = pusherClient.subscribe(`user-${userId}`);

    channel.bind("delivery", (data: any) => {
      alert(data);
      console.log("Notification received:", data);
    });

    channel.bind("payment", (data: any) => {
      alert(data);
      console.log("Notification received:", data);
    });

    channel.bind("message", (data: any) => {
      console.log("Message received:", data);
      alert(data);
    });

    channel.bind("pusher:subscription_succeeded", () => {
      console.log("Subscribed successfully:", `user-${userId}`);
    });

    channel.bind_global((eventName: string, data: any) => {
      console.log("Event received:", eventName, data);
    });

    return () => {
      pusherClient.unsubscribe(`user-${userId}`);
      pusherClient.disconnect();
    };
  }, [userId]);

  return null;
}

export default PusherSubscription;
