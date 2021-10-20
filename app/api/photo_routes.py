from flask import Blueprint, jsonify
from app.models import Photo

photo_routes = Blueprint('photos', __name__)


@photo_routes.route('/', methods=['GET'])
def photos():
    photos = Photo.query.all()
    return {'photos': [photo.to_dict() for photo in photos]}


@photo_routes.route('/<int:id>', methods=['GET'])
def photo(id):
    photo = Photo.query.get(id)
    return jsonify(photo.to_dict())


@photo_routes.route('/<int:id>', methods=['PATCH'])
def update_photo(id):
    photo = Photo.query.get(id)
    photo.filename = request.json['title']
    photo.description = request.json['description']
    photo.save()
    return jsonify(photo.to_dict())


@photo_routes.route('/<int:id>', methods=['DELETE'])
def delete_photo(id):
    photo = Photo.query.get(id)
    photo.delete()
    return jsonify(photo.to_dict())

# ============================================================
# ==========================Comments==========================
# ============================================================


@photo_routes.route('/<int:id>/comments', methods=['GET'])
def photo_comments(id):
    photo = Photo.query.get(id)
    return jsonify(photo.comments)


@photo_routes.route('/<int:id>/comments/<int:comment_id>', methods=['GET'])
def photo_comment(id, comment_id):
    photo = Photo.query.get(id)
    return jsonify(photo.comments[comment_id])

# ============================================================
# ============================================================
# ============================================================


# ============================================================
# ============================================================
# ============================================================


# @photo_routes.route('/<int:id>/tags', methods=['GET'])
# def photo_tags(id):
#     photo = Photo.query.get(id)
#     return jsonify(photo.tags)
