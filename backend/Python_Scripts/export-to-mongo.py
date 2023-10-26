import pandas as pd
from pymongo import MongoClient

client = MongoClient("mongodb+srv://Developer:Bahubhashak@bahubhashaak-project.ascwu.mongodb.net/TTO-Dev?retryWrites=true&w=majority")
db = client['TTO-Dev']
collection = db['patents']

csv_data = pd.read_csv('/Users/yyash145/Documents/Project/TTO_Re-design/CSV/TTO_Patents_new.csv')
records = csv_data.to_dict(orient='records')
collection.insert_many(records)

client.close()
print("Insertion completed")
 