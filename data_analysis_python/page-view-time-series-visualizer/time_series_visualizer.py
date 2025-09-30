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
    (df['value'] >= df['value'].quantile(0.025)) & 
    (df['value'] <= df['value'].quantile(0.975))
    ]

print(f'2------------\n{df.head()}\n{df.shape}\n-----------')

def draw_line_plot():
    # Draw line plot
    fig, ax = plt.subplots(figsize=(15,5))
    ax.plot(
            df.index, 
            df['value'], 
            color='red'
        )
    ax.set_title('Daily freeCodeCamp Forum Page Views 5/2016-12/2019')
    ax.set_xlabel('Date')
    ax.set_ylabel('Page Views')
    ax.grid(True)
    # Save image and return fig (don't change this part)
    fig.savefig('line_plot.png')
    return fig

def draw_bar_plot():
    # Copy and modify data for monthly bar plot
    df_bar = df.copy()
    df_bar['year'] = df_bar.index.year
    df_bar['month'] = df_bar.index.month
    df_bar['month_name'] = df_bar.index.strftime('%B')

    # Group by year and month, then calculate mean
    df_grouped = df_bar.groupby(['year', 'month']).mean(numeric_only=True).reset_index()
    
    # Create ordered month names
    month_order = [
        'January', 
        'February', 
        'March', 
        'April', 
        'May', 
        'June', 
        'July', 
        'August', 
        'September', 
        'October', 
        'November', 
        'December'
    ]
    month_num_to_name = {i: name for i, name in enumerate(month_order, 1)}
    df_grouped['month_name'] = df_grouped['month'].map(month_num_to_name)
    
    # Sort by year and month for proper ordering
    df_grouped = df_grouped.sort_values(['year', 'month'])

    # Create pivot table with years as index and months as columns (ordered)
    df_pivot = df_grouped.pivot(index='year', columns='month', values='value')
    # Ensure columns 1..12 present and ordered
    df_pivot = df_pivot.reindex(columns=range(1, 13))
    month_order = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ]
    # Rename numeric month columns to names
    df_pivot.columns = month_order

    # Draw bar plot using pandas' plotting (grouped bars)
    fig, ax = plt.subplots(figsize=(15, 10))
    df_pivot.plot(kind='bar', ax=ax)

    # Set labels and formatting
    ax.set_xlabel('Years')
    ax.set_ylabel('Average Page Views')
    ax.legend(title='Months')
    ax.grid(True)

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
    fig, axes = plt.subplots(1, 2, figsize=(15,5))
    sns.boxplot(
        x='year', 
        y='value', 
        data=df_box, 
        ax=axes[0],
        orientation='vertical'
    )
    # Ensure months are in correct order
    month_order = [
        'Jan', 
        'Feb', 
        'Mar', 
        'Apr', 
        'May', 
        'Jun', 
        'Jul', 
        'Aug', 
        'Sep', 
        'Oct', 
        'Nov', 
        'Dec'
    ]
    sns.boxplot(
        x='month', 
        y='value', 
        data=df_box, 
        ax=axes[1],
        order=month_order,
        orientation='vertical'
    )
    axes[0].set_title('Year-wise Box Plot (Trend)')
    axes[0].set_xlabel('Year')
    axes[0].set_ylabel('Page Views')
    axes[0].set_ylim(bottom=0, top=200000)
    axes[0].set_yticks([
        0, 
        20000, 
        40000, 
        60000, 
        80000, 
        100000,
        120000, 
        140000, 
        160000, 
        180000, 
        200000
    ])
    axes[1].set_title('Month-wise Box Plot (Seasonality)')
    axes[1].set_xlabel('Month')
    axes[1].set_ylabel('Page Views')
    axes[1].set_ylim(bottom=0, top=200000)

    # Save image and return fig (don't change this part)
    fig.savefig('box_plot.png')
    return fig
