import json

# Function to load JSON data from a file
def load_json(filename):
    with open(filename, 'r', encoding='utf-8') as file:
        return json.load(file)

# Function to save JSON data to a file
def save_json(data, filename):
    with open(filename, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)

# Load the respondent counts per city
ville_data = load_json('./ville2.json')

# Load the cities details
cities_details = load_json('./cities.json')

# Initialize a new list for updated city details
updated_city_details = []

# Keep track of cities that have already been added
added_cities = set()

# Update the cities details with respondent counts
for city_detail in cities_details['cities']:
    city_label = city_detail['label'].lower()  # Normalize the city label to lowercase
    respondent_count = ville_data.get(city_label)

    # If there's no respondent count, skip this entry
    if respondent_count is None:
        continue

    # If we have already added this city, skip this entry
    if city_label in added_cities:
        continue

    # Add the respondent count and mark this city as added
    city_detail['respondantCount'] = respondent_count['respondantCount']

    # Update counts for females, males, and others
    city_detail['femaleCount'] = ville_data[city_label]['femaleCount']
    city_detail['maleCount'] = ville_data[city_label]['maleCount']
    city_detail['otherCount'] = ville_data[city_label]['otherCount']

    updated_city_details.append(city_detail)
    added_cities.add(city_label)

# Replace the old cities list with the updated one
cities_details['cities'] = updated_city_details

# Save the updated cities details back to a JSON file
updated_cities_json_path = './updated_cities3.json'
save_json(cities_details, updated_cities_json_path)

print(f'Updated cities.json saved to {updated_cities_json_path}')
