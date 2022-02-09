from flask import Flask, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI'] = 'mongodb://localhost/pythonreactdb'
mongo = PyMongo(app)  # mongo es la conexión a la BD

CORS(app)

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
            'email': doc['email'],
            'password': doc['password']
        })
    return jsonify(users)


@app.route('/user/<id>', methods=['GET'])
def getOneUser(id):
    doc = db.find_one({'_id': ObjectId(id)})
    return jsonify({
        '_id': str(ObjectId(doc['_id'])),
        'name': doc['name'],
        'email': doc['email'],
        'password': doc['password']
    })


@app.route('/user/<id>', methods=['DELETE'])
def deleteOneUser(id):
    db.delete_one({'_id': ObjectId(id)})

    return jsonify({'msg': 'User deleted'})


@app.route('/user/<id>', methods=['PUT'])
def updateOneUser(id):
    print(id)
    print(request.json)
    db.update_one(
        {'_id': ObjectId(id)},
        {'$set': {
            'name': request.json['name'],
            'email': request.json['email'],
            'password': request.json['password'],
        }}
    )
    return jsonify({'msg': 'User updated'})


# Inicializamos el packete
if __name__ == '__main__':
    # pasandole debug a true cada vez que hagamos un cambio en el código se va a volver a ejecutar
    app.run(debug=True)
