export const Variant = ({ key, values }) => {
  return (
    // <div className="mx-auto md:pb-10 flex-row">
    <>
      <div className="clear-both m-2 p-2">{key}: </div>
      <div className="grid w-[40rem] grid-cols-4 gap-2 rounded-xl p-2">
        {values.map((a, b) => (
          <div key={b}>
            <input
              className="peer hidden"
              type="radio"
              value={a}
              id={`variant-${key}-${b}`}
              name={`variant-${key} `}
            />{" "}
            <label
              htmlFor={`variant-${key}-${b}`}
              className="block cursor-pointer border-2 select-none rounded-xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white"
            >
              {a}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
