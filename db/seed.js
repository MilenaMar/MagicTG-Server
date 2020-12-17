///* mySeedScript.js */
//// require the necessary libraries
//const faker = require("faker");
//const MongoClient = require("mongodb").MongoClient;
//const assert = require("assert");
//const _ = require("lodash");
//// Connection URL
////const url = process.env.MONGODB_URI;
//
//// Database Name
////const dbName = "my_dev_database";
//
//// Use connect method to connect to the server
//MongoClient.connect(url, function(err, client) {
//  assert.equal(null, err);
//
//  const db = client.db(dbName);
//
//  // get access to the relevant collections
//  const playerCollection = require("../models/Player.model");
//  const organizerCollection = require("../models/Organizer.model");
//  const eventCollection = require("../models/Event.model");
//  // make a bunch of players
//  let player = [];
//  for (let i = 0; i < 100; i += 1) {
//    const userName = faker.name.username();
//    let newUser = {
//      email: faker.internet.email(userName),
//      userName,
//      password: "password123"
//    };
//    player.push(newUser);
//    console.log(newUser.email);
//  }
//  playerCollection.insertMany(player);
//
//
//
// // make a bunch of organizers
// let organizers = [];
// for (let i = 0; i < 100; i += 1) {
//   const userName = faker.name.username();
//   let newOrg = {
//     email: faker.internet.email(userName),
//     userName,
//     password: "password123"
//   };
//   organizers.push(newOrg);
//   console.log(newOrg.email);
// }
// organizerCollection.insertMany(organizers);
//
//
//
//  // make a bunch of posts
//  let events = [];
//  for (let i = 0; i < 100; i += 1) {
//    let newEvent = {
//      name: faker.lorem.words(3),
//      description:faker.lorem.words(10),
//      // use lodash to pick a random user as the organizer of this event
//     organizer: _.sample(organizer),
//
//      // use lodash to add a random subset of the users to this post
//      players:_.sample(player),
//    };
//    posts.push(newEvent);
//    console.log(newEvent.title);
//  }
//  eventCollection.insertMany(events);
//  console.log("Database seeded! :)");
//  client.close();
//});
//