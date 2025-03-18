import isEqual from "lodash/isEqual";
import { memo, useCallback } from "react";
import { v4 } from "uuid";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Child = memo(function Child({
  handleSubmit,
}: {
  handleSubmit: (orderDetails: {
    orderId: string;
    buyer: string;
    address: string;
  }) => Promise<void>;
}) {
  console.log("RE-RENDER CHILD");
  return (
    <div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleSubmit({
            orderId: v4(),
            buyer: "Kelvyn",
            address: "Topaz City",
          });
        }}
      >
        Purchase
      </button>
    </div>
  );
}, isEqual);

export default function ProductPage({
  productId,
  referrer,
  theme,
}: {
  productId: string;
  referrer: string;
  theme: string;
}) {
  const handleSubmit = useCallback(
    async (orderDetails: {
      orderId: string;
      buyer: string;
      address: string;
    }) => {
      await delay(1000);
      console.log("Log order detail after 1s", {
        productId,
        referrer,
        orderDetails,
      });
    },
    [productId, referrer],
  );
  console.log({ theme });

  return (
    <div>
      <Child {...{ handleSubmit }} />
    </div>
  );
}
