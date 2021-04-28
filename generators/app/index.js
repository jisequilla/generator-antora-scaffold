'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Welcome to the first-class ${chalk.red('generator-mauc-document')} generator!`
      )
    );

    const prompts = [
      {
        type: 'options',
        name: 'appName',
        message: 'Type the name of your application',
        default: 'MyApp',
      },
      {
        type: 'options',
        name: 'email',
        message: 'Please enter your email',
        default: 'myemail@email.com',
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  default() {
    if (path.basename(this.destinationPath()) !== this.props.appName) {
      this.log(
        `Your docs must be inside a folder named ${this.props.appName}\nI'll automatically create this folder.`
      );
      mkdirp.sync(this.props.appName);
      this.destinationRoot(this.destinationPath(this.props.appName));
    }
  }


  writing() {
    this.fs.copy(
      this.templatePath('docs/**'),
      this.destinationPath('docs')
    );
  }

};


