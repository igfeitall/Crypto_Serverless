# Cripto Serverless

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![Node](https://img.shields.io/node/v/serverless?style=for-the-badge)


### IMAGE
 
> The Cripto Serverless is a Serverless API, made with Node.js and Serverless Framework, using the AWS Lambda and others AWS functions. Your job is to keep track of some criptocoins exchange rate to $(Dollar), and the evolution rate in % since the last iteration. It keep tracks the cripto by a given array, and can return a history of the recent rates.

## 💻 Prerequisites

Before we start, check the following prerequisites:

* Instaled the most recent version of JavaScript and Node.
* Have and Windows Machine
* Created and Account on Amazon and have IAM for this application
* Installed the Amazon CLI

## 🤖 Connecting you Amazon Keys

To run this project you need to connect your own keys:

```
# start the configuration
$ aws configure [--profile profile-name]

# this is the following options to configure
$ aws configure
AWS Access Key ID [None]: accesskey
AWS Secret Access Key [None]: secretkey
Default region name [None]: us-east-1
Default output format [None]: 
```


## 🚀 Instaling Cripto Serverless

You need to have the node and AWS CLI installed :

```
# Clone this repository
$ git clone https://github.com/igfeitall/Cripto_Serverless.git

# Go into the repository
$ cd Cripto_Serverless

# Install dependencies
$ npm install

# running ther server
$ serverless deploy
```

## ☕ Using Cripto API

This is a list of some Configurations needed:


To run the Project you only need to deploy it:

```
# running ther server
$ serverless deploy
```

## 🌐 Endpoint List

  - POST /tokens (add one or many tokens to track):
  
  ```
  "body": ['token1', 'token2', ..., 'tokenn']
  ```

  - GET /tokens return the list of all tokens and their last exchange rate and the evolution rate (for
example +3%).

  - GET /tokens/:id return specific token values and the history of exchange rates and evolutions
(can specify a limit as a parameter).

  - DELETE /tokens/:id.

  The updateToken function is running on the AWS EventBridge.

## 📝 License

This project is using the MIT Licens. click to follow to the archive [License](LICENSE.md).

[⬆ back to the top](#Cripto_Serverless)<br>
