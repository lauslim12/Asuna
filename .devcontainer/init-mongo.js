// Creates a normal user for our database.
db.createUser({
  user: "root",
  pwd: "example",
  roles: [
    {
      role: "readWrite",
      db: "asuna-application",
    },
  ],
});

// Creates a default collection: 'users'.
db.createCollection("users");
