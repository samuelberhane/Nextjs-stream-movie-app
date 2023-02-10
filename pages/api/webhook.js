import { buffer } from "micro";
let admin = require("firebase-admin");
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
const endpointSecret = process.env.NEXT_PUBLIC_STRIPE_SIGNIN_SECRET;

const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert({
        type: "service_account",
        project_id: "stream-netflix-clone",
        private_key_id: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY,
        private_key:
          "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6JuIWOfKp+N7/\ndUS9R8OmLAVOF+v6y8eCtnI4olv9vaYfHP9xTN3pCeHpzOqYYpGTfJQBCy1M+GCM\nzrNcMBBZT5+6n0DBRPCPJtpLSNdkhHX+XRBouLSWCWUy97ZhGdavkmSa/lDBhRXK\nro9a74KvkCUSIBdYuL5Q0aKs41IAoOvhIa55C0r+1CzO4LmQ7xECXC2gHIX+fwL1\n+6+wCr+Fm9QghS2HXHSP52f94CLZCtUOVgA74E7bmpgzztC0zzZFwxOPNszvgTHK\n+WPOFQ9GYY7NmlHY6lCe3UdSSPjphiOHeHYLlISdSLb/k/o97QNW1oyavKtAfc+7\nXZp0RKDfAgMBAAECggEAE+OWprhJ80YqEVJGu2XWWMP9ocfliIDK+sN34GbcfE0N\n2ZIqwBYYjvm61P+gwGemVS3reacSOoCT1EeQxf9D/T7depOMWCSqV9PXYVF8OKWn\nHmZ0G97sOyxFeeoZ5uBbXfE+ut6u4yukgJN2W/QY2vLZkHO0UDWWQ/f6BmMtU5qv\nR+pLfLFhleOxdFGN6+sXAPXgrR5sak+uotyMuKHbTOPpwUDN+9mCb3pSNCnwyeVC\n3sCrXxGpikgyQxRiEVkIRDNvgSBywOTjz2BjKl03/OLL32Ir4BfmXgcMbXOXF8zD\nQVh9i8G7lIzLD6luooMufrxeQrN7R+AizFlzRX/DgQKBgQDhR7EnZbrdu9SJBYdL\nSfM/Lch2QZekJ/TzGY7P3KZ25yRFglo+eSZkLU+qEjCCSzwjlcGiJ45Z/Ru6HAou\n0zf8umOjyZQnErc9g0shJIjxFvm6h0IhF6V++L1cLnTTeLEQIDMgTbVIi+Xko5FW\nrW0EeCkv8BRFqiGnUfexZxO7gQKBgQDTiUPZQcZSr09XJ/XjGAvRStXE8gFIZht4\nM7Y8OYs/PQhZHkQddPORqxHjf7gATHXhB3R9F4e1RMznS8BTNrSBWJbqSF0lObHw\nXtpD2n5NuMBkiM8lyIjC4ZxuhMqjlU/6CGaKpCdqlh9ESdilFv45pjovgZqoL9L4\nzH3EeygMXwKBgAu2/q9dyunc6qB1eSOhJNUUPGhp4MjYixRZL+P/RWjJfElhDfBR\nvH1ZHdtqNruPzgDLuNYF2JE1aEu1SZJFyZOK3cOWp+2gO4cnXLDMhZKD71iT0AyI\nfkKsDKzOfaTBkfOUuRPk9phfLgVFvDkVq6Wf2gR0J5m3zyg0Sv0erxgBAoGBAIFm\nZITQQZtu9l/gZ//lQ8Vhu+bgC3zYSVF8gKvSn6Wtlh+97fj/A8hGF4lNJae5Hhrr\nzox/ClsOnTGYGyxMOJsvMBJc9e3Bn2HlBCuhysWMkNRvBBie1VoxXNoWjUcIHYZc\nAS4qQJpo/vNtIQPMTvPBBbLt20erCal8nirFE7iNAoGBAODI+IDORhx4hLR+vdEi\nJ+UDvBbBioTgIb7uSb3wWQ3ie7QlCz/7+BMD+yI9q1gNRYLOdL/1TlUAgB8Ngl17\nMog4qwWb8AfeyAauE/WT2DackV7B9xfGKhTP27AsXwPrUjnspTR7jMlcm68nlgtW\nspFqjp/WJ4w1dK1A16WXY6n9\n-----END PRIVATE KEY-----\n",
        client_email:
          "firebase-adminsdk-a2wea@stream-netflix-clone.iam.gserviceaccount.com",
        client_id: "105296365206446728684",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url:
          "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url:
          "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-a2wea%40stream-netflix-clone.iam.gserviceaccount.com",
      }),
    })
  : admin.app();

const fulfilledOrder = async (session) => {
  const userData = await app
    .firestore()
    .collection("users")
    .doc(session.metadata.userEmail)
    .get();
  console.log("userData", userData.data());
  if (userData.data()) {
    app
      .firestore()
      .collection("users")
      .doc(session.metadata.userEmail)
      .update({
        paymentCycle: userData.data().paymentCycle + 1,
        amount: session.amount_total / 100,
        planNumber: session.metadata.planNumber,
        planName: session.metadata.planName,
        canceled: false,
      });
  }

  if (!userData.data())
    return app
      .firestore()
      .collection("users")
      .doc(session.metadata.userEmail)
      .set({
        paymentCycle: 1,
        amount: session.amount_total / 100,
        planNumber: session.metadata.planNumber,
        planName: session.metadata.planName,
        canceled: false,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toLocaleString();
    const sign = req.headers["stripe-signature"];
    let event;
    try {
      event = stripe.webhooks.constructEvent(payload, sign, endpointSecret);
    } catch (error) {
      console.log(error.message);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      return fulfilledOrder(session)
        .then(() => {
          res.status(200);
        })
        .catch((error) =>
          res.status(400).send("Webhook error" + error.message)
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
