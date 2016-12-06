var db = null;
var sqlite = angular.module('sqlite', ['ionic', 'ngCordova']);

sqlite.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    db = $cordovaSQLite.openDB("my.db");
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS chats (id integer primary key, firstname varchar(10), lastname varchar(10), avatar text, message text)");
  });
});

sqlite.factory('chatsFactory', function($cordovaSQLite) {
  return {
    insert : function(firstname, lastname, avatar, message) {
      var query = "INSERT INTO chats (firstname, lastname, avatar, message) VALUES (?, ?, ?, ?);";
      var values = [firstname, lastname, avatar, message];

      $cordovaSQLite.execute(db, query, values).then(
        function(res) {
          console.log('INSERTED ID: '+res.insertId);
        },
        function(err) {
          console.log('ERROR: '+err);
        }
      );
    },
    select : function(id) {
      var query = "SELECT * FROM chats WHERE id=?";
      var values = [id];

      $cordovaSQLite.execute(db, query, values).then(
        function(res) {
          if (res.rows.length > 0) {
            var first = res.rows.item(0);
            console.log(res.rows.length + ' records, fist: ' + first.firstname + ' ' + first.lastname + ' - ' + first.avatar);
          } else {
            console.log('No records found');
          }
        }
      );
    }
  }
});