## Overview

This project is a Playwright framewrok and script written in TypeScript that test to a website.

## two ways to exute the test

1, Run test in CI/CD - fork the repo to your github and with every pull and push, test will be excuted in your GitHub Acutions beacuse of yml file.

2, Run test on your own machine - git clone the repo to your local then follow the following steps (take an example with Mac M1 pro)


## Prerequisites / Setup Information

Before you can run this project, you'll need to have Node.js and npm installed. You can download Node.js from the official website: https://nodejs.org/en/download/

## Installation

To install the necessary dependencies, run:

    $ npm install


this will install all the dependencies in package.json


## Running the tests

To run all the test in headless mode

    $ npx playwright test

To run all the test in headed mode

    $ npx playwright test --headed

To run all the test just one worker

    $ npx playwright test --workers=1

Check test report

    $ npx playwright show-report

Slow motion to run the test add the below to code to playwright.config.ts file under use:{ } section, 3000 is ms

    launchOptions: { slowMo: 3000,},