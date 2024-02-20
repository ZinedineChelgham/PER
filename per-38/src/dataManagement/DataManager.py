import json

# Load your JSON data here. For this example, it's loaded from a file.
with open('done.json', 'r', encoding='utf-8') as file:
    data = json.load(file)

# Skip the first chunk as it's general info
question_chunk = data[1]  # This is the second chunk with questions
respondents_data = data[2:]  # All other chunks are respondents' answers

# Create a dictionary to map 'ColumnX' to the actual question
questions = {key: question_chunk[key] for key in question_chunk}

# Function to transform a respondent's answers
def transform_answers(answers):
    return {questions.get(key, key): answers.get(key, None) for key in questions}

# Transform each respondent's data
transformed_data = [transform_answers(resp) for resp in respondents_data]

# List of cities considered part of Paris
consideredParis = ["palaiseau", "orsay", "versailles", "nanterre", "villetaneuse", "cergy", "courbevoie", "saclay",
"gif sur yvette","gif-sur-yvette","pparis" ,"'paris","région parisienne","region parisienne"]  # Add your cities here

consideredNice = ["nice sophia antipolis","sophia antipolis"]
# Initialize dictionaries to store counts for each city and associated IDs
city_data = {}

# Iterate over transformed data to count respondents and their genders for each city
for respondent in transformed_data:
    city = respondent.get('Ville')
    gender = respondent.get('1 - Vous êtes ?')
    respondent_id = respondent.get('Séquentiel')

    # Skip respondents without a city or gender
    if not city or not gender:
        continue

    # Normalize city name to lowercase
    city = city.lower()

    # Initialize data for the city if not already present
    if city not in city_data:
        city_data[city] = {'respondantCount': 0, 'femaleCount': 0, 'maleCount': 0, 'otherCount': 0, 'ids': []}

    # Increment total respondent count for the city
    city_data[city]['respondantCount'] += 1

    # Increment gender-specific counts
    if gender == 'Un homme':
        city_data[city]['maleCount'] += 1
    elif gender == 'Une femme':
        city_data[city]['femaleCount'] += 1
    else:
        city_data[city]['otherCount'] += 1

    # Add the ID to the array for the city
    if respondent_id:
        city_data[city]['ids'].append(respondent_id)

    # Check if the city is considered part of Paris
    if city in consideredParis:
        # If yes, update counts and IDs for "paris"
        paris_data = city_data.get('paris', {'respondantCount': 0, 'femaleCount': 0, 'maleCount': 0, 'otherCount': 0, 'ids': []})
        paris_data['respondantCount'] += 1
        if gender == 'Un homme':
            paris_data['maleCount'] += 1
        elif gender == 'Une femme':
            paris_data['femaleCount'] += 1
        paris_data['ids'].append(respondent_id)
        city_data['paris'] = paris_data
    # Check if the city is considered part of Nice
    if city in consideredNice:
        # If yes, update counts and IDs for "nice"

        nice_data = city_data.get('nice', {'respondantCount': 0, 'femaleCount': 0, 'maleCount': 0, 'otherCount': 0, 'ids': []})
        nice_data['respondantCount'] += 1
        if gender == 'Un homme':
            nice_data['maleCount'] += 1
        elif gender == 'Une femme':
            nice_data['femaleCount'] += 1
        nice_data['ids'].append(respondent_id)
        city_data['nice'] = nice_data        

# Convert the city data to JSON
city_data_json = json.dumps(city_data, indent=4)

# Write the city data to a JSON file
with open('ville5.json', 'w') as file:
    file.write(city_data_json)
