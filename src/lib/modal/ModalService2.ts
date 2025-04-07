type TSubscribeCallback = (isOpen: boolean) => void;

const ESC = 'Escape';

export default class ModalService {
  private static instance: ModalService;
  private isInitEvent: boolean;
  private readonly eventListener: (e: KeyboardEvent) => void;

  private constructor() {
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
