'use client';

import type { HTMLAttributes } from 'react';
import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { useOverlayContext } from '@/lib/overlay/OverlayProvider';
import { clsx } from '@/lib/overlay/common';
import { useScrollLock } from '@/lib/overlay/useScrollLock';
import { useFocusTrap } from '@/lib/overlay/useFocusTrap';

interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  children: React.ReactNode;
  isRemoving: boolean;
  close?: () => void;
}

const Modal = ({
  isOpen,
  children,
  close,
  isRemoving,
  className,
  style,
  ...props
}: ModalProps) => {
  const { getOverlayCount } = useOverlayContext();
  const modalRef = useFocusTrap(isOpen);
  useScrollLock(isOpen);
  const thisOverlayCount = getOverlayCount();
  const zIndex = 999 + thisOverlayCount;

  return createPortal(
    <Fragment>
      <div
        className={clsx(
          'assembo assembo-modal-dim',
          'as-fixed as-top-0 as-left-0 as-w-full as-h-full as-bg-black as-bg-opacity-50',
          isRemoving ? 'as-animate-fadeOut' : 'as-animate-fadeIn',
        )}
        style={{ zIndex }}
        onClick={close}
      />
      <div
        ref={modalRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        className={clsx(
          'assembo assembo-modal',
          'as-fixed as-bg-gray-100 as-top-1/2 as-left-1/2 as-translate-x-1/2 as-translate-y-1/2 as-rounded-md as-will-change-transform as-will-change-opacity as-shadow-300 as-border as-border-solid as-border-divider-2',
          isRemoving ? 'as-animate-zoomFadeOut' : 'as-animate-zoomFadeIn',
          className,
        )}
        style={{ zIndex, ...style }}
        {...props}
      >
        {children}
      </div>
    </Fragment>,
    document.getElementById('overlay') as HTMLElement,
  );
};

export { Modal };
