export class SidebarStorage {
  static SIDEBAR_COOKIE_NAME = "sidebar_state";
  static getTabs(): string[] {
    // Registrar esta pestaña en la lista de pestañas abiertas
    const existing = localStorage.getItem(this.SIDEBAR_COOKIE_NAME);
    return existing ? JSON.parse(existing) : [];
  }

  static setOpen(value: boolean | ((value: boolean) => boolean)) {
    const tabs = this.getTabs();
    const index = tabs.indexOf(window.name);
    const isOpen = typeof value === "function" ? value(index !== -1) : value;

    if (isOpen && index === -1) {
      // Agregar pestaña
      tabs.push(window.name);
    } else if (!isOpen && index !== -1) {
      // Remover pestaña
      tabs.splice(index, 1);
    }
    localStorage.setItem(this.SIDEBAR_COOKIE_NAME, JSON.stringify(tabs));
  }

  static isOpen(): boolean {
    const tabs = this.getTabs();
    return tabs.includes(window.name);
  }

  static clear() {
    localStorage.removeItem(this.SIDEBAR_COOKIE_NAME);
  }
}
