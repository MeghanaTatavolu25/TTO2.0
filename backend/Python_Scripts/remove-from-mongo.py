from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient("mongodb+srv://Developer:Bahubhashak@bahubhashaak-project.ascwu.mongodb.net/TTO-Dev?retryWrites=true&w=majority")
db = client['TTO-Dev']
collection = db['patents']

def delete_all_documents():
    result = collection.delete_many({})

delete_all_documents()
print("Deletion completed")

