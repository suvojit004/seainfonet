// init.js

db = db.getSiblingDB('mydb');

db.createUser({
  user: "appuser",
  pwd: "apppassword",
  roles: [
    { role: "readWrite", db: "mydb" }
  ]
});