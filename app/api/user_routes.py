from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return [user.to_dict() for user in users]


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/edit', methods=['PUT'])
@login_required
def edit_user(id):
    user = User.query.get(id)
    user.username = request.json.get('username')
    user.email = request.json.get('email')
    user.password = request.json.get('password')
    db.session.commit()
    return user.to_dict()
