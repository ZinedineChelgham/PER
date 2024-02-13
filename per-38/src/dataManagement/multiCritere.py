import json

# Read the JSON file
with open('transformed.json', encoding='utf-8') as file:
    data = json.load(file)

# Initialize counters for different ranges, genders, statuses, and fusion
overall_range_counters = {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0}
gender_range_counters = {'Un homme': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0},
                         'Une femme': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0}}
status_range_counters = {'Professeur des Universités': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0},
                         'Maître de Conférences (sans HDR)': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0},
                         'Maître de Conférences (avec HDR)': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0},

                         # Add more statuses as needed
                         }
fusion_range_counters = {'Professeur des Universités': {'Un homme': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0},
                                                          'Une femme': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0}},
                         'Maître de Conférences (sans HDR)': {'Un homme': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0},
                                                               'Une femme': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0}},
                         'Maître de Conférences (avec HDR)': {'Un homme': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0},
                                                              'Une femme': {'<50': 0, '51-80': 0, '81-120': 0, '121-150': 0, 'bcp plus !': 0}},

                         # Add more statuses as needed
                         }

# Count occurrences based on different criteria
for entry in data:
    gender = entry.get('1 - Vous êtes ?', None)
    status = entry.get('Votre statut :', None)
    value = entry.get('cette année', None)

    if value is not None and status is not None:
        if gender != 'Autre':
            if 'bcp plus !' in value:
                overall_range_counters['bcp plus !'] += 1
                gender_range_counters[gender]['bcp plus !'] += 1
                status_range_counters[status]['bcp plus !'] += 1
                fusion_range_counters[status][gender]['bcp plus !'] += 1
            elif '>' in value:
                overall_range_counters['bcp plus !'] += 1
                gender_range_counters[gender]['bcp plus !'] += 1
                if status in status_range_counters:
                    status_range_counters[status]['bcp plus !'] += 1
                    fusion_range_counters[status][gender]['bcp plus !'] += 1
            elif '<' in value:
                overall_range_counters['<50'] += 1
                gender_range_counters[gender]['<50'] += 1
                if status in status_range_counters:
                    status_range_counters[status]['<50'] += 1
                    fusion_range_counters[status][gender]['<50'] += 1
            else:
                lower, upper = map(int, value.split('-'))
                if lower < 50:
                    overall_range_counters['<50'] += 1
                    gender_range_counters[gender]['<50'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['<50'] += 1
                        fusion_range_counters[status][gender]['<50'] += 1
                elif 51 <= lower <= 80:
                    overall_range_counters['51-80'] += 1
                    gender_range_counters[gender]['51-80'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['51-80'] += 1
                        fusion_range_counters[status][gender]['51-80'] += 1
                elif 81 <= lower <= 120:
                    overall_range_counters['81-120'] += 1
                    gender_range_counters[gender]['81-120'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['81-120'] += 1
                        fusion_range_counters[status][gender]['81-120'] += 1
                elif 121 <= lower <= 150:
                    overall_range_counters['121-150'] += 1
                    gender_range_counters[gender]['121-150'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['121-150'] += 1
                        fusion_range_counters[status][gender]['121-150'] += 1

# Display the count for each range, gender, status, and fusion
result_data = {
    'Overall': overall_range_counters,
    'Sexe': gender_range_counters,
    'Statut': status_range_counters,
    'Sexe_Statut': fusion_range_counters
}

print('data = {')
for key, value in result_data.items():
    print(f"    {key}: {{")
    for sub_key, sub_value in value.items():
        print(f"        '{sub_key}': {sub_value},")
    print("    },")
print('};')
