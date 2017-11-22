# devops-hw4
Devops HW 4 Chaos Engineering

## About Topology

The topology was created using Express servers.

- The gateway server is runnning on port 6000.
- The 3 api clusters namely "/api", "/api-exp" and "/api-control" are running on port 3000.
- The ratings server is running on port 4000.

## Experiment steps

When we run ```node main.js```, it will hit the gateway 100 times and log the status of each interaction in a file called as ```report.csv```.

If we run ```node analysis.js```, the utility will check ```report.csv``` and try to find it the response from experimental cluster is as expected. If yes then it will post status ```Can handle gracefully.```, else it will post ```Cannot handle gracefully.```.

