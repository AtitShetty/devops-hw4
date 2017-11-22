const fs = require('fs');

function analysis() {
  var content = fs.readFileSync('report.csv', 'utf-8').split("\n");

  var status = "Cannot be determined";

  for (var i = 1; i < content.length; i++) {
    var data = content[i].split(',');

    if (data[0] == "/api-exp") {
      if (data[1] == data[2]) {
        status = "Can handle gracefully.";
      } else {
        status = "Cannot handle gracefully.";
        break;
      }
    }
  }

  console.log(status);
}

analysis();
