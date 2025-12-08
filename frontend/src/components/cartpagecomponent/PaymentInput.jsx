
export default function PaymentInput() {
  const paymentInput = [
    { label: "Email*", type: "email" },
    { label: "Card Holder Name*", type: "text" },
    {
      label: "Card Number*",
      type: "text",
      placeholder: "0000******1245",
    },
    {
      label: "Expiry",
      type: "text",
      placeholder: "MM/YY",
      isHalf: true,
    },
    {
      label: "CVC",
      type: "text",
      placeholder: "000",
      isHalf: true,
    },
  ];

  return (
    <div className="space-y-4 text-sm">
      {paymentInput.map(({ label, type, placeholder, isHalf }, i, arr) =>
        isHalf ? null : (
          <div key={label}>
            <label>{label}</label>
            <input
              type={type}
              placeholder={placeholder}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
          </div>
        )
      )}

      <div className="flex gap-4">
        {[
          { label: "Expiry", placeholder: "MM/YY" },
          { label: "CVC", placeholder: "000" },
        ].map(({ label, placeholder }) => (
          <div key={label} className="flex-1">
            <label>{label}</label>
            <input
              type="text"
              placeholder={placeholder}
              className="mt-1 block w-full border rounded-md px-3 py-2"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
