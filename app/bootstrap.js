(function () {
  "use strict";

  window.addEventListener("load", function () {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    navigator.serviceWorker
      .register("./sw.js", { scope: "/app/" })
      .catch(function (error) {
        console.error("AJAMIX service worker registration failed:", error);
      });
  });
})();
