type TSubscribeCallback = (isOpen: boolean) => void;

const ESC = 'Escape';

export default class ModalService {
  private static instance: ModalService;
  private subscriptions: Map<string, TSubscribeCallback>;
  private ids: string[];
  private isInitEvent: boolean;
  private readonly eventListener: (e: KeyboardEvent) => void;

  private constructor() {
    this.subscriptions = new Map();
    this.ids = [];
    this.isInitEvent = false;
    this.eventListener = (e: KeyboardEvent) => {
      const { key } = e;
      if (key === ESC) {
        const modalId = this.ids[this.ids.length - 1];
        if (modalId) this.getSubscribe(modalId)?.(false);
      }
    };
    this.addEventListener();
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ModalService();
    }
    return this.instance;
  }

  public subscribe(modalId: string, callback: TSubscribeCallback) {
    this.subscriptions.set(modalId, callback);
    this.publish(modalId);
  }

  public unsubscribe(modalId: string) {
    this.unpublish(modalId);
    this.subscriptions.delete(modalId);
    if (this.subscriptions.size === 0) this.clean(modalId);
  }

  public publish(modalId: string) {
    if (this.ids.includes(modalId)) return;
    this.createElement(modalId);
    this.controlBodyOverflow(false);
    this.ids.push(modalId);
    this.addEventListener();
  }

  public unsubscribeAll() {
    this.ids.forEach((id) => {
      this.unsubscribe(id);
    });
  }

  public unpublish(modalId: string) {
    this.removeElement(modalId);
    this.ids.pop();
    if (this.ids.length === 0) {
      this.controlBodyOverflow(true);
    }
  }

  private getSubscribe(modalId: string) {
    return this.subscriptions.get(modalId);
  }

  public clean(modalId: string) {
    this.removeEventListener();
    this.removeElement(modalId);
  }

  private addEventListener() {
    if (!this.isInitEvent) {
      this.isInitEvent = true;
      document.addEventListener('keydown', this.eventListener);
    }
  }

  private removeEventListener() {
    if (this.isInitEvent) {
      this.isInitEvent = false;
      document.removeEventListener('keydown', this.eventListener);
    }
  }

  private isAlreadyElementById = (id: string) => {
    return !!document.getElementById(id);
  };

  public createElement = (id: string) => {
    if (!this.isAlreadyElementById(id)) {
      this.controlBodyOverflow(false);
      const container = document.createElement('div');
      container.setAttribute('id', id);
      document.body.append(container);
    }
  };

  public removeElement = (modalId: string) => {
    this.controlBodyOverflow(true);
    document.getElementById(modalId)?.remove();
  };

  private controlBodyOverflow = (isOverflow: boolean) => {
    document.body.style.overflow = isOverflow ? '' : 'hidden';
  };
}
