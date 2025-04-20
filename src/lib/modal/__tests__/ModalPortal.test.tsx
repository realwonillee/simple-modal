import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ModalPortal from '../ModalPortal';

describe('ModalPortal', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  test('should render children in the specified modal element', () => {
    // Create modal element in the DOM
    const modalId = 'test-modal';
    const modalElement = document.createElement('div');
    modalElement.id = modalId;
    document.body.appendChild(modalElement);

    // Render a child element through the portal
    const testId = 'portal-content';
    render(
      <ModalPortal modalId={modalId}>
        <div data-testid={testId}>Portal Content</div>
      </ModalPortal>,
    );

    const portalContent = document.querySelector(`[data-testid="${testId}"]`);
    expect(portalContent).not.toBeNull();
    expect(modalElement.contains(portalContent)).toBe(true);
  });

  test('should update when props change', () => {
    const modalId = 'test-modal';
    const modalElement = document.createElement('div');
    modalElement.id = modalId;
    document.body.appendChild(modalElement);

    const { rerender } = render(
      <ModalPortal modalId={modalId}>
        <div data-testid="initial-content">Initial Content</div>
      </ModalPortal>,
    );

    expect(
      document.querySelector('[data-testid="initial-content"]'),
    ).not.toBeNull();

    rerender(
      <ModalPortal modalId={modalId}>
        <div data-testid="updated-content">Updated Content</div>
      </ModalPortal>,
    );

    expect(
      document.querySelector('[data-testid="initial-content"]'),
    ).toBeNull();
    expect(
      document.querySelector('[data-testid="updated-content"]'),
    ).not.toBeNull();
  });

  test('should work with nested components', () => {
    const modalId = 'test-modal';
    const modalElement = document.createElement('div');
    modalElement.id = modalId;
    document.body.appendChild(modalElement);

    const NestedComponent = () => (
      <div data-testid="nested">Nested Component</div>
    );

    render(
      <ModalPortal modalId={modalId}>
        <div data-testid="parent">
          Parent Component
          <NestedComponent />
        </div>
      </ModalPortal>,
    );

    expect(document.querySelector('[data-testid="parent"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="nested"]')).not.toBeNull();
  });
});
