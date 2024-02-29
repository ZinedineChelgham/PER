import json

def process_data(data, categories, text_attribute):
    # Initialize counters for different ranges, genders, statuses, and fusion
    overall_range_counters = {category: 0 for category in categories}
    gender_range_counters = {'Un homme': {category: 0 for category in categories},
                             'Une femme': {category: 0 for category in categories}}
    status_range_counters = {'Professeur des Universités': {category: 0 for category in categories},
                             'Maître de Conférences (sans HDR)': {category: 0 for category in categories},
                             'Maître de Conférences (avec HDR)': {category: 0 for category in categories}}
    fusion_range_counters = {'Professeur des Universités': {'Un homme': {category: 0 for category in categories},
                                                              'Une femme': {category: 0 for category in categories}},
                             'Maître de Conférences (sans HDR)': {'Un homme': {category: 0 for category in categories},
                                                                   'Une femme': {category: 0 for category in categories}},
                             'Maître de Conférences (avec HDR)': {'Un homme': {category: 0 for category in categories},
                                                                  'Une femme': {category: 0 for category in categories}}}

    for entry in data:
        gender = entry.get('1 - Vous êtes ?', None)
        status = entry.get('Votre statut :', None)
        value = entry.get(text_attribute, None)
        # Count occurrences based on different criteria
        if value is not None and status is not None:
            if gender != 'Autre':
                for category in categories:
                    if value.strip() == category:  # Check if the value is equal to the category after removing leading/trailing spaces
                        overall_range_counters[category] += 1
                        gender_range_counters[gender][category] += 1
                        if status in status_range_counters:
                            status_range_counters[status][category] += 1
                            fusion_range_counters[status][gender][category] += 1

    # Display the count for each range, gender, status, and fusion
    result_data = {
        'Overall': overall_range_counters,
        'Sexe': gender_range_counters,
        'Statut': status_range_counters,
        'Sexe_Statut': fusion_range_counters
    }

    return result_data




# Read the JSON file
with open('transformed.json', encoding='utf-8') as file:
    data = json.load(file)

# Define the categories and text attribute you want
categories = ['<50', '51 - 80', '81 - 120', '121 - 150', 'bcp plus !']
text_attribute = "cette année"

# Process the data using the function
result = process_data(data, categories, text_attribute)

# Print the result
print('data = {')
for key, value in result.items():
    print(f"    {key}: {{")
    for sub_key, sub_value in value.items():
        print(f"        '{sub_key}': {sub_value},")
    print("    },")
print('};')
