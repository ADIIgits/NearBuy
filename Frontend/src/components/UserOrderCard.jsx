export default function UserOrderCard({ order, onCancel }) {
  return (
    <div className="relative bg-gray-200 rounded-xl p-6">
      {/* CANCEL BUTTON */}
      {order.status === "pending" && (
        <button
          onClick={() => onCancel(order._id)}
          className="absolute top-4 right-4 px-4 py-1 rounded-full bg-gray-300 hover:bg-gray-400 text-sm"
        >
          ✕ Cancel
        </button>
      )}

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
          <img
            src={order.shop?.shopIcon}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <p className="font-medium">@{order.shop?.username}</p>
          <p className="text-sm text-gray-500">
            Order id: {order._id.slice(-6)}
          </p>
        </div>
      </div>

      {/* ITEMS */}
      <div className="mt-4">
        <p className="font-medium mb-2">Items</p>

        <div className="flex gap-4">
          {order.items.map((entry) => (
            <div
              key={entry._id}
              className="relative w-24 h-28 rounded-lg overflow-hidden bg-gray-300"
            >
              {/* QTY BADGE */}
              <div className="absolute top-1 right-1 bg-black text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                {entry.quantity}
              </div>

              <img
                src={entry.item?.itemIcon}
                className="w-full h-full object-cover"
              />

              {/* TEXT */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2">
                <p className="text-white text-xs font-medium">
                  {entry.item?.itemName}
                </p>
                <p className="text-white text-xs">
                  ₹{entry.item?.price}
                </p>
                {entry.note && (
                  <p className="text-[10px] text-gray-200 italic">
                    Note
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-4">
        <p className="text-sm">
          <span className="font-medium">Total Paid :</span>{" "}
          ₹{order.totalAmount}
        </p>

        <p className="text-sm mt-1">
          <span className="font-medium">Status :</span>{" "}
          <span
            className={`font-medium ${
              order.status === "pending"
                ? "text-yellow-600"
                : order.status === "completed"
                ? "text-green-600"
                : order.status === "canceled"
                ? "text-red-600"
                : "text-blue-600"
            }`}
          >
            {order.status}
          </span>
        </p>
      </div>
    </div>
  );
}
