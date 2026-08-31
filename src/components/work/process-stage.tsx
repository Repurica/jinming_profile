export function ProcessStage({
  index,
  label,
  detail,
  active = false,
}: {
  index: number;
  label: string;
  detail: string;
  active?: boolean;
}) {
  return (
    <li className="process-stage" data-active={active ? "true" : "false"}>
      <span>{String(index + 1).padStart(2, "0")}</span>
      <strong>{label}</strong>
      <p>{detail}</p>
    </li>
  );
}
