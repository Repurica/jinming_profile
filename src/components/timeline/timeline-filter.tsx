import type { TimelineCategory } from "@/content";

export type TimelineFilterValue = "all" | TimelineCategory;

const filters: readonly { value: TimelineFilterValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "education", label: "Education" },
  { value: "work", label: "Work" },
  { value: "leadership", label: "Leadership" },
];

export function TimelineFilter({
  value,
  onChange,
}: {
  value: TimelineFilterValue;
  onChange: (value: TimelineFilterValue) => void;
}) {
  return (
    <div className="timeline-filter" role="radiogroup" aria-label="Timeline filter">
      {filters.map((filter) => (
        <button
          key={filter.value}
          type="button"
          role="radio"
          aria-checked={value === filter.value}
          onClick={() => onChange(filter.value)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
