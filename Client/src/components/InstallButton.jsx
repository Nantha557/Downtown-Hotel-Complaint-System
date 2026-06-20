import { useEffect, useState } from "react";

function InstallButton() {

  const [deferredPrompt,
  setDeferredPrompt] =
  useState(null);

  useEffect(() => {

    const handler = (e) => {

      e.preventDefault();

      setDeferredPrompt(e);

    };

    window.addEventListener(
      "beforeinstallprompt",
      handler
    );

    return () => {

      window.removeEventListener(
        "beforeinstallprompt",
        handler
      );

    };

  }, []);

  const installApp = async () => {

    if (!deferredPrompt) {
      return;
    }

    deferredPrompt.prompt();

    await deferredPrompt.userChoice;

    setDeferredPrompt(null);

  };

  if (!deferredPrompt) {
    return null;
  }

  return (

    <button

      onClick={installApp}

      className="
      bg-green-600
      hover:bg-green-700
      text-white
      px-4
      py-2
      rounded-xl
      font-semibold
      "

    >

      📱 Install App

    </button>

  );

}

export default InstallButton;