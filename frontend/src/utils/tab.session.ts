export class TabSessionHelper {
  static TAB_SESSION_KEY = "open_tabs";
  static getTabs(): string[] {
    // Registrar esta pestaña en la lista de pestañas abiertas
    const existing = sessionStorage.getItem(this.TAB_SESSION_KEY);
    const parsedTabs = existing ? JSON.parse(existing) : [];
    return parsedTabs;
  }

  static saveCurrentTab() {
    if (window.name) return;

    // Configurar ID único para esta pestaña
    const tabId = Date.now().toString();
    window.name = tabId;

    // Registrar esta pestaña en la lista de pestañas abiertas
    const existing = sessionStorage.getItem(this.TAB_SESSION_KEY);
    const parsedTabs = existing ? JSON.parse(existing) : [];
    parsedTabs.push(tabId);
    sessionStorage.setItem(this.TAB_SESSION_KEY, JSON.stringify(parsedTabs));
  }

  // Manejar cierre de pestaña/ventana
  static removeCurrentTab() {
    const tabs = sessionStorage.getItem(this.TAB_SESSION_KEY);
    if (tabs) {
      const parsedTabs = JSON.parse(tabs);
      const updatedTabs = parsedTabs.filter((t: string) => t !== window.name);
      sessionStorage.setItem(this.TAB_SESSION_KEY, JSON.stringify(updatedTabs));
    }
  }
}
