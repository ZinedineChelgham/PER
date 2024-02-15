import json

# Read the JSON file
with open('transformed.json', encoding='utf-8') as file:
    data = json.load(file)

# Initialize counters for different ranges, genders, statuses, and fusion
# Initialize counters for different ranges, genders, statuses, and fusion
overall_range_counters = {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0}
gender_range_counters = {'Un homme': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0},
                         'Une femme': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0}}
status_range_counters = {'Professeur des Universités': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0},
                         'Maître de Conférences (sans HDR)': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0},
                         'Maître de Conférences (avec HDR)': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0},
                         # Add more statuses as needed
                         }
fusion_range_counters = {'Professeur des Universités': {'Un homme': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0},
                                                          'Une femme': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0}},
                         'Maître de Conférences (sans HDR)': {'Un homme': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0},
                                                               'Une femme': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0}},
                         'Maître de Conférences (avec HDR)': {'Un homme': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0},
                                                              'Une femme': {'0': 0, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0}},
                         # Add more statuses as needed
                         }

# Rest of the code remains the same...

for entry in data:
    gender = entry.get('1 - Vous êtes ?', None)
    status = entry.get('Votre statut :', None)
    value = entry.get("Nbe d'heures de recherche disponibles", None)
# Count occurrences based on different criteria
    if value is not None and status is not None:
            if gender != 'Autre':
                if '0' in value:
                    overall_range_counters['0'] += 1  # Update to the appropriate range
                    gender_range_counters[gender]['0'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['0'] += 1
                        fusion_range_counters[status][gender]['0'] += 1
                elif '1' in value:
                    overall_range_counters['1'] += 1
                    gender_range_counters[gender]['1'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['1'] += 1
                        fusion_range_counters[status][gender]['1'] += 1

                elif '2' in value:
                    overall_range_counters['2'] += 1
                    gender_range_counters[gender]['2'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['2'] += 1
                        fusion_range_counters[status][gender]['2'] += 1

                elif '3' in value:
                    overall_range_counters['3'] += 1
                    gender_range_counters[gender]['3'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['3'] += 1
                        fusion_range_counters[status][gender]['3'] += 1
                elif '4' in value:
                    overall_range_counters['4'] += 1
                    gender_range_counters[gender]['4'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['4'] += 1
                        fusion_range_counters[status][gender]['4'] += 1
                elif '5' in value:
                    overall_range_counters['5'] += 1
                    gender_range_counters[gender]['5'] += 1
                    if status in status_range_counters:
                        status_range_counters[status]['5'] += 1
                        fusion_range_counters[status][gender]['5'] += 1



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
