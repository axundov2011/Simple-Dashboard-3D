import { useMemo } from "react";
import { useStore } from "../../store/useStore";
import styles from "./ObjectProperties.module.scss";
import type { ObjSize } from "../../models/object3d";

export default function ObjectProperties() {
  const designers = useStore((s) => s.designers);
  const selectedDesignerId = useStore((s) => s.selectedDesignerId);
  const selectDesigner = useStore((s) => s.selectDesigner);

  const objects = useStore((s) => s.objects);
  const selectedObjectId = useStore((s) => s.selectedObjectId);
  const updateObject = useStore((s) => s.updateObject);

  const selectedObj = useMemo(
    () => objects.find((o) => o.id === selectedObjectId) ?? null,
    [objects, selectedObjectId]
  );

  return (
    <div className={styles.panel}>
      <h2>Editor</h2>

      <div className={styles.block}>
        <label className={styles.label}>Active designer</label>
        <select
          className={styles.select}
          value={selectedDesignerId ?? ""}
          onChange={(e) => selectDesigner(e.target.value || null)}
        >
          <option value="">Select designer...</option>
          {designers.map((d) => (
            <option key={d.id} value={d.id}>
              {d.fullName}
            </option>
          ))}
        </select>
        <div className={styles.help}>You must select a designer before adding objects.</div>
      </div>

      <div className={styles.divider} />

      <h3>Object properties</h3>

      {!selectedObj ? (
        <p className={styles.muted}>Select an object to edit its properties.</p>
      ) : (
        <div className={styles.block}>
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            value={selectedObj.name}
            onChange={(e) => updateObject(selectedObj.id, { name: e.target.value })}
          />

          <label className={styles.label}>Color</label>
          <input
            className={styles.input}
            type="color"
            value={selectedObj.color}
            onChange={(e) => updateObject(selectedObj.id, { color: e.target.value })}
          />

          <label className={styles.label}>Size</label>
          <select
            className={styles.select}
            value={selectedObj.size}
            onChange={(e) => updateObject(selectedObj.id, { size: e.target.value as ObjSize })}
          >
            <option value="small">small</option>
            <option value="normal">normal</option>
            <option value="large">large</option>
          </select>

          <div className={styles.help}>
            Position: [{selectedObj.position.map((n) => n.toFixed(2)).join(", ")}]
          </div>
        </div>
      )}
    </div>
  );
}
