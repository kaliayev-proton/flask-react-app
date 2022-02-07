from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreactdb'
mongo = PyMongo(app) # mongo es la conexión a la BD

db = mongo.db.users

@app.route('/users', methods=['POST'])
def createUser():
    id = db.insert_one({
        "name": request.json['name'],
        "email": request.json['email'],
        "password": request.json['password'],
    })
    return jsonify(str(id.inserted_id))
@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'password': doc['password']
        })
    return jsonify(users)
@app.route('/users/<id>', methods=['GET'])
def getOneUser():
    return 'received'
@app.route('/users/<id>', methods=['DELETE'])
def deleteOneUser():
    return 'received'
@app.route('/users/<id>', methods=['PUT'])
def updateOneUser():
    return 'received'

# Inicializamos el packete
if __name__ == '__main__':
    app.run(debug=True) # pasandole debug a true cada vez que hagamos un cambio en el código se va a volver a ejecutar