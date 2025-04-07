export class ScrollManager {
  private static instance: ScrollManager;
  private lockCount = 0;
  private originalStyle = "";
  private originalPadding = "";

  constructor() {}

  public static getInstance(): ScrollManager {
    if (!ScrollManager.instance) {
      ScrollManager.instance = new ScrollManager();
    }
    return ScrollManager.instance;
  }

  public lock() {
    if (typeof window === "undefined") return;

    if (this.lockCount === 0) {
      this.originalStyle = window.getComputedStyle(document.body).overflow;
      this.originalPadding = window.getComputedStyle(
        document.body
      ).paddingRight;

      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;

      document.body.style.overflow = "hidden";
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${
          parseInt(this.originalPadding) + scrollbarWidth
        }px`;
      }
    }

    this.lockCount++;
  }

  public unlock() {
    if (typeof window === "undefined" || this.lockCount <= 0) return;

    this.lockCount--;

    if (this.lockCount === 0) {
      document.body.style.overflow = this.originalStyle;
      document.body.style.paddingRight = this.originalPadding;
    }
  }

  public forceUnlock(): void {
    if (typeof window === "undefined") return;
    this.lockCount = 0;
    document.body.style.overflow = this.originalStyle || "auto";
    document.body.style.paddingRight = this.originalPadding || "";
  }

  public isLocked(): boolean {
    return this.lockCount > 0;
  }
}
