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

# Convert the transformed data back to JSON (or use it as a Python dict)
transformed_json = json.dumps(transformed_data, indent=4)

#write the data to a json file
# with open('transformed.json', 'w') as file:
#     file.write(transformed_json)

# make another json file for each "Ville" with its count from the transformed data 
# and write it to a json file
ville = {}
for i in transformed_data:
    if i['Ville'] in ville:
        ville[i['Ville']] += 1
    else:
        ville[i['Ville']] = 1
ville_json = json.dumps(ville, indent=4)
with open('ville.json', 'w') as file:
    file.write(ville_json)





