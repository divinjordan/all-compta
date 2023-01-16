import { useEffect, useState } from "react";
import { useErrors } from "../../store/interact";
export default function Errors() {
  const [show, setShow] = useState<boolean>(false);
  const errors = useErrors((state) => state);
  useEffect(() => {
    if (Object.keys(errors.values).length > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [errors]);
  return (
    <div className={`${show ? "" : "hidden"}`}>
      <div className="bg-red-500 text-white rounded-mg my-4 p-3">
        {Object.entries(errors.values)
          .map(([_, list]) => list)
          .flat()
          .map((error, index) => (
            <div key={`error${index}`}>{error}</div>
          ))}
      </div>
    </div>
  );
}
