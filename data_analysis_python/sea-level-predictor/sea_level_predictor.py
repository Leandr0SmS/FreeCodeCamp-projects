import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
from scipy.stats import linregress

def draw_plot():
    # Read data from file
    df = pd.read_csv('epa-sea-level.csv')
    print(f'1------------\n{df.head()}\n{df.shape}\n-----------')

    # Create scatter plot
    plt.figure()
    plt.scatter(
        df['Year'], 
        df['CSIRO Adjusted Sea Level'],
        color='blue',
        s=10
        )

    # Create first line of best fit
    res = linregress(df['Year'], df['CSIRO Adjusted Sea Level'])
    slope, intercept = res.slope, res.intercept
    rvalue, pvalue, stderr = res.rvalue, res.pvalue, res.stderr
    print(f'2------------\n{slope=}, {intercept=}, {rvalue}, {pvalue=}, {stderr=}\n-----------')

    # x values for the first line: from earliest year in data through 2050
    x_all = np.arange(df['Year'].min(), 2051)
    y_all = intercept + slope * x_all
    plt.plot(x_all, y_all, 'r', label='Line of Best Fit (All Data)')
    
    # Create second line of best fit
    df_year_2000 = df[df['Year'] >= 2000]
    res2 = linregress(df_year_2000['Year'], df_year_2000['CSIRO Adjusted Sea Level'])
    slope2, intercept2 = res2.slope, res2.intercept
    rvalue2, pvalue2, stderr2 = res2.rvalue, res2.pvalue, res2.stderr
    print(f'3------------\n{slope2=}, {intercept2=}, {rvalue2}, {pvalue2=}, {stderr2=}\n-----------')
    
    # x values for the second line: years 2000 through 2050 (inclusive)
    x_recent = np.arange(2000, 2051)
    y2 = intercept2 + slope2 * x_recent
    plt.plot(x_recent, y2, 'g', label='Line of Best Fit (Since 2000)')
    
    # Add labels and title
    plt.title('Rise in Sea Level')
    plt.xlabel('Year')
    plt.ylabel('Sea Level (inches)')
    plt.legend()

    # Save plot and return data for testing (DO NOT MODIFY)
    plt.savefig('sea_level_plot.png')
    return plt.gca()