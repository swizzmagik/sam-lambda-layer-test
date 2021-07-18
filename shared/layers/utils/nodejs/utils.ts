import { APIGatewayProxyResult } from 'aws-lambda';
import logging from './logging';
import numbers from './numbers';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const elapsedTime = (startTime: any) => {
  return toHHMMSS(elapsedSeconds);
};

const elapsedSeconds = (startTime: any) => {
  return (new Date().getTime() - startTime) / 1000;
};

const toHHMMSS = function (input: any) {
  var sec_num = parseInt(input, 10); // don't forget the second param
  var hours: any = Math.floor(sec_num / 3600);
  var minutes: any = Math.floor((sec_num - hours * 3600) / 60);
  var seconds: any = sec_num - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return hours + ':' + minutes + ':' + seconds;
};

const buildResponseHeaders = (additionalHeaders?: any) => {
  const headers: any = {
    ...additionalHeaders,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'false',
    'Access-Control-Allow-Methods': '*'
  };
  return headers;
}

// global error handler
const handleError = async (error: Error, additionalNotes?: any): Promise<APIGatewayProxyResult> => {

  console.error(JSON.stringify(error));

  return {
    statusCode: 500,
    headers: buildResponseHeaders(),
    body: JSON.stringify({
      message: error.message,
      name: error.name,
      stack: error.stack
    })
  };
}


export {
  delay,
  getRandomInt,
  elapsedTime,
  elapsedSeconds,
  toHHMMSS,
  buildResponseHeaders,
  handleError,
  numbers,
  logging,
};
