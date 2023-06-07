# Service-Desk System RESTful API Documentation

The Service Desk System RESTful API provides a set of endpoints to manage and track various aspects of an organization's service desk operations. It allows users to create, update, and retrieve tickets, manage customer information, and track the progress of support requests. The API follows REST principles and communicates using JSON data format.

## Table of Contents

- [Introduction](#introduction)
- [Authentication](#authentication)
- [Request Methods](#request-methods)
- [Endpoints](#endpoints)
- [Response Codes](#response-codes)
- [Error Handling](#error-handling)
- [Headers](#headers)

## Introduction

The Service Desk System RESTful API is a powerful tool that allows developers to interact with the service desk operations of an organization. It provides a standardized and efficient way to create, manage, and track support tickets, customer information, support agents, categories, and departments. By leveraging the API, developers can integrate the service desk functionality seamlessly into their own applications, systems, or third-party services. With the API, organizations can streamline their support processes, enhance customer experiences, and improve overall service desk efficiency. Whether it's creating new tickets, retrieving customer details, assigning support agents, or managing ticket categories, the Service Desk System RESTful API offers a comprehensive set of endpoints to meet the diverse needs of the service desk ecosystem.

## Authentication

To access the API endpoints, users must authenticate by providing their credentials (such as username and password) or using an API key. This ensures that only authorized users can interact with the service desk system.

## Request Methods

| Request Method | Description                                                                                           |
|----------------|-------------------------------------------------------------------------------------------------------|
| GET            | Retrieves the representation of a resource or a collection of resources.                              |
| POST           | Submits data to the server to create a new resource.                                                  |
| PUT            | Updates an existing resource with the provided data.                                                  |
| PATCH          | Updates a part of an existing resource with the provided data.                                        |
| DELETE         | Deletes a specific resource.                                                                         |

## Endpoints

The tables below provides an overview of the available API endpoints:

### **Auth**

| Endpoint             | Method   | Description                    | Request                                  | Response                                 |
|----------------------|----------|--------------------------------|------------------------------------------|------------------------------------------|
| `/api/auth/signin`        | POST      | Allows users to authenticate.     | [Request](#sign-in-request)     | [Response](#sign-in-response)   |
| `/api/auth/signup`        | POST     | Enables users to create a new account.     | [Request](#sign-up-request)     |    |
| `/api/auth/signout`        | POST      | Allows users to logout.     |      |    |

### SignIn

Allows users to authenticate and access content.

#### **Sign In Request:**

```json
{
    "username" : "johndoe",
    "password" : "1111111"
}
```

#### **Sign In Response:**

```json
{
    "id": 5,
    "username": "johndoe",
    "email": "john.doe@example.com",
    "roles": [
        "USER",
        "ADMIN",
        "MODERATOR"
    ]
}
```

### SignUp

Allows users to authenticate and access content.

#### **Sign Up Request:**

```json
{
    "username" : "test_user10",
    "firstName" : "test_user10",
    "lastName" : "test_user10",
    "email" : "test_user10@gmail.com",
    "password" : "asd",
    "role" : ["user", "moderator"],
    "birth" : "2001/01/01",
    "phone" : "87776666666"
}
```

### **Project**

| Endpoint             | Method   | Description                    | Request                                  | Response                                 |
|----------------------|----------|--------------------------------|------------------------------------------|------------------------------------------|
| `/api/project/create`        | POST      | Allows users to create projects.     | [Request](#project-create-request)     |  [Response](#project-create-response)  |
| `/api/project/search?query=title`        | GET      | Allows users to search projects by title and description.     |      |    |
| `/api/project/{id}`        | GET      | Allows users to get project by id.     |      |    |
| `/api/project/{id}`        | PUT      | Allows users to update project by id.     | [Request](#project-update-request)     | [Response](#project-update-response)   |
| `/api/project/{id}`        | DELETE      | Allows users to delete project by id.     |     |    |

#### **Project Create Request:**

```json
{
    "title" : "title",
    "description" : "description"
}
```

#### **Project Create Response:**

```json
{
    "projectId": 768,
    "title": "title",
    "description": "description",
    "createdDate": "2023/06/04 10:05:25",
    "admin": {
        "id": 5,
        "firstName": "John",
        "lastName": "Doe",
        "username": "johndoe",
        "email": "john.doe@example.com",
        "password": "$2a$10$/lYYFEXeqJlXzyBhBuoBDOG0FP9Z5PZqGLNq6GuhANcAJEVEqmK2C",
        "roles": [
            {
                "id": 3,
                "name": "MODERATOR"
            },
            {
                "id": 2,
                "name": "ADMIN"
            },
            {
                "id": 4,
                "name": "USER"
            }
        ],
        "birth": "1999/01/01/01",
        "phone": "87074484322"
    }
}
```

#### **Project Update Request:**

```json
{
    "title" : "title update",
    "description" : "description update"
}
```

### **Task**

| Endpoint             | Method   | Description                    | Request                                  | Response                                 |
|----------------------|----------|--------------------------------|------------------------------------------|------------------------------------------|
| `/api/task/create`        | POST      | Allows users to create tasks.     | [Request](#task-create-request)     |  [Response](#task-create-response)  |
| `/api/task/search?query=title&id=1`        | GET      | Allows users to search task by title and description.     |      |    |
| `/api/task/{id}`        | GET      | Allows users to get task by id.     |      |    |
| `/api/task/{id}`        | PUT      | Allows users to update task by id.     | [Request](#task-update-request)     | [Response](#task-update-response)   |
| `/api/task/{id}`        | DELETE      | Allows users to delete task by id.     |     |    |

#### **Task Create Request:**

```json
{
    "title" : "title task",
    "description" : "description task",
    "deadline" : "2023/06/01 10:00:00",
    "taskType" : "bug",
    "taskStatus" : "active",
    "taskPriority" : "high",
    "projectId" : 768,
    "taskTags" : ["jojo", "evangelion"]
}
```

#### **Task Create Response:**

```json
{
    "taskId": 771,
    "title": "title",
    "description": "sdfsd",
    "createdDate": "2023/06/04 10:45:31",
    "updatedDate": null,
    "deadline": "2023/06/01 10:00:00",
    "taskType": {
        "id": 2,
        "name": "BUG"
    },
    "taskTypeId": 2,
    "taskStatus": {
        "id": 2,
        "name": "ACTIVE"
    },
    "taskStatusId": 2,
    "taskPriority": {
        "id": 1,
        "name": "LOW"
    },
    "taskPriorityId": 1,
    "author": {
        "id": 2,
        "firstName": "admin",
        "lastName": "admin",
        "username": "admin",
        "email": "admin@gmail.com",
        "password": "$2a$10$ZUNatg00oerWVySeY1RMiOhElMHe7wt3wP8IKwmBpaqzmvW6waCGu",
        "roles": [
            {
                "id": 2,
                "name": "ADMIN"
            },
            {
                "id": 3,
                "name": "MODERATOR"
            },
            {
                "id": 4,
                "name": "USER"
            }
        ],
        "birth": "1998/02/02",
        "phone": "87772222222"
    },
    "authorId": 2,
    "sprint": null,
    "sprintId": null,
    "project": {
        "projectId": 1,
        "title": "Google",
        "description": "Google LLC is an American multinational technology company focusing on online advertising, search engine technology, cloud computing, computer software, quantum computing, e-commerce, artificial intelligence,[9] and consumer electronics. It has been referred to as \"the most powerful company in the world\" and one of the world's most valuable brands due to its market dominance, data collection, and technological advantages in the area of artificial intelligence. Its parent company Alphabet is considered one of the Big Five American information technology companies, alongside Amazon, Apple, Meta, and Microsoft.",
        "createdDate": "2023/05/14 22:42:22",
        "admin": {
            "id": 1,
            "firstName": "superadmin",
            "lastName": "superadmin",
            "username": "superadmin",
            "email": "superadmin@gmail.com",
            "password": "$2a$10$.3WQ7Qam52sUIxKzZ0vv.u.63yt1iUSofkVp0CxVm7d8YSA.3fQqy",
            "roles": [
                {
                    "id": 2,
                    "name": "ADMIN"
                },
                {
                    "id": 3,
                    "name": "MODERATOR"
                },
                {
                    "id": 1,
                    "name": "SUPERADMIN"
                },
                {
                    "id": 4,
                    "name": "USER"
                }
            ],
            "birth": "1999/01/01",
            "phone": "87771111111"
        }
    },
    "projectId": 1,
    "taskTags": [
        "jojo",
        "evangelion"
    ]
}
```

## Response Codes

The table below lists the response codes returned by the API and their corresponding descriptions:

| Response Code | Description                                      |
|---------------|--------------------------------------------------|
| 200           | OK - The request was successful.                 |
| 400           | Bad Request - The request was invalid.           |
| 401           | Unauthorized - Authentication failed.            |
| 403           | Forbidden - Access Denied.            |
| 404           | Not Found - The requested resource was not found.|
| 500           | Internal Server Error - An error occurred.       |

## Error Handling

When an error occurs, the API responds with an error message in JSON format, providing information about the specific error. The error response includes an error code and a descriptive error message to help developers diagnose and resolve issues.

Example error response for unauthorized (401):

```json
{
    "path": "/api/auth/signin",
    "error": "Unauthorized",
    "message": "Bad credentials",
    "status": 401
}
```

## Headers

| Header                        | Description                                                                                |
|-------------------------------|--------------------------------------------------------------------------------------------|
| Access-Control-Allow-Headers  | Specifies the allowed headers during CORS (Cross-Origin Resource Sharing) requests.         |
| Origin                        | Indicates the origin of the request, typically used in CORS to control access restrictions.|
| Accept                        | Indicates the desired response format, allowing clients to specify the content type they expect, such as `application/json`. |
| X-Requested-With              | Identifies the type of request, commonly used to check if the request is an AJAX request.   |
| Content-Type                  | Specifies the format of the request payload, commonly set to `application/json`.           |
| Access-Control-Request-Method | Used in CORS preflight requests to indicate the method of the actual request.               |
| Access-Control-Request-Headers| Used in CORS preflight requests to indicate the allowed headers of the actual request.      |
| Authorization                 | Carries the credentials or API key necessary to access protected resources.                 |
