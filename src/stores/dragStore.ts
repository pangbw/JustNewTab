import { writable } from "svelte/store";

interface DragState {
  isDragging: boolean;
  sourceId: string | null;
  targetId: string | null;
}

const INITIAL_STATE: DragState = {
  isDragging: false,
  sourceId: null,
  targetId: null,
};

export const dragState = writable<DragState>({ ...INITIAL_STATE });

export function startDrag(sourceId: string): void {
  dragState.set({
    isDragging: true,
    sourceId,
    targetId: null,
  });
}

export function updateDragTarget(targetId: string | null): void {
  dragState.update((state) => ({ ...state, targetId }));
}

export function endDrag(): { sourceId: string; targetId: string } | null {
  let result: { sourceId: string; targetId: string } | null = null;

  dragState.update((state) => {
    if (state.sourceId && state.targetId) {
      result = { sourceId: state.sourceId, targetId: state.targetId };
    }
    return { ...INITIAL_STATE };
  });

  return result;
}

export function cancelDrag(): void {
  dragState.set({ ...INITIAL_STATE });
}
