---
title: "Osprey-Based MPPT for Solar PV Systems Under Partial Shading"
description: "A MATLAB and Simulink-based research project comparing Particle Swarm Optimisation, Osprey Optimisation, and a modified Osprey approach for maximum power-point tracking in solar photovoltaic systems under partial-shading conditions."
status: "Academic research and simulation project"
domain: "Electrical Engineering, Renewable Energy, Optimisation"
publishedAt: 2026-07-15
updatedAt: 2026-07-20
tags:
  - "Solar PV"
  - "MPPT"
  - "MATLAB"
  - "Simulink"
  - "Optimisation"
  - "Renewable Energy"
  - "Partial Shading"
featured: true
draft: false
coverIcon: "sun"
relatedProject: "osprey-mppt"
googleDocUrl: ""
---
## Introduction

Solar photovoltaic systems operate most efficiently when they continuously work near their maximum power point. However, this operating point changes with solar irradiance, temperature, load conditions, and shading.

Partial shading makes maximum power-point tracking more difficult because the power-voltage curve may contain multiple peaks. A traditional algorithm may settle at a local peak and fail to identify the global maximum.

My academic project investigated whether Osprey-inspired optimisation methods could improve maximum power-point tracking under these conditions.

## Project Objective

The objective was to compare multiple optimisation approaches for extracting the maximum available power from a solar photovoltaic module.

The major methods considered were:

- Particle Swarm Optimisation

- Osprey Optimisation Algorithm

- Modified Osprey Optimisation Algorithm

The algorithms were tested under normal irradiance and different partial-shading conditions.

## System Design

The project was developed in MATLAB and Simulink.

The simulated system included:

- Solar photovoltaic module

- PV mathematical model

- MPPT controller

- Boost converter

- Load

- Voltage and current measurement

- Power calculation

- Optimisation algorithm

- Output graphs and comparison results

The MPPT controller adjusts the converter duty cycle so that the panel operates near its maximum-power point.

## Partial-Shading Conditions

Different irradiance levels were applied to represent partial shading across the PV configuration.

The test cases included variations such as:

- 840, 900, 500 and 250 W/m²

- 800, 700, 850 and 520 W/m²

These conditions create a more complex power curve with several possible operating points.

The purpose was to determine whether each optimisation technique could locate the global maximum instead of becoming trapped at a lower local maximum.

## Comparative Analysis

The algorithms were compared using factors such as:

- Extracted output power

- Tracking efficiency

- Convergence behaviour

- Response under changing irradiance

- Stability near the maximum-power point

- Oscillation after convergence

The Osprey-based approaches produced strong tracking performance in the reported simulations, with efficiency values of approximately 97 percent.

The modified approach was intended to improve the balance between exploration and exploitation. Exploration helps search different possible operating points, while exploitation helps the algorithm settle near the best solution.

## Challenges Faced

The project required careful coordination between the optimisation algorithm and the Simulink power-electronics model.

Some of the main challenges included:

- Selecting algorithm parameters

- Controlling the boost-converter duty cycle

- Preventing unstable output

- Comparing results under identical conditions

- Selecting the correct solver

- Interpreting voltage, current and power graphs

- Managing simulation time and convergence speed

Working with different output files and graph data also required consistent naming and result organisation.

## Learning Outcomes

This project strengthened my understanding of:

- Solar photovoltaic behaviour

- Maximum power-point tracking

- Partial-shading problems

- DC–DC boost converters

- MATLAB programming

- Simulink modelling

- Nature-inspired optimisation

- Comparative research analysis

- Technical report preparation

It also showed me how optimisation and intelligent algorithms can be applied outside traditional computer-science applications.

## Future Scope

Future research can include:

- Hardware implementation

- Real-time controller testing

- Comparison with additional algorithms

- Rapidly changing weather conditions

- Noise and sensor-error analysis

- Hybrid optimisation strategies

- FPGA or microcontroller implementation

- Integration with battery-storage systems

- Larger PV-array configurations

## Technology Stack

MATLAB, Simulink, solar PV modelling, boost-converter design, Particle Swarm Optimisation, Osprey Optimisation and Modified Osprey Optimisation.

## Key takeaway
This project allowed me to combine my Electrical and Electronics Engineering background with optimisation and intelligent computation. It also created a foundation for my later interest in artificial intelligence, data analysis, and interdisciplinary research.
