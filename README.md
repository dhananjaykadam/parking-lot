# Parking-lot

## Setup
* Run `bin/setup` to install node dependencies and also it will run unit tests
  - If `npm i` fails give it a retry and it should pass(this usually never happens, but observed in docker container few times)
  
* Run `bin/parking_lot functional_spec/fixtures/file_input.txt` to run the it with existing file_input
* Run `bin/run_functional_tests` to run end to end tests using rake/ruby

## Docker
* `Dockerfile` is added to this project so building and image and running it should be easier
  - `docker build -t parking_lot .`
  - `docker run parking_lot` this will run functional tests and log to console
  - `docker run -it parking_lot bash` login to container and run commands manually

