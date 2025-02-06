import { jwtVerify } from "jose";
const SECRET_KEY = process.env.JWT_SECRET; 
import { NextRequest } from "next/server";
export async function isAuthenticated(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return null;
  }

  try {
    const token = authHeader.split(" ")[1]; 
    console.log("HERE")
    const { payload } = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY!));
    console.log("DECODED", payload);
    return payload;
  } catch (error) {
    console.log(error)
    return null;
  }
}
