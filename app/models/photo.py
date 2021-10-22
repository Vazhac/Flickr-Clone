from .db import db


class Photo(db.Model):
    __tablename__ = 'photos'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    title = db.Column(db.String(80))
    description = db.Column(db.String(255))
    url = db.Column(db.String(1000))
    createdAt = db.Column(db.DateTime, default=db.func.now())
    updatedAt = db.Column(
        db.DateTime, default=db.func.now(), onupdate=db.func.now())

    user = db.relationship('User', back_populates='photos')
    comments = db.relationship('Comment', back_populates='photo')
    # delete comments if photo is deleted

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'title': self.title,
            'description': self.description,
            'url': self.url,
            'user': self.user.to_dict(),
            'comments': [comment.to_dict() for comment in self.comments],
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
