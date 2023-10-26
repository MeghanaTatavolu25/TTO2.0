import csv
import string

input_file_path = '../../CSV/TTO_Patent.csv'
output_file_path = '../../CSV/TTO_Patent.csv'
column_index = 0  # Adjust this index to the column you want to modify (0-based index)

with open(input_file_path, 'r', newline='') as input_file, open(output_file_path, 'w', newline='') as output_file:
    reader = csv.reader(input_file)
    writer = csv.writer(output_file)

    for row in reader:
        if len(row) > column_index:
            # Convert the entire text in the column to lowercase, except the first character
            modified_text = row[column_index][0] + row[column_index][1:].lower()
            row[column_index] = modified_text

        writer.writerow(row)

print("Works")
