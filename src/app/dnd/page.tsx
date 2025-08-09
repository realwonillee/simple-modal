'use client';

import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Draggable } from '@/components/dnd/Draggable';
import { Droppable } from '@/components/dnd/Droppable';

export default function DndPage() {
  const [parent, setParent] = useState<string | null>(null);
  const draggable = <Draggable>Go ahead, drag me</Draggable>;

  function handleDragEnd(event: DragEndEvent) {
    const { over } = event;
    setParent(over ? over.id.toString() : null);
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable>
        {parent === 'droppable-1' ? draggable : 'Drop here'}
      </Droppable>
      <Droppable>
        {parent === 'droppable-2' ? draggable : 'Or drop here'}
      </Droppable>
    </DndContext>
  );
}
