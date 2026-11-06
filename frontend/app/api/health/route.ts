import { NextResponse } from "next/server";

export async function GET() {
  const apiUrl = process.env.API_BASE_URL;

  if (!apiUrl) {
    return NextResponse.json(
      { status: "error", message: "API_BASE_URL não configurada" },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`${apiUrl}/health`, {
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: "error", message: "Backend indisponível" },
        { status: 502 }
      );
    }

    const data = await response.json();

    // Validamos e permitimos somente os campos esperados.
    if (
      data.status !== "ok" ||
      typeof data.application !== "string"
    ) {
      return NextResponse.json(
        { status: "error", message: "Resposta inválida do backend" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      status: "ok",
      backend: {
        status: data.status,
        application: data.application,
      },
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Não foi possível conectar à API" },
      { status: 502 }
    );
  }
}
