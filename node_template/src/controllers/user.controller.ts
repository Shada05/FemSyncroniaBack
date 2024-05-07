import { Request, Response } from "express";
import { handleError } from "../helpers/securityFunctions";
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../helpers/constants";

const users = [{ username: "admin", password: "1234" },
               { username: "diego", password: "DIEGO" },
               { username: "JuanFer", password: "@t%5Tcx2R" },
               { username: "Arturo", password: "pass1234" }
              ];

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      // Generar token JWT
      const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ message: "Usuario o contraseña incorrectos" });
    }
  } catch (ex) {
    handleError(res, ex);
  }
};
