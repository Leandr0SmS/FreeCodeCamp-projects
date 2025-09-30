# Sea Level Predictor

Project page: [https://www.freecodecamp.org/learn/data-analysis-with-python/data-analysis-with-python-projects/sea-level-predictor](https://www.freecodecamp.org/learn/data-analysis-with-python/data-analysis-with-python-projects/sea-level-predictor)

## Overview

Analyze a dataset of the global average sea level change since 1880 and predict sea level through year 2050. You'll use Python (Pandas, Matplotlib, and SciPy) to visualize the data and fit lines of best fit.

## Tasks

Dataset (`epa-sea-level.csv`):

- Imported the data with Pandas and set up the `Year` column for plotting.
- Created a scatter plot with `Year` on the x-axis and `CSIRO Adjusted Sea Level` on the y-axis.
- Used `scipy.stats.linregress` to compute the slope and intercept of a line of best fit for the full dataset and plotted it. Extended the line to year 2050 to predict sea level in 2050.
- Computed a second line of best fit using only data from year 2000 onward, and extended it to year 2050.
- Set the plot title to `Rise in Sea Level`, x label to `Year` and y label to `Sea Level (inches)`.

## Development

Use `main.py` to run your code locally.

## Testing

Unit tests are in `test_module.py`. Tests are also imported into `main.py` for convenience.

## Data Source

Global Average Absolute Sea Level Change, 1880-2014 — US Environmental Protection Agency (data from CSIRO 2015 and NOAA 2015).
[https://datahub.io/core/sea-level-rise#data](https://datahub.io/core/sea-level-rise#data)
