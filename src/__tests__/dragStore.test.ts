import { describe, it, expect, beforeEach } from "vitest";
import { get } from "svelte/store";
import {
  dragState,
  startDrag,
  updateDragTarget,
  endDrag,
  cancelDrag,
} from "@/stores/dragStore";

describe("dragStore", () => {
  beforeEach(() => {
    cancelDrag();
  });

  describe("initial state", () => {
    it("should have no drag active", () => {
      const state = get(dragState);
      expect(state.isDragging).toBe(false);
      expect(state.sourceId).toBeNull();
      expect(state.targetId).toBeNull();
    });
  });

  describe("startDrag", () => {
    it("should set dragging state", () => {
      startDrag("block-1");

      const state = get(dragState);
      expect(state.isDragging).toBe(true);
      expect(state.sourceId).toBe("block-1");
    });
  });

  describe("updateDragTarget", () => {
    it("should update target", () => {
      startDrag("block-1");
      updateDragTarget("block-2");

      const state = get(dragState);
      expect(state.targetId).toBe("block-2");
    });

    it("should allow null target", () => {
      startDrag("block-1");
      updateDragTarget("block-2");
      updateDragTarget(null);

      expect(get(dragState).targetId).toBeNull();
    });
  });

  describe("endDrag", () => {
    it("should return source and target", () => {
      startDrag("block-1");
      updateDragTarget("block-2");

      const result = endDrag();

      expect(result).toEqual({ sourceId: "block-1", targetId: "block-2" });
      expect(get(dragState).isDragging).toBe(false);
    });

    it("should return null if no target", () => {
      startDrag("block-1");

      const result = endDrag();

      expect(result).toBeNull();
    });
  });

  describe("cancelDrag", () => {
    it("should reset state", () => {
      startDrag("block-1");
      updateDragTarget("block-2");
      cancelDrag();

      const state = get(dragState);
      expect(state.isDragging).toBe(false);
      expect(state.sourceId).toBeNull();
      expect(state.targetId).toBeNull();
    });
  });
});
