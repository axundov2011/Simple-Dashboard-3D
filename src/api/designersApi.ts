import { mockRequest } from "./mockApi";
import { storage } from "./storage";
import type { CreateDesignerInput, Designer } from "../models/designer";

const KEY = "db_designers";

export const designersApi = {
  list: () => mockRequest(() => storage.get<Designer[]>(KEY, [])),

  create: (input: CreateDesignerInput) =>
    mockRequest(() => {
      const prev = storage.get<Designer[]>(KEY, []);
      const next: Designer = { id: crypto.randomUUID(), ...input };
      storage.set(KEY, [next, ...prev]);
      return next;
    }),
};
