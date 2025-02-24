import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export function infoToken(req, res) {
  const { token } = req.cookies;

  if (!token) return;

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.json({ message: err.message });

    res.json({id: user.id, username: user.username});
  })
}
