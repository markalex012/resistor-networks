# Resistor Networks Teaching Unit

A Hebrew RTL educational site based on the supplied unit: 6 lessons, 15 exercises with feedback and solutions, 6 games, diagnostics, rubric, measurement records and resistor-network simulations.

[Open the site](https://markalex012.github.io/resistor-networks/)

The original PDF and all 45 pages of extracted text are available in the teacher area. Answers and reasoning are saved in browser localStorage and can be exported as JSON. No user account is required.

The simulator solves ideal DC networks using nodal analysis. It includes open/short circuits, source current, node voltages, component power, KCL and power balance. It does not model heating, tolerances, instrument loading or source current limits. Reasoning and rubric scores require self or teacher assessment.

## Local use

Serve these static files with `python -m http.server 8766` and open http://localhost:8766. An HTTP server is needed for JavaScript modules and source text.

## Verification

Numerical tests passed for all 15 networks, bridge, transfer triangle, faults, invalid values, KCL and power balance. Browser checks covered resistor changes and comparison, source-short handling, unknown-resistor exercise, escape/design/mystery games, measurement calculations, 45 source pages and a 390px mobile layout.

The PDF is included as supplied. Its research and validation limitations are retained in the teacher area.
