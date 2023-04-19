## Overview

This project is a Playwright framework. Its script is written in TypeScript to test https://buggy.justtestit.org/. The procedure below should be executed via Mac. Steps might be different if you are using Windows.

## two ways to excute the test

Run the tests in CI/CD - fork the repo to your github; with every pull and push, the tests will be executed in your GitHub Actions setup by .yml file.

Run the tests on your own machine - git clone the repo to your local then follow the following steps. 



### Prerequisites / Setup Information

Before you can run this project, you'll need to have Node.js and npm installed. You can download Node.js from the official website: https://nodejs.org/en/download/

### Installation

To install the necessary dependencies, run:

    $ npm install


this will install all the dependencies according to package.json


### Running the tests

To run all the tests in brower headless mode

    $ npx playwright test

To run all the tests in browser headed mode

    $ npx playwright test --headed

To run all the tests in just one worker

    $ npx playwright test --workers=1

Check test report

    $ npx playwright show-report

Slow motion to run the test add the below to code to playwright.config.ts file under use:{ } section.

    launchOptions: { slowMo: 3000,},

//Unit of 3000 is Millisecond. You can change according to your requirements.