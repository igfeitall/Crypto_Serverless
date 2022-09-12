# Crypto Serverless

<!---Esses são exemplos. Veja https://shields.io para outras pessoas ou para personalizar este conjunto de escudos. Você pode querer incluir dependências, status do projeto e informações de licença aqui--->

![GitHub repo size](https://img.shields.io/github/repo-size/iuricode/README-template?style=for-the-badge)
![Node](https://img.shields.io/node/v/serverless?style=for-the-badge)

![image](https://raw.githubusercontent.com/igfeitall/Crypto_Serverless/main/Lambda%20Function.png)
 
> The Crypto Serverless is a Serverless API, made with Node.js and Serverless Framework, using the AWS Lambda and others AWS functions. Your job is to keep track of some cryptocoins exchange rate to $(Dollar), and the evolution rate in % since the last iteration. It keep tracks the Crypto by a given array, and can return a history of the recent rates.

## 💻 Prerequisites

Before we start, check the following prerequisites:

* Instaled the most recent version of JavaScript and Node.
* Created and Account on Amazon and have IAM for this application
* Installed the Amazon CLI

## 🤖 Connecting you Amazon Keys

To run this project you need to connect your own IAM keys:

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

The Stack used in this Project was :
* NodeJs
* Serverless Framework
* AWS Lambda
* AWS API Gateway
* AWS DynamoDB
* AWS EventBridge
* Jest
* Axios


## 🚀 Instaling Crypto Serverless

```
# Clone this repository
$ git clone https://github.com/igfeitall/Crypto_Serverless.git

# Go into the repository
$ cd Crypto_Serverless

# Install dependencies
$ npm install
```

## ☕ Using Crypto API

This is a list of some Configurations needed:
 
  The configuration of the API can be done altering the [serverless.yml](https://github.com/igfeitall/Crypto_Serverless/blob/main/serverless.yml) archive.

  * UPDATE_TIMER (in Minutes), is the minutes to trigger the update via AWS EventBridge,
  * HISTORIC_LIMIT, number of rows that will apear when use GET /tokens endpoint
  * COINLAYER_KEY, the key of yout acount on cointlayer website

  You need to create an acount on coinLayer to be able to use this API : https://coinlayer.com/login

To run the Project you only need to deploy it:

```
# running the server
$ serverless deploy

# rollback the server
$ serverless remove
```

The Project was tested with Jest. To run all the unit test, do the following code:

```
# testing the code
$ npm test
```

## 🌐 Endpoint List

  This is the URL for the application runing rigth now.
   - URL: https://akjq5rkwji.execute-api.us-east-1.amazonaws.com

  ### POST /tokens (add one or many tokens to track):

  The Crypto Serverless use a 3rd Party Token API, this is the list of symbols : https://coinlayer.com/symbols.

  ```
  // example
  { 

  "body": ["BTC", "ETH", "DOGE"]

  }
  ```

  ### GET /tokens (return the list of all tokens and their last exchange rate and the evolution rate).

  ### GET /tokens/:id (return specific token values and the history of exchange rates and evolutions).
  
  ```
  // example

  /tokens/BTC
  ```

  ### DELETE /tokens/:id (delete all ocurrency of a token in the database, and don`t track it anymore).

  ```
  // example
  
  /tokens/BTC
  ```

  The updateToken function is running on the AWS EventBridge.

  To import the collections of Routes on Insomniam use the Json : [RoutesCollection](https://github.com/igfeitall/Crypto_Serverless/blob/main/RoutesCollection.json)

## 📝 License

This project is using the MIT License. click to follow to the archive [License](https://github.com/igfeitall/Crypto_Serverless/blob/main/LICENSE).

[⬆ back to the top](#Crypto_Serverless)<br>
