import cookie from "cookie";

export default (req, res) => {
  if (req.method === "POST") {
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", "", {
        expires: new Date(0),
        path: "/",
      })
    );
    res.status(200).json({ success: true });
  }
};
