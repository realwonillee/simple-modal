'use client';

import React from 'react';

// React 19 호환성을 위한 createContext 래퍼
export function createCompatContext<T>(defaultValue: T) {
  return React.createContext(defaultValue);
}
