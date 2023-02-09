import cookie from "cookie";

export default (req, res) => {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", process.env.NEXT_PUBLIC_COOKIE_TOKEN, {
        maxAge: 60 * 60,
        path: "/",
      })
    );
    res.status(200).json({ success: true });
  }
};
