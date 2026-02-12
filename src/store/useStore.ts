import { create } from "zustand";
import type { CreateDesignerInput, Designer } from "../models/designer";
import type { CreateObject3DInput, Object3DModel } from "../models/object3d";
import { designersApi } from "../api/designersApi";
import { objectsApi } from "../api/objectsApi";

type AppState = {
  // Designers
  designers: Designer[];
  designersLoading: boolean;
  selectedDesignerId: string | null;

  fetchDesigners: () => Promise<void>;
  addDesigner: (input: CreateDesignerInput) => Promise<void>;
  selectDesigner: (id: string | null) => void;

  // Objects
  objects: Object3DModel[];
  objectsLoading: boolean;
  selectedObjectId: string | null;

  fetchObjects: () => Promise<void>;
  addObject: (input: CreateObject3DInput) => Promise<void>;
  updateObject: (id: string, patch: Partial<Object3DModel>) => Promise<void>;
  selectObject: (id: string | null) => void;

  // Derived helpers
  getAttachedCountForDesigner: (designerId: string) => number;
};

export const useStore = create<AppState>((set, get) => ({
  designers: [],
  designersLoading: false,
  selectedDesignerId: null,

  objects: [],
  objectsLoading: false,
  selectedObjectId: null,

  selectDesigner: (id) => set({ selectedDesignerId: id }),
  selectObject: (id) => set({ selectedObjectId: id }),

  fetchDesigners: async () => {
    set({ designersLoading: true });
    const res = await designersApi.list();
    set({ designers: res.data, designersLoading: false });
  },

  addDesigner: async (input) => {
    set({ designersLoading: true });
    const res = await designersApi.create(input);
    set({ designers: [res.data, ...get().designers], designersLoading: false });
  },

  fetchObjects: async () => {
    set({ objectsLoading: true });
    const res = await objectsApi.list();
    set({ objects: res.data, objectsLoading: false });
  },

  addObject: async (input) => {
    const res = await objectsApi.create(input);
    set({ objects: [res.data, ...get().objects] });
  },

  updateObject: async (id, patch) => {
    const next = get().objects.map((o) => (o.id === id ? { ...o, ...patch } : o));
    set({ objects: next });
    // persist whole list
    await objectsApi.updateMany(next);
  },

  getAttachedCountForDesigner: (designerId) =>
    get().objects.filter((o) => o.designerId === designerId).length,
}));
