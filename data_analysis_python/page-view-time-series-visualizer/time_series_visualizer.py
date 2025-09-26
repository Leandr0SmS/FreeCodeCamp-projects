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
    df_grouped = df_bar.groupby(['year', 'month_name']).mean(numeric_only=True).reset_index()

    # Ensure months are in correct order
    month_order = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    df_grouped['month_name'] = pd.Categorical(df_grouped['month_name'], categories=month_order, ordered=True)
    df_grouped = df_grouped.sort_values(['year', 'month_name'])

    # Draw bar plot
    fig, ax = plt.subplots(figsize=(15,5))
    sns.barplot(
        data=df_grouped,
        x='year',
        y='value',
        hue='month_name',
        hue_order=month_order,
        ax=ax
    )
    ax.set_xlabel('Years')
    ax.set_ylabel('Average Page Views')
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
    month_order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
    axes[1].set_title('Month-wise Box Plot (Seasonality)')
    axes[1].set_xlabel('Month')
    axes[1].set_ylabel('Page Views')

    # Save image and return fig (don't change this part)
    fig.savefig('box_plot.png')
    return fig
