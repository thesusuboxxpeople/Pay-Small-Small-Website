"""Create a source release without dependencies, build output, credentials or workspace extras."""
import argparse
import hashlib
import json
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile

root = Path(__file__).resolve().parents[1]
parser = argparse.ArgumentParser()
parser.add_argument("output", type=Path, help="Absolute path to the source ZIP, outside this checkout")
args = parser.parse_args()
output = args.output.resolve()
if output == root or root in output.parents:
    parser.error("Write the release outside the checkout")
folders = ["app", "components", "lib", "public", "docs", "scripts", "tests", ".github"]
names = ["README.md", "package.json", "package-lock.json", "tsconfig.json", "next.config.ts", "eslint.config.mjs", "postcss.config.mjs", ".gitignore", ".env.example", ".nvmrc"]
files = [root / name for name in names]
for folder in folders:
    files.extend(path for path in (root / folder).rglob("*") if path.is_file())
files = sorted(set(files))
for path in files:
    relative = path.relative_to(root)
    if path.is_symlink() or "__pycache__" in relative.parts:
        continue
    if path.name.startswith(".env") and path.name != ".env.example":
        raise SystemExit(f"Refusing environment file: {relative}")
    if path.suffix.lower() in {".pem", ".key", ".pfx", ".p12"}:
        raise SystemExit(f"Refusing credential-like file: {relative}")
    if not path.is_file():
        raise SystemExit(f"Missing release source: {relative}")
output.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(output, "w", ZIP_DEFLATED) as archive:
    for path in files:
        if not path.is_symlink() and "__pycache__" not in path.relative_to(root).parts:
            archive.write(path, path.relative_to(root).as_posix())
digest = hashlib.sha256(output.read_bytes()).hexdigest()
checksum = output.with_suffix(output.suffix + ".sha256")
checksum.write_text(f"{digest}  {output.name}\n", encoding="utf-8")
with ZipFile(output) as archive:
    assert archive.testzip() is None
    assert "app/builders-club/page.tsx" in archive.namelist()
    assert ".env.example" in archive.namelist()
    assert not any(name.startswith(("node_modules/", ".git/", ".next/")) or "heroez" in name.lower() for name in archive.namelist())
    count = len(archive.namelist())
print(json.dumps({"archive": str(output), "files": count, "sha256": digest, "checksum": str(checksum)}))
