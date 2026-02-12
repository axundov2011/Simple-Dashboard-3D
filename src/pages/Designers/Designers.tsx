import { useEffect } from "react";
import AddDesignerForm from "./AddDesignerForm";
import { useStore } from "../../store/useStore";
import styles from "./Designers.module.scss";

export default function Designers() {
  const designers = useStore((s) => s.designers);
  const loading = useStore((s) => s.designersLoading);
  const fetchDesigners = useStore((s) => s.fetchDesigners);

  const getAttachedCount = useStore((s) => s.getAttachedCountForDesigner);
  const objectsLoading = useStore((s) => s.objectsLoading);
  const fetchObjects = useStore((s) => s.fetchObjects);

  useEffect(() => {
    fetchDesigners();
    fetchObjects(); 
  }, [fetchDesigners, fetchObjects]);

  return (
  <div className={styles.grid}>
    <section className={styles.card}>
      <h2>Designers</h2>
      <p className={styles.muted}>Currently employed designers. Add new ones below.</p>

      <div className={styles.list}>
        {(loading || objectsLoading) && <div className={styles.muted}>Loading...</div>}

        {!loading && designers.length === 0 && <div className={styles.muted}>No designers yet.</div>}

        {designers.map((d) => (
          <div key={d.id} className={styles.row}>
            <div>
              <div className={styles.title}>{d.fullName}</div>
              <div className={styles.muted}>Working hours: {d.workingHours}</div>
            </div>

            <div className={styles.badge}>
              Attached objects: <b>{getAttachedCount(d.id)}</b>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.card}>
      <h2>Add designer</h2>
      <AddDesignerForm />
    </section>
  </div>
);

}
