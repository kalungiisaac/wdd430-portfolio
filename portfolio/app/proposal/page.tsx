export default function ProposalPage() {
  const features: string[] = [
    "Product browsing with a listing page and individual product detail pages.",
    "Shopping cart where users add items, adjust quantities, and review their selections before checkout.",
    "User authentication with sign-up, login, logout, and profile management.",
    "Product management where sellers can create, edit, and delete their product listings.",
    "Order placement and order history so users can place orders and review past purchases.",
  ];

  return (
    <main className="min-h-screen bg-neutral-100 px-5 py-10 text-neutral-900">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-10 shadow-md">
        <h1 className="text-3xl font-bold text-neutral-900">ShopSimple</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Web Application Project Proposal
        </p>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">Description</h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-700">
            ShopSimple is a lightweight e-commerce web application where users
            browse products, add them to a cart, and place orders. It is built
            for small independent sellers who want a simple online storefront
            without the cost and complexity of a full e-commerce platform.
            Shoppers get a clean browsing and checkout experience, while sellers
            get straightforward product management.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">
            Problems or Needs
          </h2>
          <p className="mt-3 text-base leading-relaxed text-neutral-700">
            Small sellers have no simple, affordable way to list products and
            take orders online without adopting an overbuilt platform full of
            features they will never use.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-semibold text-neutral-900">
            Core Features
          </h2>
          <ul className="mt-3 space-y-3">
            {features.map((feature) => (
              <li
                key={feature}
                className="relative border-b border-neutral-200 pb-3 pl-6 text-base text-neutral-700 last:border-b-0"
              >
                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-blue-600" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-lg bg-blue-50 p-4">
          <p className="text-sm text-neutral-700">
            <span className="font-semibold text-neutral-900">
              Microsoft Teams Post:
            </span>{" "}
            
          </p>
        </section>
      </div>
    </main>
  );
}