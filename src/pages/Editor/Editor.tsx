import { useEffect } from "react";
import Canvas3D from "./Canvas3D";
import ObjectProperties from "./ObjectProperties";
import { useStore } from "../../store/useStore";
import styles from "./Editor.module.scss";

export default function Editor() {
  const fetchDesigners = useStore((s) => s.fetchDesigners);
  const fetchObjects = useStore((s) => s.fetchObjects);

  useEffect(() => {
    fetchDesigners();
    fetchObjects();
  }, [fetchDesigners, fetchObjects]);

  return (
    <div className={styles.editorGrid}>
      <div className={styles.canvasCard}>
        <Canvas3D />
      </div>
      <div className={styles.propsCard}>
        <ObjectProperties />
      </div>
    </div>
  );
}
