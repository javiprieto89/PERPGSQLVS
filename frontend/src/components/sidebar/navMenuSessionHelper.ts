type NavMenuState = Record<string, boolean>;

export class NavMenuSession {
  static NAV_MENU_SESSION_NAME = "navmenu";

  static getState() {
    const navmenuState = sessionStorage.getItem(this.NAV_MENU_SESSION_NAME);
    if (navmenuState) {
      return JSON.parse(navmenuState) as NavMenuState;
    }
    return undefined;
  }
  static removeState(key: string) {
    const storedString = sessionStorage.getItem(this.NAV_MENU_SESSION_NAME);
    if (!storedString) return;
    const stored = JSON.parse(storedString);
    delete stored[key];
    sessionStorage.setItem(this.NAV_MENU_SESSION_NAME, JSON.stringify(stored));
  }
  static saveState(key: string) {
    let stored = this.getState() || {};

    sessionStorage.setItem(
      this.NAV_MENU_SESSION_NAME,
      JSON.stringify({
        ...stored,
        [key]: true,
      })
    );
  }
  static updateState(key: string, isOpen: boolean) {
    if (isOpen) this.saveState(key);
    else this.removeState(key);
  }
}

// const [openSections, setOpenSections] = useState<Record<string, string | boolean>>({});
//   useEffect(() => {
//     const stored = localStorage.getItem("openSections");
//     if (stored) {
//       try {
//         setOpenSections(JSON.parse(stored));
//       } catch {
//         localStorage.removeItem("openSections");
//       }
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("openSections", JSON.stringify(openSections));
//   }, [openSections]);
//   const toggleSection = (title: string) =>
//     setOpenSections((prev) => ({ ...prev, [title]: !prev[title] }));
