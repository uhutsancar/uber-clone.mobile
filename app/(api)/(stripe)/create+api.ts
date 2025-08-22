import { Stripe } from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, amount } = body;

  if (!name || !email || !amount) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
    });
  }

  let customer;
  const doesCustomerExist = await stripe.customers.list({ email });
  customer =
    doesCustomerExist.data[0] ??
    (await stripe.customers.create({ name, email }));

  const paymentIntent = await stripe.paymentIntents.create({
    amount: parseInt(amount) * 100,
    currency: "usd",
    customer: customer.id,
    automatic_payment_methods: { enabled: true },
  });

  return new Response(
    JSON.stringify({
      paymentIntent,
      customer: customer.id,
    })
  );
}
