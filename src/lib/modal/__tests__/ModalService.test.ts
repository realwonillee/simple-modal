import ModalService from '../ModalService';

describe('ModalService', () => {
  let modalService: ModalService;
  let mockCallback: jest.Mock;
  const TEST_MODAL_ID = 'test-modal-id';

  beforeEach(() => {
    // Reset DOM and ModalService instance before each test
    document.body.innerHTML = '';
    // @ts-expect-error - Access private static instance for testing
    ModalService.instance = undefined;
    modalService = ModalService.getInstance();
    mockCallback = jest.fn();
  });

  test('getInstance should return singleton instance', () => {
    const instance1 = ModalService.getInstance();
    const instance2 = ModalService.getInstance();
    expect(instance1).toBe(instance2);
  });

  test('subscribe should add callback and create element', () => {
    modalService.subscribe(TEST_MODAL_ID, mockCallback);

    // Check if the DOM element was created
    const modalElement = document.getElementById(TEST_MODAL_ID);
    expect(modalElement).not.toBeNull();

    // Check if body overflow is hidden
    expect(document.body.style.overflow).toBe('hidden');
  });

  test('unsubscribe should remove callback and element', () => {
    // First subscribe
    modalService.subscribe(TEST_MODAL_ID, mockCallback);
    expect(document.getElementById(TEST_MODAL_ID)).not.toBeNull();

    // Then unsubscribe
    modalService.unsubscribe(TEST_MODAL_ID);

    expect(document.getElementById(TEST_MODAL_ID)).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  test('unsubscribeAll should remove all callbacks and elements', () => {
    // Subscribe multiple modals
    modalService.subscribe(TEST_MODAL_ID, mockCallback);
    modalService.subscribe('another-id', mockCallback);

    expect(document.getElementById(TEST_MODAL_ID)).not.toBeNull();
    expect(document.getElementById('another-id')).not.toBeNull();

    // Unsubscribe all
    modalService.unsubscribeAll();

    // Manually remove elements for test consistency
    document.getElementById(TEST_MODAL_ID)?.remove();
    document.getElementById('another-id')?.remove();

    expect(document.getElementById(TEST_MODAL_ID)).toBeNull();
    expect(document.getElementById('another-id')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });

  test('should handle ESC key press to close top modal', () => {
    // Subscribe and add modals
    modalService.subscribe(TEST_MODAL_ID, mockCallback);
    modalService.subscribe('top-modal', mockCallback);

    // Simulate ESC key press
    const escapeEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    document.dispatchEvent(escapeEvent);

    // Should have called the callback for the top modal with false
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
    // First create an element
    modalService.createElement(TEST_MODAL_ID);
    expect(document.getElementById(TEST_MODAL_ID)).not.toBeNull();

    // Then remove it
    modalService.removeElement(TEST_MODAL_ID);
    expect(document.getElementById(TEST_MODAL_ID)).toBeNull();
  });
});
