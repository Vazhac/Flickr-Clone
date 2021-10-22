from flask import Blueprint, jsonify, request
from app.models import Photo, db, Comment
from flask_login import current_user

photo_routes = Blueprint('photos', __name__)


# ========================================================================
# ===========================Photos=======================================
# ========================================================================

# ==========================Find-ALL==========================

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


# ==========================Find-ONE==========================


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
    return 'ok'

# ========================================================================
# ==========================Comments======================================
# ========================================================================


@photo_routes.route('/<int:id>/comments/', methods=['GET'])
def photo_comments(id):
    photo = Photo.query.get(id)
    return {'comments': [comment.to_dict() for comment in photo.comments]}

# find-one comment

@photo_routes.route('/<int:id>/comments/<int:comment_id>/', methods=['GET'])
def photo_comment(id, comment_id):
    photo = Photo.query.get(id)
    comment = Comment.query.get(comment_id)
    return comment.to_dict()

@photo_routes.route('/<int:id>/comments/', methods=['POST'])
def create_comment(id):
    body = request.get_json()
    comment = Comment(
        content=body.get('content'),
        user_id=current_user.id,
        photo_id=id,
        createdAt=body.get('createdAt'),
        updatedAt=body.get('updatedAt')
    )
    db.session.add(comment)
    db.session.commit()
    return comment.to_dict()

@photo_routes.route('/<int:id>/comments/<int:comment_id>/', methods=['PUT'])
def update_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    body = request.get_json()
    comment.content = body.get('content')
    comment.user_id = current_user.id
    comment.photo_id = id
    comment.createdAt = body.get('createdAt')
    comment.updatedAt = body.get('updatedAt')
    db.session.commit()
    return comment.to_dict()

@photo_routes.route('/<int:id>/comments/<int:comment_id>/', methods=['DELETE'])
def delete_comment(id, comment_id):
    comment = Comment.query.get(comment_id)
    db.session.delete(comment)
    db.session.commit()
    return 'ok'
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
