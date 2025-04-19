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

    // Verify that the content is rendered inside the modal element
    const portalContent = document.querySelector(`[data-testid="${testId}"]`);
    expect(portalContent).not.toBeNull();
    expect(modalElement.contains(portalContent)).toBe(true);
  });

  test('should update when props change', () => {
    // Create modal element in the DOM
    const modalId = 'test-modal';
    const modalElement = document.createElement('div');
    modalElement.id = modalId;
    document.body.appendChild(modalElement);

    // Initial render
    const { rerender } = render(
      <ModalPortal modalId={modalId}>
        <div data-testid="initial-content">Initial Content</div>
      </ModalPortal>,
    );

    // Verify initial content
    expect(
      document.querySelector('[data-testid="initial-content"]'),
    ).not.toBeNull();

    // Re-render with different content
    rerender(
      <ModalPortal modalId={modalId}>
        <div data-testid="updated-content">Updated Content</div>
      </ModalPortal>,
    );

    // Verify updated content
    expect(
      document.querySelector('[data-testid="initial-content"]'),
    ).toBeNull();
    expect(
      document.querySelector('[data-testid="updated-content"]'),
    ).not.toBeNull();
  });

  test('should work with nested components', () => {
    // Create modal element in the DOM
    const modalId = 'test-modal';
    const modalElement = document.createElement('div');
    modalElement.id = modalId;
    document.body.appendChild(modalElement);

    // A nested component structure
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

    // Verify that both parent and nested components are rendered
    expect(document.querySelector('[data-testid="parent"]')).not.toBeNull();
    expect(document.querySelector('[data-testid="nested"]')).not.toBeNull();
  });
});
