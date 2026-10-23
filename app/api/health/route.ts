export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({ status: "ok", service: "paysmallsmall-web" }, { headers: { "Cache-Control": "no-store" } });
}
