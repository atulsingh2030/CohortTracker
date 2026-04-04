from __future__ import annotations

import json
import os
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
ARTIFACTS = ROOT / "artifacts" / "qa"
DESKTOP_PATH = ARTIFACTS / "dashboard-desktop.png"
MOBILE_PATH = ARTIFACTS / "dashboard-mobile.png"
BASE_URL = os.environ.get("QA_BASE_URL", "http://127.0.0.1:5173")


def summarize_console(messages: list[dict[str, str]]) -> dict[str, int]:
    summary = {"error": 0, "warning": 0, "info": 0}

    for message in messages:
        level = message["type"]
        if level in summary:
            summary[level] += 1

    return summary


def main() -> None:
    ARTIFACTS.mkdir(parents=True, exist_ok=True)

    report: dict[str, object] = {
      "summary_before": None,
      "summary_after": None,
      "sync_clicked": False,
      "leaderboard_rows": 0,
      "repo_cards": 0,
      "console": [],
      "desktop_screenshot": str(DESKTOP_PATH),
      "mobile_screenshot": str(MOBILE_PATH),
    }

    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1440, "height": 1400})

        console_messages: list[dict[str, str]] = []

        page.on(
            "console",
            lambda msg: console_messages.append({"type": msg.type, "text": msg.text}),
        )

        page.goto(BASE_URL, wait_until="networkidle", timeout=120000)
        page.wait_for_timeout(1500)

        report["summary_before"] = page.evaluate(
            """async () => {
                const res = await fetch('/api/contribution-intelligence/summary?weeks=8');
                return {
                    ok: res.ok,
                    payload: await res.json()
                };
            }"""
        )

        sync_button = page.get_by_role("button", name="Run sync now")

        if sync_button.count() > 0:
            report["sync_clicked"] = True
            with page.expect_response(
                lambda response: response.url.endswith("/api/contribution-intelligence/sync") and response.request.method == "POST",
                timeout=180000,
            ):
                sync_button.click()

            page.wait_for_timeout(2000)

        report["summary_after"] = page.evaluate(
            """async () => {
                const res = await fetch('/api/contribution-intelligence/summary?weeks=8');
                return {
                    ok: res.ok,
                    payload: await res.json()
                };
            }"""
        )

        page.wait_for_load_state("networkidle")
        page.wait_for_timeout(1500)

        report["leaderboard_rows"] = page.locator("tbody tr").count()
        report["repo_cards"] = page.locator("text=Tracked repositories").locator("..").count()

        page.screenshot(path=str(DESKTOP_PATH), full_page=True)

        mobile = browser.new_page(viewport={"width": 390, "height": 1200})
        mobile.goto(BASE_URL, wait_until="networkidle", timeout=120000)
        mobile.wait_for_timeout(1500)
        mobile.screenshot(path=str(MOBILE_PATH), full_page=True)
        mobile.close()

        browser.close()

        report["console"] = console_messages
        report["console_summary"] = summarize_console(console_messages)

    print(json.dumps(report, indent=2))


if __name__ == "__main__":
    main()
