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

# Initialize dictionaries to store counts for each city
city_counts = {}

# Iterate over transformed data to count respondents and their genders for each city
for respondent in transformed_data:
    city = respondent.get('Ville')
    gender = respondent.get('1 - Vous êtes ?')

    # Skip respondents without a city or gender
    if not city or not gender:
        continue

    # Normalize city name to lowercase
    city = city.lower()

    # Initialize counts for the city if not already present
    if city not in city_counts:
        city_counts[city] = {'respondantCount': 0, 'femaleCount': 0, 'maleCount': 0, 'otherCount': 0}

    # Increment total respondent count for the city
    city_counts[city]['respondantCount'] += 1

    # Increment gender-specific counts
    if gender == 'Un homme':
        city_counts[city]['maleCount'] += 1
    elif gender == 'Une femme':
        city_counts[city]['femaleCount'] += 1
    else:
        city_counts[city]['otherCount'] += 1

# Convert the city counts to JSON
city_counts_json = json.dumps(city_counts, indent=4)

# Write the city counts to a JSON file
with open('ville3.json', 'w') as file:
    file.write(city_counts_json)
