import CheckoutForm from "@/components/orders/checkoutForm";

export default async function Checkout({
  params,
}: {
  params: { cartId: string };
}) {
  const { cartId } = await params;
  return (
    <main>
      <section className="main-container calc-h py-8 space-y-7 flex flex-col justify-center items-center">
        <div className="space-y-2">
          <h1 className="text-2xl md:text-4xl font-bold text-center">
            Checkout your order
          </h1>
        </div>
        <CheckoutForm cartId={cartId} />
      </section>
    </main>
  );
}
