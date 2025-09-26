# Page View Time Series Visualizer

This is the boilerplate for the **Page View Time Series Visualizer** project.

Instructions for building your project can be found at:
[freeCodeCamp - Page View Time Series Visualizer](https://www.freecodecamp.org/learn/data-analysis-with-python/data-analysis-with-python-projects/page-view-time-series-visualizer)

## Project Overview

This project is to analyze and visualize time series data from the freeCodeCamp forum.
It is composed of three different visualizations to showcase this data:

- Line chart
- Bar chart
- Box plots

Libraries used:

- Pandas
- Matplotlib
- Seaborn

The dataset contains the number of page views each day on the freeCodeCamp.org forum from **2016-05-09 to 2019-12-03**.

## Tasks

- 1 - **Import and clean data**
  - Use Pandas to import data from `fcc-forum-pageviews.csv`.
  - Set the index to the date column.
  - Filter out days in the top 2.5% and bottom 2.5% of page views.
- 2 - **Line plot**
  - Implement `draw_line_plot` using Matplotlib.
  - Chart similar to `examples/Figure_1.png`.
  - Title: `Daily freeCodeCamp Forum Page Views 5/2016-12/2019`.
  - X label: `Date`, Y label: `Page Views`.
- 3 - **Bar plot**
  - Implement `draw_bar_plot` using Matplotlib.
  - Chart similar to `examples/Figure_2.png`.
  - Show average daily page views for each month grouped by year.
  - Legend: month labels, title `Months`.
  - X label: `Years`, Y label: `Average Page Views`.
- 4 - **Box plots**
  - Implement `draw_box_plot` using Seaborn.
  - Two adjacent box plots similar to `examples/Figure_3.png`.
  - First chart title: `Year-wise Box Plot (Trend)`.
  - Second chart title: `Month-wise Box Plot (Seasonality)`.
  - Month labels start at Jan; label axes correctly.

> For each chart, use a copy of the data frame.

---

## Running the Project

Use `main.py` to run and test the project.

## Testing

Unit tests are in `test_module.py`.
Tests from `test_module.py` are imported to `main.py` for convenience.
