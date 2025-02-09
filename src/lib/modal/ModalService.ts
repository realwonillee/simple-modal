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
        if (modalId) this.unpublish(modalId);
        if (this.ids.length === 0) {
          this.removeEventListener();
        }
      }
    };
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ModalService();
    }
    return this.instance;
  }

  public subscribe(modalId: string, callback: TSubscribeCallback) {
    this.subscriptions.set(modalId, callback);
  }

  public unsubscribe(modalId: string) {
    this.subscriptions.delete(modalId);
  }

  public clean(modalId: string) {
    this.removeEventListener();
    this.removeElement(modalId);
  }

  public publish(modalId: string) {
    console.log(modalId);
    const subscribe = this.getSubscribe(modalId);
    if (subscribe) {
      this.createElementAppendBody(modalId);
      this.controlBodyOverflow(false);
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
      subscribe(false);
      if (this.ids.length === 0) {
        this.controlBodyOverflow(true);
      }
    }
  }

  public unpublishAll() {
    this.ids = this.ids.filter((modalId) => {
      const subscribe = this.getSubscribe(modalId);
      if (subscribe) subscribe(false);
      this.removeElement(modalId);
      return false;
    });
    this.controlBodyOverflow(true);
  }

  private getSubscribe(modalId: string) {
    return this.subscriptions.get(modalId);
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

  private createElementAppendBody = (id: string) => {
    if (!this.isAlreadyElementById(id)) {
      const container = document.createElement('div');
      container.setAttribute('id', id);
      document.body.append(container);
    }
  };

  private removeElement = (modalId: string) => {
    document.getElementById(modalId)?.remove();
  };

  private controlBodyOverflow = (isOverflow: boolean) => {
    document.body.style.overflow = isOverflow ? '' : 'hidden';
  };
}
