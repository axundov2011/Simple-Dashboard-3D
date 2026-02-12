import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useStore } from "../../store/useStore";
import styles from "./AddDesignerForm.module.scss";

const schema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  workingHours: z.preprocess(
    (v) => (typeof v === "string" ? Number(v) : v),
    z.number().int("Must be an integer").min(1, "Min 1").max(80, "Max 80")
  ),
});

type FormValues = z.infer<typeof schema>;

export default function AddDesignerForm() {
  const addDesigner = useStore((s) => s.addDesigner);
  const loading = useStore((s) => s.designersLoading);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", workingHours: 40 },
    mode: "onSubmit",
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    await addDesigner(values);
    reset({ fullName: "", workingHours: 40 });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <label className={styles.label}>
        <span>Full name</span>
        <input
          className={styles.input}
          placeholder="e.g. Ayhan Ak"
          {...register("fullName")}
        />
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
