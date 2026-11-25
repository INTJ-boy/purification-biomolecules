#!/usr/bin/env python3
"""Remove comments only from supported source files in this repository.

Run from the repository root:
    python tools/remove-comments.py

Supported:
- JavaScript: // and /* ... */ outside quoted strings
- CSS: /* ... */ only
- HTML, XML, SVG, Markdown: <!-- ... -->
- Python: # comments (keeps the Unix shebang)
- YAML: # comments outside quoted strings

Binary assets, PDFs, Office files, JSON, ordinary TXT files, and generated folders
are left untouched. The script does not minify code or remove blank lines.
"""
from pathlib import Path
import io
import re
import tokenize

ROOT = Path(__file__).resolve().parent.parent

EXTENSIONS = {
    ".js": "javascript",
    ".mjs": "javascript",
    ".cjs": "javascript",
    ".css": "css",
    ".html": "html",
    ".htm": "html",
    ".xml": "html",
    ".svg": "html",
    ".md": "html",
    ".py": "python",
    ".yml": "yaml",
    ".yaml": "yaml",
}

SKIP_DIRS = {
    ".git", ".github", "node_modules", "__pycache__",
    "assets", "downloads", "vendor",
}


def blank_comment(value: str) -> str:
    return "".join("\n" if c == "\n" else "\r" if c == "\r" else " " for c in value)


def strip_block_comments(text: str) -> tuple[str, int]:
    """Remove CSS /* ... */ comments; preserve strings and all other characters."""
    out = list(text)
    i, n, count = 0, len(text), 0
    quote = None
    escaped = False
    while i < n:
        ch = text[i]
        nxt = text[i + 1] if i + 1 < n else ""
        if quote:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == quote:
                quote = None
            i += 1
            continue
        if ch in ("'", '"'):
            quote = ch
            i += 1
            continue
        if ch == "/" and nxt == "*":
            start = i
            end = text.find("*/", i + 2)
            i = n if end == -1 else end + 2
            out[start:i] = blank_comment(text[start:i])
            count += 1
            continue
        i += 1
    return "".join(out), count


def strip_javascript_comments(text: str) -> tuple[str, int]:
    """Remove JS line/block comments outside quoted strings and template literals."""
    out = list(text)
    i, n, count = 0, len(text), 0
    quote = None
    escaped = False
    while i < n:
        ch = text[i]
        nxt = text[i + 1] if i + 1 < n else ""
        if quote:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == quote:
                quote = None
            i += 1
            continue
        if ch in ("'", '"', "`"):
            quote = ch
            i += 1
            continue
        if ch == "/" and nxt == "/":
            start = i
            i += 2
            while i < n and text[i] not in "\r\n":
                i += 1
            out[start:i] = blank_comment(text[start:i])
            count += 1
            continue
        if ch == "/" and nxt == "*":
            start = i
            end = text.find("*/", i + 2)
            i = n if end == -1 else end + 2
            out[start:i] = blank_comment(text[start:i])
            count += 1
            continue
        i += 1
    return "".join(out), count


def strip_html_comments(text: str) -> tuple[str, int]:
    pattern = re.compile(r"<!--.*?-->", re.DOTALL)
    matches = list(pattern.finditer(text))
    for match in reversed(matches):
        text = text[:match.start()] + blank_comment(match.group()) + text[match.end():]
    return text, len(matches)


def strip_python_comments(text: str) -> tuple[str, int]:
    lines = text.splitlines(keepends=True)
    offsets, total = [], 0
    for line in lines:
        offsets.append(total)
        total += len(line)
    chars = list(text)
    count = 0
    try:
        for tok in tokenize.generate_tokens(io.StringIO(text).readline):
            if tok.type != tokenize.COMMENT:
                continue
            if tok.start[0] == 1 and tok.string.startswith("#!"):
                continue
            start = offsets[tok.start[0] - 1] + tok.start[1]
            end = offsets[tok.end[0] - 1] + tok.end[1]
            chars[start:end] = blank_comment(text[start:end])
            count += 1
    except (tokenize.TokenError, IndentationError):
        raise ValueError("Python tokenization failed; file left unchanged.")
    return "".join(chars), count


def strip_yaml_comments(text: str) -> tuple[str, int]:
    out, count = [], 0
    for line in text.splitlines(keepends=True):
        quote = None
        escaped = False
        cut = None
        for i, ch in enumerate(line):
            if quote == '"':
                if escaped:
                    escaped = False
                elif ch == "\\":
                    escaped = True
                elif ch == '"':
                    quote = None
            elif quote == "'":
                if ch == "'":
                    quote = None
            elif ch in ("'", '"'):
                quote = ch
            elif ch == "#" and (i == 0 or line[i - 1].isspace()):
                cut = i
                break
        if cut is None:
            out.append(line)
        else:
            ending = "\r\n" if line.endswith("\r\n") else "\n" if line.endswith("\n") else "\r" if line.endswith("\r") else ""
            out.append(line[:cut] + blank_comment(line[cut:len(line)-len(ending) if ending else len(line)]) + ending)
            count += 1
    return "".join(out), count


def main() -> int:
    changed, removed, skipped = 0, 0, 0
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue
        rel = path.relative_to(ROOT)
        if any(part in SKIP_DIRS for part in rel.parts):
            continue
        kind = EXTENSIONS.get(path.suffix.lower())
        if not kind or path.name == "remove-comments.py":
            continue
        try:
            original = path.read_text(encoding="utf-8")
        except (UnicodeDecodeError, OSError):
            skipped += 1
            continue

        if kind == "javascript":
            revised, count = strip_javascript_comments(original)
        elif kind == "css":
            revised, count = strip_block_comments(original)
        elif kind == "html":
            revised, count = strip_html_comments(original)
        elif kind == "python":
            try:
                revised, count = strip_python_comments(original)
            except ValueError as error:
                print(f"SKIPPED: {rel} ({error})")
                skipped += 1
                continue
        else:
            revised, count = strip_yaml_comments(original)

        if revised != original:
            path.write_text(revised, encoding="utf-8", newline="")
            changed += 1
            removed += count
            print(f"UPDATED: {rel} ({count} comment(s))")

    print(f"\nFinished: {changed} file(s) changed; {removed} comment(s) removed; {skipped} file(s) skipped.")
    print("Review the Git diff and test the website before publishing.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
