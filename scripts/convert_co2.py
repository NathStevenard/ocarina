#!/usr/bin/env python3
"""Convert data/Bereiter_et_al_2015.xlsx into assets/data/co2.json for the
timeline chart.

Bereiter et al. (2015) is a composite CO2 record on the AICC2012 chronology
that splices ice-core data with the modern instrumental (Mauna Loa) record,
so — unlike the earlier CO2.xlsx source — it actually reaches present-day
CO2 levels (age_ka slightly negative = after 1950).

Reads two columns (age in ka BP, CO2 concentration in ppmv) and writes a JSON
array of {"age_ka": <number>, "co2_ppm": <number>} sorted by age_ka
DESCENDING (oldest first), matching the chart's left-to-right (past -> present)
axis.
"""

import json
from pathlib import Path

import openpyxl

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "data" / "Bereiter_et_al_2015.xlsx"
DEST = ROOT / "assets" / "data" / "co2.json"


def main():
    wb = openpyxl.load_workbook(SRC, data_only=True)
    ws = wb.worksheets[0]

    rows = ws.iter_rows(min_row=2, values_only=True)
    points = []
    for age_ka, co2_ppm in rows:
        if age_ka is None or co2_ppm is None:
            continue
        points.append({"age_ka": round(float(age_ka), 3), "co2_ppm": round(float(co2_ppm), 2)})

    points.sort(key=lambda p: p["age_ka"], reverse=True)

    DEST.parent.mkdir(parents=True, exist_ok=True)
    DEST.write_text(json.dumps(points), encoding="utf-8")
    print(f"Wrote {len(points)} points to {DEST.relative_to(ROOT)}")
    print(f"age_ka range: {points[-1]['age_ka']} .. {points[0]['age_ka']}")


if __name__ == "__main__":
    main()