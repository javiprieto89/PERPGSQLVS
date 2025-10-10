import { useEffect } from "react";
import { TabSessionHelper } from "~/utils/tab.session";

export function useTabSession() {
  useEffect(() => {
    TabSessionHelper.saveCurrentTab();

    return () => {
      TabSessionHelper.removeCurrentTab();
    };
  }, []);

  return {};
}
