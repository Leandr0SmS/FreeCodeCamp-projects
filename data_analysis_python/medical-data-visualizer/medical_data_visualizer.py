import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 1
df = pd.read_csv('medical_examination.csv')

# 2 - overweight column to the data. 
# To determine if a person is overweight, first calculate their BMI
df['overweight'] = (df['weight'] / ((df['height'] / 100) ** 2) > 25).astype(int)

# 3 - Normalize data by making 0 always good and 1 always bad
df['cholesterol'] = (df['cholesterol'] > 1).astype(int)
df['gluc'] = (df['gluc'] > 1).astype(int)

# 4
def draw_cat_plot():
    # 5 - Create a DataFrame for the cat plot using pd.melt with values from: 
    # cholesterol, gluc, smoke, alco, active, and overweight
    df_cat = df.melt(
            id_vars=["age", "sex"], 
            value_vars=["cholesterol", "gluc", "smoke", "alco", "active", "overweight"],
            var_name="cat_df", value_name="cat_value"
        )

    # 6 - Group and reformat the data in df_cat to split it by cardio. Show the counts of each feature. 
    df_cat = df_cat[df_cat['cat_value'] == 1]
    df_cat = df_cat.groupby(['cat_df', 'cat_value', 'age', 'sex']).size().reset_index(name='count')

    # 7 - Convert the data into long format and create a chart that shows the value counts of the categorical features
    sns.catplot(data=df_cat, x="cat_df", y="count", hue="sex", col="age", kind="bar")

    # 8
    fig = plt.gcf()


    # 9
    fig.savefig('catplot.png')
    return fig


# 10
def draw_heat_map():
    # 11 - Clean the data in the df by filtering out the 
    # following patient segments that represent incorrect data
    df_heat = df[(df['ap_lo'] <= df['ap_hi']) &
                 (df['height'] >= df['height'].quantile(0.025)) &
                 (df['height'] <= df['height'].quantile(0.975)) &
                 (df['weight'] >= df['weight'].quantile(0.025)) &
                 (df['weight'] <= df['weight'].quantile(0.975))
                 ]

    # 12 - Calculate the correlation matrix
    corr = df_heat.corr()

    # 13 - Generate a mask for the upper triangle
    mask = np.triu(np.ones_like(corr, dtype=bool))

    # 14
    fig, ax = plt.subplots(figsize=(16, 9))


    # 15 - Draw the heatmap with 'sns.heatmap()'
    sns.heatmap(corr, mask=mask, square=True, linewidths=0.5, annot=True, fmt="0.1f")
    plt.title('Correlation Heatmap')
    plt.xlabel('Features')
    plt.ylabel('Features')

    # 16
    fig.savefig('heatmap.png')
    return fig
