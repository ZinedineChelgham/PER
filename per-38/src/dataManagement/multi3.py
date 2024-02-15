import json

# Read the JSON file
with open('transformed.json', encoding='utf-8') as file:
    data = json.load(file)

# Initialize counters for different ranges, genders, statuses, and fusion
# Initialize counters for different ranges, genders, statuses, and fusion
overall_range_counters = {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0}
gender_range_counters = {'Un homme': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0},
                         'Une femme': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0}}
status_range_counters = {'Professeur des Universités': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0},
                         'Maître de Conférences (sans HDR)': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0},
                         'Maître de Conférences (avec HDR)': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0},
                         # Add more statuses as needed
                         }
fusion_range_counters = {'Professeur des Universités': {'Un homme': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0},
                                                          'Une femme': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0}},
                         'Maître de Conférences (sans HDR)': {'Un homme': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0},
                                                               'Une femme': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0}},
                         'Maître de Conférences (avec HDR)': {'Un homme': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0},
                                                              'Une femme': {'<5': 0, '5-8': 0, '9-15': 0, '>15': 0}},
                         # Add more statuses as needed
                         }

# Rest of the code remains the same...


# Count occurrences based on different criteria
for entry in data:
    gender = entry.get('1 - Vous êtes ?', None)
    status = entry.get('Votre statut :', None)
    value = entry.get('Resp. pédagogiques', None)

    if value is not None and status is not None:
        if gender != 'Autre':
            if 'bcp plus !' in value:
                overall_range_counters['>15'] += 1  # Update to the appropriate range
                gender_range_counters[gender]['>15'] += 1
                status_range_counters[status]['>15'] += 1
                fusion_range_counters[status][gender]['>15'] += 1
            elif '>' in value:
                overall_range_counters['>15'] += 1
                gender_range_counters[gender]['>15'] += 1
                if status in status_range_counters:
                    status_range_counters[status]['>15'] += 1
                    fusion_range_counters[status][gender]['>15'] += 1
            elif '<' in value:
                overall_range_counters['<5'] += 1  # Update to the appropriate range
                gender_range_counters[gender]['<5'] += 1
                if status in status_range_counters:
                    status_range_counters[status]['<5'] += 1
                    fusion_range_counters[status][gender]['<5'] += 1
            else:
                lower, upper = map(int, value.split('-'))
                if lower < 5:  # Update to the appropriate range
                    overall_range_counters['<5'] += 1
                    gender_range_counters[gender]['<5'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['<5'] += 1
                        fusion_range_counters[status][gender]['<5'] += 1
                elif 5 <= lower <= 8:  # Update to the appropriate range
                    overall_range_counters['5-8'] += 1
                    gender_range_counters[gender]['5-8'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['5-8'] += 1
                        fusion_range_counters[status][gender]['5-8'] += 1
                elif 9 <= lower <= 15:  # Update to the appropriate range
                    overall_range_counters['9-15'] += 1
                    gender_range_counters[gender]['9-15'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['9-15'] += 1
                        fusion_range_counters[status][gender]['9-15'] += 1
                elif lower > 15:
                    overall_range_counters['>15'] += 1
                    gender_range_counters[gender]['>15'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['>15'] += 1
                        fusion_range_counters[status][gender]['>15'] += 1

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
