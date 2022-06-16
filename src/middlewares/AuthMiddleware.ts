import { Request, Response } from "express";
import { PERMISSIONS } from "../utils";

import JWT from "jsonwebtoken";

export function Endpoint(
  req: Request,
  res: Response,
  endpointHandler: (req: Request, res: Response) => void,
  minimumRequiredPermission: number
): ((req: Request, res: Response) => void) | void {
  if (minimumRequiredPermission === PERMISSIONS.ANONYMOUS) {
    return endpointHandler(req, res);
  }

  let permissions = 999;
  let exp = 0;

  try {
    const objectToken = JWT.verify(String(req.headers.authorization), String(process.env.SECRET_KEY)) as JWT.JwtPayload;

    permissions = objectToken.permissions;
    exp = objectToken.exp ?? 0;
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  if (Number(exp) * 1000 < Date.now()) {
    res.status(401).send({
      message: "Unauthorized: token expired",
    });
  }

  if (permissions > minimumRequiredPermission) {
    res.status(401).send({
      message: "Unauthorized: missing required permissions",
    });
  }

  return endpointHandler(req, res);
}
