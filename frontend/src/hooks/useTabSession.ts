import { useEffect } from "react";
import { TabSessionHelper } from "~/utils/tabSessionHelper";

export function useTabSession() {
  useEffect(() => {
    TabSessionHelper.saveCurrentTab();

    return () => {
      TabSessionHelper.removeCurrentTab();
    };
  }, []);

  return {};
}
