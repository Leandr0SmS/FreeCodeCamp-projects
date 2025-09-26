import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from pandas.plotting import register_matplotlib_converters
register_matplotlib_converters()

# Import data, parse dates, index column to 'date'.
df = pd.read_csv(
                'fcc-forum-pageviews.csv', 
                 parse_dates=['date'], 
                 index_col='date'
                )
print(f'1------------\n{df.head()}\n{df.shape}\n-----------')

# Clean data
#Filter out days in the top 2.5% and bottom 2.5% of page views.
df = df[
    (df['value'] >= df['value'].quantile(0.25)) & 
    (df['value'] <= df['value'].quantile(0.75))
    ]

print(f'2------------\n{df.head()}\n{df.shape}\n-----------')

def draw_line_plot():
    # Draw line plot
    fig, ax = plt.subplots(figsize=(15,5))
    ax.plot(df.index, df['value'], color='red')
    ax.set_title('Daily freeCodeCamp Forum Page Views 5/2016-12/2019')
    ax.set_xlabel('Date')
    ax.set_ylabel('Page Views')
    ax.grid(True)
    # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig

def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    df_bar = None

    # Draw bar plot





    # Save image and return fig (don't change this part)
    fig.savefig('bar_plot.png')
    return fig

def draw_box_plot():
    # Prepare data for box plots (this part is done!)
    df_box = df.copy()
    df_box.reset_index(inplace=True)
    df_box['year'] = [d.year for d in df_box.date]
    df_box['month'] = [d.strftime('%b') for d in df_box.date]

    # Draw box plots (using Seaborn)





    # Save image and return fig (don't change this part)
    fig.savefig('box_plot.png')
    return fig
