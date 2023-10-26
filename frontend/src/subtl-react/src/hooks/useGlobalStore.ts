import React, { useState } from "react";

export function useGlobalStore() {
  const [token, setToken] = useState<string | null>(null);

  return {};
}
