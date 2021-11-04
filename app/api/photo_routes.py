from flask import Blueprint, jsonify, request
from app.models import Photo, db, Comment
from flask_login import current_user,login_required
from app.aws_s3 import (upload_file_to_s3, allowed_file, get_unique_filename)

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
@login_required
def create_photo():
    print('===========================================================')
    print('Create Photo API ROUTE 1')
    print('===========================================================')
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    print('===========================================================')
    print('Create Photo API ROUTE 2')
    print('===========================================================')

    image = request.files["image"]

    print('===========================================================')
    print('Create Photo API ROUTE 3')
    print('===========================================================')

    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    print('===========================================================')
    print('Create Photo API ROUTE 4')
    print('===========================================================')

    image.filename = get_unique_filename(image.filename)

    print('===========================================================')
    print('Create Photo API ROUTE 5')
    print('===========================================================')

    upload = upload_file_to_s3(image)

    print('===========================================================')
    print('Create Photo API ROUTE 6')
    print('===========================================================')

    if "url" not in upload:
    # if the dictionary doesn't have a url key
    # it means that there was an error when we tried to upload
    # so we send back that error message
        return upload, 400

    print('===========================================================')
    print('Create Photo API ROUTE 7')
    print('===========================================================')

    url = upload["url"]

    photo = Photo(
        title=request.form.get('title'),
        description=request.form.get('description'),
        url=url,
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

    # if the comment doesn't have an updatedAt key don't include it
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
