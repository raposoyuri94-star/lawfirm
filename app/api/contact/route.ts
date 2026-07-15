import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { type, recipient } = await request.json();

  console.log(`[contact] ${type} request received for ${recipient}`);

  return NextResponse.json({
    success: true,
    message:
      type === "phone"
        ? "Pedido de contacto telefónico registado com sucesso."
        : "Pedido de contacto por email registado com sucesso.",
  });
}
