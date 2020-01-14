'use strict';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-extraneous-dependencies

const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.update = (event, context, callback) => {
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
                'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
            },
            body: { error: 'Error in fields validation.' }
        });
    }

    const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
            id: event.pathParameters.id,
        },
        UpdateExpression: 'SET first_name = :first, last_name = :last, email = :email, age = :age',
        ExpressionAttributeValues: {
            ':first': first_name,
            ':last': last_name,
            ':email': email,
            ':age': age,
        },
        ReturnValues: 'UPDATED_NEW',
    };

    dynamoDb.update(params, (error, result) => {
        if (error) {
            return callback(null, {
                statusCode: 400,
                headers: {
                    'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials': true,
                },
                body: { error: 'Error in update user.' }
            });
        }

        callback(null, {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        });
    });
};