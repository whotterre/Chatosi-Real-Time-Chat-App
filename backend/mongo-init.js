db = db.getSiblingDB('chatosi');


db.createCollection('users');
db.createCollection('messages');

db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ username: 1 }, { unique: true });
db.messages.createIndex({ senderId: 1, receiverId: 1 });
db.messages.createIndex({ createdAt: -1 });

print('MongoDB initialization completed!');
