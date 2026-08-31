import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/push`;

// Your VAPID PUBLIC key goes here.
// DO NOT put the private key in React.
const VAPID_PUBLIC_KEY = "BDtuQwR8ZcBqBtkl5TqIs8Xiu3ZgIejNzlRp8Nv8luK2JXdNtigMQ70noI_EXYPZD8Mgej99QeoYik_6ERXsNG0";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function enablePushNotifications() {
  try {
    if (!("Notification" in window)) {
      throw new Error("This browser does not support notifications.");
    }

    if (!("serviceWorker" in navigator)) {
      throw new Error("Service workers are not supported.");
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      throw new Error("Notification permission was not granted.");
    }

    const registration = await navigator.serviceWorker.ready;

    let subscription = await registration.pushManager.getSubscription();

    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    const patientId =
      localStorage.getItem("patientId") ||
      JSON.parse(localStorage.getItem("profile") || "null")?.id;

    if (!patientId) {
      throw new Error("Patient ID not found.");
    }

    const subscriptionJson = subscription.toJSON();
    
    await axios.post(`${API_URL}/subscribe`, null, {
      params: {
        patientId,
        endpoint: subscriptionJson.endpoint,
        p256dh: subscriptionJson.keys.p256dh,
        auth: subscriptionJson.keys.auth,
      },
    });

    console.log("Push subscription saved successfully.");

    return true;
  } catch (error) {
    console.error("Push notification setup failed:", error);
    return false;
  }
}