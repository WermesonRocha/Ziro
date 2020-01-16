'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.create = (event, context, callback) => {
    const timestamp = new Date().getTime();
    const data = JSON.parse(event.body);
    let first_name = (data.first_name);
    let last_name = (data.last_name);
    let email = (data.email);
    let age = (data.age);

    if (typeof first_name !== 'string' ||
        typeof last_name !== 'string' ||
        typeof email !== 'string' ||
        typeof age !== 'number') {
        return callback(null, {
            statusCode: 400,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: { error: 'Error in fields validation.' }
        });
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
            id: uuid.v1(),
            first_name,
            last_name,
            email,
            age,
            created_at: timestamp,
            updated_at: timestamp
        },
    };

    dynamoDb.put(params, (error) => {
        if (error) {
            return callback(null, {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: { error: 'Couldn\'t create user.' }
            });
        }

        return callback(null, {
            statusCode: 200,
            body: JSON.stringify(params.Item),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
        });
    });
};