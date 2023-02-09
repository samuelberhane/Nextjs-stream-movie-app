const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { planForm, email } = req.body;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    metadata: {
      planNumber: planForm.planNumber,
      planName: planForm.planName,
      userEmail: email,
    },
    shipping_address_collection: {
      allowed_countries: ["US", "ET"],
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: planForm.planPrice * 100,
          product_data: {
            name: planForm.planName,
            description: `Stream subscription payment for ${planForm.planName} plan.`,
          },
        },
      },
    ],
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_HOST}`,
    cancel_url: `${process.env.NEXT_PUBLIC_HOST}/subscribe`,
  });
  res.status(200).json({ id: session.id });
};
