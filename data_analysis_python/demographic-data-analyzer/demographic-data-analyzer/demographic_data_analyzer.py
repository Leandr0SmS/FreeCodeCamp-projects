import pandas as pd


def calculate_demographic_data(print_data=True):
    # Read data from file
    df = pd.read_csv("adult.data.csv")

    # How many of each race are represented in this dataset? This should be a Pandas series with race names as the index labels.
    race_count = df['race'].value_counts()

    # What is the average age of men?
    df_ages_sex = df[['age', 'sex']]
    average_age_men = round(df_ages_sex[df_ages_sex['sex'] == 'Male']['age'].mean(), 1)

    # What is the percentage of people who have a Bachelor's degree?
    bachelors_count = df['education'].value_counts().get('Bachelors', 0)
    education_counts = df['education'].value_counts().sum()
    percentage_bachelors = round((bachelors_count / education_counts) * 100, 1)

    # What percentage of people with advanced education (`Bachelors`, `Masters`, or `Doctorate`) make more than 50K?
    # What percentage of people without advanced education make more than 50K?

    # with and without `Bachelors`, `Masters`, or `Doctorate`
    higher_education = df['education'].value_counts().get([
    'Bachelors', 
    'Masters', 
    'Doctorate'
    ], 0).sum()
    higher_education_rich_count = df[['education', 'salary']].value_counts().get([
    ('Bachelors', '>50K'), 
    ('Masters', '>50K'), 
    ('Doctorate', '>50K')
    ], 0).sum()
    lower_education = df[~df['education'].isin(['Bachelors', 'Masters', 'Doctorate'])]
    lower_education_count = lower_education.shape[0]
    lower_education_rich_count = lower_education[lower_education['salary'] == '>50K'].shape[0]

    # percentage with salary >50K
    higher_education_rich = round(((higher_education_rich_count / higher_education) * 100), 1)
    lower_education_rich = round((lower_education_rich_count / lower_education_count) * 100, 1)

    # What is the minimum number of hours a person works per week (hours-per-week feature)?
    work_hour_week_salary = df[['hours-per-week', 'salary']]
    min_work_hours = work_hour_week_salary["hours-per-week"].min()

    # What percentage of the people who work the minimum number of hours per week have a salary of >50K?

    people_working_min_hours = work_hour_week_salary[
        work_hour_week_salary['hours-per-week'] == min_work_hours
    ]
    min_work_hour_week_salary_more_50k = people_working_min_hours[
        (people_working_min_hours['salary'] == '>50K')
    ]

    rich_percentage = round((
        min_work_hour_week_salary_more_50k.shape[0] / people_working_min_hours.shape[0]
    ) * 100, 1)

    # What country has the highest percentage of people that earn >50K?
    country_counts = df['native-country'].value_counts()
    country_50k_counts = df[df['salary'] == '>50K']['native-country'].value_counts()
    country_percentages = round((country_50k_counts / country_counts * 100).fillna(0), 1)

    highest_earning_country = country_percentages.idxmax()
    highest_earning_country_percentage = country_percentages.max()

    # Identify the most popular occupation for those who earn >50K in India.
    df_india = df[df['native-country'] == 'India']
    india_occupation_salary = df_india[['occupation', 'salary']]
    top_IN_occupation_count = india_occupation_salary[df_india['salary'] == '>50K']['occupation'].value_counts()
    top_IN_occupation = top_IN_occupation_count.idxmax()

    # DO NOT MODIFY BELOW THIS LINE

    if print_data:
        print("Number of each race:\n", race_count) 
        print("Average age of men:", average_age_men)
        print(f"Percentage with Bachelors degrees: {percentage_bachelors}%")
        print(f"Percentage with higher education that earn >50K: {higher_education_rich}%")
        print(f"Percentage without higher education that earn >50K: {lower_education_rich}%")
        print(f"Min work time: {min_work_hours} hours/week")
        print(f"Percentage of rich among those who work fewest hours: {rich_percentage}%")
        print("Country with highest percentage of rich:", highest_earning_country)
        print(f"Highest percentage of rich people in country: {highest_earning_country_percentage}%")
        print("Top occupations in India:", top_IN_occupation)

    return {
        'race_count': race_count,
        'average_age_men': average_age_men,
        'percentage_bachelors': percentage_bachelors,
        'higher_education_rich': higher_education_rich,
        'lower_education_rich': lower_education_rich,
        'min_work_hours': min_work_hours,
        'rich_percentage': rich_percentage,
        'highest_earning_country': highest_earning_country,
        'highest_earning_country_percentage':
        highest_earning_country_percentage,
        'top_IN_occupation': top_IN_occupation
    }
