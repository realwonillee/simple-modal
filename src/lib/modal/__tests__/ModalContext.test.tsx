import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock before imports
jest.mock('shortid', () => ({
  generate: () => 'mock-id',
}));

// Mock ModalPortal to prevent DOM errors
jest.mock('../ModalPortal', () => {
  return function MockModalPortal({ children }: { children: React.ReactNode }) {
    return <div>{children}</div>;
  };
});

// Mock ModalService with inline functions
jest.mock('../ModalService', () => ({
  __esModule: true,
  default: {
    getInstance: jest.fn().mockReturnValue({
      subscribe: jest.fn(),
      unsubscribe: jest.fn(),
      unsubscribeAll: jest.fn(),
    }),
  },
}));

// Import after mocks
import { ModalProvider, useModalContext } from '../ModalContext';

// Define the interface inline instead of importing
interface IModalContext {
  modalAction: {
    isOpen: (modalId: string) => boolean;
    open: (element: React.ReactElement) => void;
    replace: (element: React.ReactElement, isReplaceAll?: boolean) => void;
    close: () => void;
    closeAll: () => void;
  };
}

// Test Component that uses the modal context
const TestComponent = () => {
  const { modalAction } = useModalContext<IModalContext>();

  const openModal = () => {
    modalAction.open(<div data-testid="modal-content">Modal Content</div>);
  };

  const replaceModal = () => {
    modalAction.replace(<div data-testid="replaced-modal">Replaced Modal</div>);
  };

  const replaceAllModals = () => {
    modalAction.replace(
      <div data-testid="replaced-all">Replaced All</div>,
      true,
    );
  };

  const closeModal = () => {
    modalAction.close();
  };

  const closeAllModals = () => {
    modalAction.closeAll();
  };

  return (
    <div>
      <button data-testid="open-button" onClick={openModal}>
        Open Modal
      </button>
      <button data-testid="replace-button" onClick={replaceModal}>
        Replace Modal
      </button>
      <button data-testid="replace-all-button" onClick={replaceAllModals}>
        Replace All Modals
      </button>
      <button data-testid="close-button" onClick={closeModal}>
        Close Modal
      </button>
      <button data-testid="close-all-button" onClick={closeAllModals}>
        Close All Modals
      </button>
    </div>
  );
};

describe('ModalContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '';
  });

  test('should open a modal', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    const openButton = screen.getByTestId('open-button');
    act(() => {
      fireEvent.click(openButton);
    });

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });

  test('should replace a modal', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    const openButton = screen.getByTestId('open-button');
    act(() => {
      fireEvent.click(openButton);
    });

    const replaceButton = screen.getByTestId('replace-button');
    act(() => {
      fireEvent.click(replaceButton);
    });

    expect(screen.getByTestId('replaced-modal')).toBeInTheDocument();
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  test('should replace all modals', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    // Open multiple modals
    const openButton = screen.getByTestId('open-button');
    act(() => {
      fireEvent.click(openButton);
      fireEvent.click(openButton);
    });

    const replaceAllButton = screen.getByTestId('replace-all-button');
    act(() => {
      fireEvent.click(replaceAllButton);
    });

    expect(screen.getByTestId('replaced-all')).toBeInTheDocument();
    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  test('should close a modal', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    const openButton = screen.getByTestId('open-button');
    act(() => {
      fireEvent.click(openButton);
    });

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();

    const closeButton = screen.getByTestId('close-button');
    act(() => {
      fireEvent.click(closeButton);
    });

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });

  test('should close all modals', () => {
    render(
      <ModalProvider>
        <TestComponent />
      </ModalProvider>,
    );

    // Open multiple modals
    const openButton = screen.getByTestId('open-button');
    act(() => {
      fireEvent.click(openButton);
      fireEvent.click(openButton);
    });

    const closeAllButton = screen.getByTestId('close-all-button');
    act(() => {
      fireEvent.click(closeAllButton);
    });

    expect(screen.queryByTestId('modal-content')).not.toBeInTheDocument();
  });
});
