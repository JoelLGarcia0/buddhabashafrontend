import { format } from "date-fns";
import { calculateTotal, formatPrice } from "@/lib/api";
import { Order } from "@/lib/api";

export default function OrderCard({ order }: { order: Order }) {
  const total = calculateTotal(order.items);
  const orderDate = new Date(order.created_at);

  // Parse shipping address if it's stored as JSON string
  const shippingAddress =
    typeof order.shipping_address === "string"
      ? JSON.parse(order.shipping_address)
      : order.shipping_address;

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 pb-1">
              Order #{order.id}
            </h3>
            <p className="text-sm text-gray-500">
              Placed on {format(orderDate, "MMMM d, yyyy")}
            </p>
          </div>
          <div className="text-right">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                order.is_shipped
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {order.is_shipped ? "Shipped" : "Processing"}
            </span>
            <p className="text-lg font-semibold text-gray-900 mt-1">
              {formatPrice(total + Number(order.shipping_cost || 0))}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 bg-gray-50 rounded-md"
            >
              <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-md overflow-hidden">
                {item.product.image_url || item.product.image ? (
                  <img
                    src={item.product.image_url || item.product.image}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling?.classList.remove("hidden");
                    }}
                  />
                ) : null}
                <div
                  className={`w-full h-full flex items-center justify-center text-gray-400 text-xs ${
                    item.product.image_url || item.product.image ? "hidden" : ""
                  }`}
                >
                  No image
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 truncate">
                  {item.product.name}
                </h4>
                <p className="text-sm text-gray-500">
                  Qty: {item.quantity} × {formatPrice(item.product.price)}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {formatPrice(Number(item.product.price) * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-sm text-gray-700">
          {order.email && (
            <p>
              <span className="font-medium text-gray-600">Email:</span>{" "}
              {order.email}
            </p>
          )}
          {shippingAddress && (
            <div>
              <p className="font-medium text-gray-600">Shipping Address:</p>
              <p className=" font-medium leading-snug">
                {shippingAddress.line1},<br />
                {shippingAddress.city}, {shippingAddress.state}{" "}
                {shippingAddress.postal_code}, {shippingAddress.country}
              </p>
            </div>
          )}
          {order.shipping_cost !== undefined && (
            <p>
              <span className="font-medium text-gray-600">Shipping Cost:</span>{" "}
              {formatPrice(order.shipping_cost)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
