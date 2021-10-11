from flask import Flask, request, json, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import json_util
from bson.objectid import ObjectId
# from pymongo.message import query
# from werkzeug.wrappers import response

# instancia del servidor
app = Flask(__name__)
CORS(app)

# Propiedades de conf de mongo
# asegurar que mongodb inicie
app.config['MONGO_URI'] = 'mongodb://localhost:27017/test'

# conexion
mongo = PyMongo(app)

@app.route('/createBook', methods=['POST'])
def createBook():
    # definir campos
    nombre = request.json['nombre']
    descripcion = request.json['descripcion']
    precio = request.json['precio']
    imagen = request.json['imagen']

    # comprobar campos vacios
    if nombre and descripcion and precio:
        # insertar libro
        objeto = mongo.db.books.insert_one({
            'nombre': nombre,
            'descripcion': descripcion,
            'precio': precio,
            'imagen': imagen
        })

        # obtener respuesta
        return jsonify({
            'data': {
                '_id': str(objeto.inserted_id),
                'nombre': nombre,
                'descripcion': descripcion,
                'precio': precio,
                'imagen': imagen
            },
            'message': 'Libro ' + nombre + ' agregado satisfactoriamente'
        }), 200
    else:
        # obtener respuesta
        return jsonify({'data': {}, 'message': 'Los campos nombre, descripcion y precio son obligatorios'}), 400

@app.route('/listOfBooks', methods=['GET'])
def listOfBook():
    # obtener lista
    books = mongo.db.books.find({})
    # convertir cursor a json
    books = json_util.dumps(books)
    # cargar como objeto de json
    books = json.loads(books)

    return jsonify({'data': books}), 200

@app.route('/listOfBooks/<id>', methods=['GET'])
def listOfBookId(id):
    # obtener lista
    book = mongo.db.books.find_one({'_id': ObjectId(id)})
    # convertir cursor a json
    book = json_util.dumps(book)
    # cargar como objeto de json
    book = json.loads(book)

    return jsonify({'data': book}), 200

@app.route('/updateBook/<id>', methods=['PUT'])
def updateBook(id):
    # definir campos
    nombre = request.json['nombre']
    descripcion = request.json['descripcion']
    precio = request.json['precio']
    imagen = request.json['imagen']
    
    # comprobar campos vacios
    if nombre and descripcion and precio:
        # buscar y modificar
        objeto = mongo.db.books.find_one_and_update({'_id': ObjectId(id)}, { '$set': {
            'nombre': nombre,
            'descripcion': descripcion,
            'precio': precio,
            'imagen': imagen
        }})
        # respuesta
        if objeto != None:
            return jsonify({'message': 'libro ' + id + ' fue actualizado satisfactoriamente'}), 200
        else:
            return jsonify({'message': 'libro ' + id + ' no encontrado'}), 400

@app.route('/deleteBook/<id>', methods=['DELETE'])
def deleteBook(id):
    # buscar y eliminar
    books = mongo.db.books.find_one_and_delete({ '_id': ObjectId(id)})
    # respuesta
    if books != None:
        return jsonify({'message': 'libro ' + id + ' fue eliminado satisfactoriamente'}), 200
    else:
        return jsonify({'message': 'libro ' + id + ' no encontrado'}), 400

# iniciar modulo  principal
if __name__ == '__main__':
    # debug=True activar modo desarrollador
    # cada cambio en el codigo reinicia el servidor
    # port=5000 especificar puerto lo general es 5000
    app.run(debug=True, port=5000)
