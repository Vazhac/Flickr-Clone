from flask import Blueprint, jsonify, request
from app.models import Photo, db, Comment
from flask_login import current_user

photo_routes = Blueprint('photos', __name__)


# ========================================================================
# ===========================Photos=======================================
# ========================================================================


@photo_routes.route('/', methods=['GET'])
def photos():
    photos = Photo.query.all()
    return {'photos': [photo.to_dict() for photo in photos]}


# ===========================Create===========================


@photo_routes.route('/', methods=['POST'])
def create_photo():
    body = request.get_json()
    photo = Photo(
        title=body.get('title'),
        description=body.get('description'),
        url=body.get('url'),
        user_id=current_user.id
    )
    db.session.add(photo)
    db.session.commit()
    return photo.to_dict()


# ==========================Find-ALL==========================


@photo_routes.route('/<int:id>', methods=['GET'])
def photo(id):
    photo = Photo.query.get(id)
    return photo.to_dict()

# ===========================UPDATE===========================


@photo_routes.route('/<int:id>', methods=['PUT'])
def update_photo(id):
    photo = Photo.query.get(id)
    body = request.get_json()
    photo.title = body.get('title')
    photo.description = body.get('description')
    photo.url = body.get('url')
    db.session.commit()
    return photo.to_dict()


# ===========================DELETE===========================

@photo_routes.route('/<int:id>', methods=['DELETE'])
def delete_photo(id):
    photo = Photo.query.get(id)
    db.session.delete(photo)
    db.session.commit()
    return photo.to_dict()

# ========================================================================
# ==========================Comments======================================
# ========================================================================


@photo_routes.route('/<int:id>/comments', methods=['GET'])
def photo_comments(id):
    photo = Photo.query.get(id)
    return {'comments': [comment.to_dict() for comment in photo.comments]}


@photo_routes.route('/<int:id>/comments', methods=['POST'])
def create_photo_comment(id):
    body = request.get_json()
    comment = Comment(
        content=body.get('content'),
        user_id=current_user.id,
        photo_id=id,
    )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()

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
