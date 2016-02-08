# Consumer

[![Circle CI](https://circleci.com/gh/ticketwin/consumer/tree/master.svg?style=svg&circle-token=661d80241f4594e36df1356f64d4e5cabc2427ad)](https://circleci.com/gh/ticketwin/consumer/tree/master)

## Setup

### NVM (Node Version Manager)

* **Run NVM installer**

    `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash`

    `source ~/.profile`

    _Double check by typing `nvm --version`_

* **Install latest Node.js**

    `nvm install 4.1.1`

### Nodemon

* **Install Nodemon**

    `npm install nodemon -g`

### Gulp.js

* **Install gulp.js**

    `npm install gulp -g`

### Setup TicketWin Consumer respository

* **Clone consumer repo**

    `git clone https://github.com/ticketwin/consumer.git`

    `cd consumer`


* **Install TicketWin consumer app**

    `npm install`

    _Protip: run `npm install & say done` for an audible cue when everything is finished_

### Run

* **Watch for changes to HTML, Sass, or JS files**

    `gulp watch`

* **Start and run Karma**

    `npm run test`

* **Start Protractor**

    `npm run protractor-server`

* **Run E2E Tests**

    `npm run test-protractor`

* **Start app**

    `nodemon server.js`

* **Open consumer app**

    `open http://localhost:8080`
