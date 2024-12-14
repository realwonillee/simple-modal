"use client";

type TSubscribeCallback = (isOpen: boolean) => void;

const ESC = "Escape";

export default class ModalController {
  private static instance: ModalController;
  private subscriptions: Map<string, TSubscribeCallback>;
  private ids: string[];
  private isInitEvent: boolean;
  private eventListener: (e: KeyboardEvent) => void;

  private constructor() {
    this.subscriptions = new Map();
    this.ids = [];
    this.isInitEvent = false;
    this.eventListener = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === ESC) {
        const modalId = this.ids.pop();
        if (modalId) {
          this.unpublish(modalId);
        }
        if (this.ids.length === 0) {
          this.removeEventListener();
        }
      }
    };
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ModalController();
    }
    return this.instance;
  }

  public subscribe(modalId: string, callback: TSubscribeCallback) {
    this.subscriptions.set(modalId, callback);
  }

  public unsubscribe(modalId: string) {
    this.removeEventListener();
    this.removeElement(modalId);
  }

  public publish(modalId: string) {
    const subscribe = this.getSubscribe(modalId);
    if (subscribe) {
      this.createElementAppendBody(modalId);
      this.controllBodyOverflow(false);
      this.ids.push(modalId);
      this.addEventListener();
      subscribe(true);
    }
  }

  public unpublish(modalId: string) {
    const subscribe = this.getSubscribe(modalId);
    if (subscribe) {
      this.removeElement(modalId);
      this.ids.pop();
      if (this.ids.length === 0) {
        this.controllBodyOverflow(true);
      }
      subscribe(false);
    }
  }

  private getSubscribe(modalId: string) {
    return this.subscriptions.get(modalId);
  }

  private addEventListener() {
    if (!this.isInitEvent) {
      this.isInitEvent = true;
      document.addEventListener("keydown", this.eventListener);
    }
  }

  private removeEventListener() {
    if (this.isInitEvent) {
      this.isInitEvent = false;
      document.removeEventListener("keydown", this.eventListener);
    }
  }

  private isAleadyElementById = (id: string) => {
    return !!document.getElementById(id);
  };

  private createElementAppendBody = (id: string) => {
    if (!this.isAleadyElementById(id)) {
      const container = document.createElement("div");
      container.setAttribute("id", id);
      document.body.append(container);
    }
  };

  private removeElement = (modalId: string) => {
    document.getElementById(modalId)?.remove();
  };

  private controllBodyOverflow = (isOverflow: boolean) => {
    document.body.style.overflow = isOverflow ? "" : "hidden";
  };
}
