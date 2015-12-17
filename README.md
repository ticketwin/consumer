## Setup

### NVM (Node Version Manager)

* **Run NVM installer**

    `curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash`

    `source ~/.profile`

    _Double check by typing `nvm --version`_

* **Install latest Node.js**

    `nvm install stable`

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

## Run

* **Start gulp watch task**

    `gulp watch`

* **Start app**

    `nodemon server.js`

* **Open consumer app**

    `open http://localhost:8080`
