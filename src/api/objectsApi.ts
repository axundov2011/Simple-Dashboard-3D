import { mockRequest } from "./mockApi";
import { storage } from "./storage";
import type { CreateObject3DInput, Object3DModel } from "../models/object3d";

const KEY = "db_objects";

export const objectsApi = {
  list: () => mockRequest(() => storage.get<Object3DModel[]>(KEY, [])),

  create: (input: CreateObject3DInput) =>
    mockRequest(() => {
      const prev = storage.get<Object3DModel[]>(KEY, []);
      const next: Object3DModel = { id: crypto.randomUUID(), ...input };
      storage.set(KEY, [next, ...prev]);
      return next;
    }),

  updateMany: (objects: Object3DModel[]) =>
    mockRequest(() => {
      storage.set(KEY, objects);
      return objects;
    }),
};
    