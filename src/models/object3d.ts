export type ObjSize = "small" | "normal" | "large";

export type Object3DModel = {
  id: string;
  name: string;
  designerId: string;
  color: string;
  position: [number, number, number];
  size: ObjSize;
};

export type CreateObject3DInput = Omit<Object3DModel, "id">;
