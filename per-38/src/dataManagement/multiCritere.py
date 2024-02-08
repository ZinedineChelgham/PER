import json

# Read the JSON file
with open('transformed.json', encoding='utf-8') as file:
    data = json.load(file)

# Initialize counters for different ranges, genders, and statuses
status_range_counters = {'Professeur des Universités': {'<50': 0, '50-100': 0, '101-200': 0, '201-300': 0, '>300': 0},
                         'Maître de Conférences (sans HDR)': {'<50': 0, '50-100': 0, '101-200': 0, '201-300': 0, '>300': 0},
                         'Maître de Conférences (avec HDR)': {'<50': 0, '50-100': 0, '101-200': 0, '201-300': 0, '>300': 0},
                         # Add more statuses as needed
                         }
gender_range_counters = {'Un homme': {'<50': 0, '50-100': 0, '101-200': 0, '201-300': 0, '>300': 0},
                         'Une femme': {'<50': 0, '50-100': 0, '101-200': 0, '201-300': 0, '>300': 0}}
overall_range_counters = {'<50': 0, '50-100': 0, '101-200': 0, '201-300': 0, '>300': 0}

# Count occurrences based on different criteria
for entry in data:
    # Get gender, status, and category in "Au total"
    gender = entry.get('1 - Vous êtes ?', None)
    status = entry.get('Votre statut :', None)
    value = entry.get('Au total', None)

    if value is not None and status is not None:
        # Exclude entries with gender 'Autre'
        if gender != 'Autre':
            if '>' in value:
                overall_range_counters['>300'] += 1
                if gender is not None:
                    gender_range_counters[gender]['>300'] += 1
                if status in status_range_counters:
                    status_range_counters[status]['>300'] += 1
            elif '<' in value:
                overall_range_counters['<50'] += 1
                if gender is not None:
                    gender_range_counters[gender]['<50'] += 1
                if status in status_range_counters:
                    status_range_counters[status]['<50'] += 1
            else:
                lower, upper = map(int, value.split('-'))
                if lower < 50:
                    overall_range_counters['<50'] += 1
                    if gender is not None:
                        gender_range_counters[gender]['<50'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['<50'] += 1
                elif 50 <= lower <= 100:
                    overall_range_counters['50-100'] += 1
                    if gender is not None:
                        gender_range_counters[gender]['50-100'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['50-100'] += 1
                elif 101 <= lower <= 200:
                    overall_range_counters['101-200'] += 1
                    if gender is not None:
                        gender_range_counters[gender]['101-200'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['101-200'] += 1
                elif 201 <= lower <= 300:
                    overall_range_counters['201-300'] += 1
                    if gender is not None:
                        gender_range_counters[gender]['201-300'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['201-300'] += 1

# Display the count for each range, gender, and status
print('Overall:')
for range_name, count in overall_range_counters.items():
    print(f'{range_name}: {count}')

for gender, range_counters in gender_range_counters.items():
    print(f'{gender}:')
    for range_name, count in range_counters.items():
        print(f'{range_name}: {count}')

for status, range_counters in status_range_counters.items():
    print(f'{status}:')
    for range_name, count in range_counters.items():
        print(f'{range_name}: {count}')
