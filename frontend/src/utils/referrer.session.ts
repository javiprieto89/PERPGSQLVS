import z from "zod";
export class Referrer {
  private static readonly REFERRER_KEY = "referrer";

  private static readonly referrerSchema = z.url();

  static get(): string {
    return sessionStorage.getItem(this.REFERRER_KEY) || "/";
  }

  static getOnce(): string {
    const ref = sessionStorage.getItem(this.REFERRER_KEY) || "/";
    this.remove();
    return ref;
  }

  static save(referrer: string = "/") {
    if (window.name) return;

    const result = this.referrerSchema.safeParse(referrer);

    if (!result.success) {
      console.warn("Cannot save invalid URL for referrer:", result.error);
      return {
        error: "Cannot save invalid URL for referrer",
      };
    }

    sessionStorage.setItem(this.REFERRER_KEY, result.data);

    return { error: null };
  }

  // Manejar cierre de pestaña/ventana
  static remove() {
    sessionStorage.removeItem(this.REFERRER_KEY);
  }

  // static setRedirectAfterLogin(url: string | undefined) {
  //     try {
  //       if (!url || !z.url().parse(url)) return undefined;
  //       sessionStorage.setItem(this.REDIRECT_AFTER_LOGIN_KEY, String(url));
  //       return true;
  //     } catch (error: unknown) {
  //       const message = error instanceof Error ? error.message : String(error);
  //       console.error("Error in redirect:", message);
  //       return false;
  //     }
  //   }

  //   static getRedirectAfterLogin() {
  //     try {
  //       return sessionStorage.getItem(this.REDIRECT_AFTER_LOGIN_KEY) || "/";
  //     } catch (error: unknown) {
  //       const message = error instanceof Error ? error.message : String(error);
  //       console.error("Error getting redirect", message);
  //       return "/";
  //     }
  //   }

  //   static removeRedirectAfterLogin() {
  //     sessionStorage.removeItem(this.REDIRECT_AFTER_LOGIN_KEY);
  //   }
}
