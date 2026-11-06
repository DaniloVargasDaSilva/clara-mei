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
    });

    if (!response.ok) {
      return NextResponse.json(
        { status: "error", message: "Backend indisponível" },
        { status: 502 }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      status: "ok",
      backend: data,
    });
  } catch {
    return NextResponse.json(
      { status: "error", message: "Não foi possível conectar à API" },
      { status: 502 }
    );
  }
}