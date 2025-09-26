import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np

# 1
df = pd.read_csv('medical_examination.csv')

# 2
df['overweight'] = (df['weight'] / ((df['height'] / 100) ** 2) > 25).astype(int)

# 3
df['cholesterol'] = (df['cholesterol'] > 1).astype(int)
df['gluc'] = (df['gluc'] > 1).astype(int)

print(df.head(), df.tail())

# 4
def draw_cat_plot():
    # 5
    df_cat = df.melt(
            id_vars=["age", "gender"], 
            value_vars=["cholesterol", "gluc", "overweight"],
            var_name="variable", value_name="value"
        )

    # 6
    df_cat = df_cat[df_cat['value'] == 1]
    df_cat = df_cat.groupby(['variable', 'value', 'age', 'gender']).size().reset_index(name='count')

    # 7
    sns.catplot(data=df_cat, x="variable", y="count", hue="gender", col="age", kind="bar")

    # 8
    fig = plt.gcf()


    # 9
    fig.savefig('catplot.png')
    return fig