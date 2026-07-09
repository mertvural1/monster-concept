"use client";

import { useEffect } from "react";

import { UiMetric } from "@/shared/enums/ui-metric.enum";

export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }, UiMetric.SERVICE_WORKER_DELAY);

    return () => window.clearTimeout(timeoutId);
  }, []);

  return null;
}
