interface Props {
  id: string;

  field: any;
  className?: string;
  checkedClasses?: string;
}

function Checkbox({ id, field, className, checkedClasses }: Props) {
  const checked = field?.value;

  return (
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    <label
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      className={`${checked && checkedClasses} ${className} cursor-pointer`}
      key={id}
    >
      <input
        checked={checked}
        className="hidden"
        type="checkbox"
        value={id}
        onChange={(e) => {
          const newValue = e.target.checked;
          field.onChange(newValue);
        }}
      />
      <span
        className={`relative block ${
          checked ? "bg-accent" : "bg-secondary-dark bg-opacity-25"
        } w-9 h-5 rounded-full shadow-inner transition-all duration-300`}
      >
        <span
          className={`absolute top-1/2 ${
            checked ? "left-1" : "left-[calc(100%-1rem)]"
          } -translate-y-1/2 block bg-bg-light w-3 h-3 rounded-full transition-all duration-300`}
        />
      </span>
    </label>
  );
}

export default Checkbox;
