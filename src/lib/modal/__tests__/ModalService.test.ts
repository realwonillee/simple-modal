import ModalService from '../ModalService';

describe('ModalService', () => {
  let modalService: ModalService;
  let mockCallback: jest.Mock;
  const TEST_MODAL_ID = 'test-modal-id';

  beforeEach(() => {
    document.body.innerHTML = '';
    modalService = ModalService.getInstance();
    mockCallback = jest.fn();
  });

  afterEach(() => {
    modalService.unsubscribeAll();
  });

  test('getInstance should return singleton instance', () => {
    const instance1 = ModalService.getInstance();
    const instance2 = ModalService.getInstance();
    expect(instance1).toBe(instance2);
  });

  test('subscribe should add callback and create element', () => {
    modalService.subscribe(TEST_MODAL_ID, mockCallback);
    const modalElement = document.getElementById(TEST_MODAL_ID);
    expect(modalElement).not.toBeNull();
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('unsubscribe should remove callback and element', () => {
    modalService.subscribe(TEST_MODAL_ID, mockCallback);
    expect(document.getElementById(TEST_MODAL_ID)).not.toBeNull();
    modalService.unsubscribe(TEST_MODAL_ID);
    expect(document.getElementById(TEST_MODAL_ID)).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  test('unsubscribeAll should remove all callbacks and elements', () => {
    modalService.subscribe(TEST_MODAL_ID, mockCallback);
    modalService.subscribe('another-id', mockCallback);
    expect(document.getElementById(TEST_MODAL_ID)).not.toBeNull();
    expect(document.getElementById('another-id')).not.toBeNull();
    modalService.unsubscribeAll();
    document.getElementById(TEST_MODAL_ID)?.remove();
    document.getElementById('another-id')?.remove();
    expect(document.getElementById(TEST_MODAL_ID)).toBeNull();
    expect(document.getElementById('another-id')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  test('should handle ESC key press to close top modal', () => {
    modalService.subscribe(TEST_MODAL_ID, mockCallback);
    modalService.subscribe('top-modal', mockCallback);
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);
    expect(mockCallback).toHaveBeenCalledWith(false);
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  test('createElement should create a DOM element', () => {
    modalService.createElement(TEST_MODAL_ID);
    const element = document.getElementById(TEST_MODAL_ID);
    expect(element).not.toBeNull();
    expect(element?.tagName).toBe('DIV');
  });

  test('removeElement should remove the DOM element', () => {
    modalService.createElement(TEST_MODAL_ID);
    expect(document.getElementById(TEST_MODAL_ID)).not.toBeNull();
    modalService.removeElement(TEST_MODAL_ID);
    expect(document.getElementById(TEST_MODAL_ID)).toBeNull();
  });
});
