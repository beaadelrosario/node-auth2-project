
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex("users")
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        { 
          username: "bea", 
          password: "password", 
          department: "earth" 
        },
        { 
          username: "izzy", 
          password: "pass", 
          department: "mars" 
        },
        { 
          username: "sam", 
          password: "password1", 
          department: "venus" 
        },
      ]);
    });
};
