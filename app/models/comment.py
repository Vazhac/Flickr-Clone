from .db import db


class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    photo_id = db.Column(db.Integer, db.ForeignKey(
        'photos.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False)
    updatedAt = db.Column(db.DateTime, nullable=True)

    # relationship
    user = db.relationship('User', back_populates='comments')
    photo = db.relationship('Photo', back_populates='comments')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'photo_id': self.photo_id,
            'content': self.content,
            'user': self.user.to_dict(),
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
