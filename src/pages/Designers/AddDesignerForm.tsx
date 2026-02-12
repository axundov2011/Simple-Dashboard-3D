import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../../store/useStore";
import styles from "./AddDesignerForm.module.scss";

const schema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  workingHours: z.coerce.number().int("Must be an integer").min(1, "Min 1").max(80, "Max 80"),
});

type FormValues = z.infer<typeof schema>;

export default function AddDesignerForm() {
  const addDesigner = useStore((s) => s.addDesigner);
  const loading = useStore((s) => s.designersLoading);

  const form = useForm<FormValues>({
    resolver: zodResolver(schema) as unknown as any, 
    defaultValues: { fullName: "", workingHours: 40 },
    mode: "onSubmit",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (values: FormValues) => {
    await addDesigner(values);
    reset({ fullName: "", workingHours: 40 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label className={styles.label}>
        <span>Full name</span>
        <input className={styles.input} placeholder="e.g. Ayhan Ak" {...register("fullName")} />
        {errors.fullName && <span className={styles.error}>{errors.fullName.message}</span>}
      </label>

      <label className={styles.label}>
        <span>Working hours</span>
        <input className={styles.input} type="number" {...register("workingHours")} />
        {errors.workingHours && (
          <span className={styles.error}>{String(errors.workingHours.message)}</span>
        )}
      </label>

      <button className={styles.btn} disabled={loading} type="submit">
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}
