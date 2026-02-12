import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as THREE from "three";
import { useStore } from "../../store/useStore";
import type { Object3DModel, ObjSize } from "../../models/object3d";
import styles from "./Canvas3D.module.scss";

type HoverState = { id: string | null };

function sizeToScale(size: ObjSize): number {
  if (size === "small") return 0.7;
  if (size === "large") return 1.4;
  return 1.0;
}

function BoxItem({
  obj,
  hoveredId,
  setHoveredId,
  setOrbitEnabled,
}: {
  obj: Object3DModel;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  setOrbitEnabled: (v: boolean) => void;
}) {
  const dragPlane = useMemo(
    () => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0),
    []
  );
  const tmp = useMemo(() => new THREE.Vector3(), []);
  const selectObject = useStore((s) => s.selectObject);
  const selectedObjectId = useStore((s) => s.selectedObjectId);
  const updateObject = useStore((s) => s.updateObject);

  const isSelected = selectedObjectId === obj.id;
  const isHovered = hoveredId === obj.id;

  const [dragging, setDragging] = useState(false);

  const scale = sizeToScale(obj.size);
  const displayColor = isHovered ? "#ffffff" : obj.color;

  return (
    <mesh
      position={obj.position}
      scale={[scale, scale, scale]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHoveredId(obj.id);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHoveredId(null);
      }}
      onPointerDown={(e) => {
        e.stopPropagation();
        selectObject(obj.id);
        setDragging(true);
        setOrbitEnabled(false);
        (e.target as any).setPointerCapture?.(e.pointerId);
      }}
      onPointerUp={(e) => {
        e.stopPropagation();
        setDragging(false);
        setOrbitEnabled(true);
        (e.target as any).releasePointerCapture?.(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (!dragging) return;
        e.stopPropagation();

        const hit = e.ray.intersectPlane(dragPlane, tmp);
        if (!hit) return;
        // e.point ground plane ilə kəsişmə nöqtəsi kimi gəlir (bizdə plane var)
        updateObject(obj.id, { position: [hit.x, 0.5, hit.z] });
      }}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={displayColor} />

      {isSelected && (
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
          <lineBasicMaterial color={"#6366f1"} />
        </lineSegments>
      )}
    </mesh>
  );
}

function SceneContent({
  orbitEnabled,
  setOrbitEnabled,
}: {
  orbitEnabled: boolean;
  setOrbitEnabled: (v: boolean) => void;
}) {
  const objects = useStore((s) => s.objects);
  const selectedDesignerId = useStore((s) => s.selectedDesignerId);
  const addObject = useStore((s) => s.addObject);
  const selectObject = useStore((s) => s.selectObject);

  const [hover, setHover] = useState<HoverState>({ id: null });

  // Double click -> ONLY on ground plane
  const onGroundDoubleClick = async (
    e: any,
    setToast: (msg: string) => void
  ) => {
    e.stopPropagation();

    if (!selectedDesignerId) {
      setToast("Select a designer first to add objects.");
      setTimeout(
        () => setToast("Select a designer first to add objects"),
        1800
      );
      return;
    }

    const p = e.point as THREE.Vector3;
    await addObject({
      name: `Object ${objects.length + 1}`,
      designerId: selectedDesignerId,
      color: "#22c55e",
      position: [p.x, 0.5, p.z],
      size: "normal",
    });
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[6, 10, 6]} intensity={1.0} />

      <Grid
        args={[20, 20]}
        cellSize={1}
        cellThickness={1}
        sectionSize={5}
        sectionThickness={1.5}
        fadeDistance={30}
      />

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        onPointerDown={(e) => {
          // boş yerə klik edəndə selection silinsin deye yazdım bu  hisseni baxa bilersiniz
          e.stopPropagation();
          selectObject(null);
        }}
        onDoubleClick={onGroundDoubleClick}
      >
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial transparent opacity={0} />
      </mesh>

      {objects.map((o) => (
        <BoxItem
          key={o.id}
          obj={o}
          hoveredId={hover.id}
          setHoveredId={(id) => setHover({ id })}
          setOrbitEnabled={setOrbitEnabled}
        />
      ))}

      <OrbitControls makeDefault enabled={orbitEnabled} />
    </>
  );
}

export default function Canvas3D() {
  const [toast, _setToast] = useState<string | null>(null);
  const [orbitEnabled, setOrbitEnabled] = useState(true);

  return (
    <div className={styles.wrap}>
      <div className={styles.hint}>
        {toast && <div className={styles.toast}>{toast}</div>}
        <b>Tip:</b> Select a designer (right panel) → double click on canvas to
        add object. Click object to select.
      </div>

      <div className={styles.canvas}>
        <Canvas camera={{ position: [6, 6, 6], fov: 50 }}>
          <SceneContent
            orbitEnabled={orbitEnabled}
            setOrbitEnabled={setOrbitEnabled}
          />
        </Canvas>
      </div>
    </div>
  );
}
