import { useNotifs } from "../../store/interact";

export default () => {
  const notifs = useNotifs((state) => state);

  function getColor(type: string): string {
    switch (type) {
      case "success":
        return "bg-green-600";
      case "error":
        return "bg-red-600";
      case "warning":
        return "bg-orange-600";
      default:
        return "bg-secondary";
    }
  }

  return (
    <div className={`fixed z-50 top-8 right-4 ${notifs.values.length > 0}`}>
      {notifs.values.map((item, index) => (
        <div
          className={`relative shadow-xl max-w-2xl flex p-4 pr-12 mb-4 text-white ${getColor(
            item.type
          )}`}
        >
          <button
            onClick={() => notifs.unset(index)}
            className="absolute top-3 right-2 p-1 rounded-full hover:bg-gray-100/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {item.text}
        </div>
      ))}
    </div>
  );
};
