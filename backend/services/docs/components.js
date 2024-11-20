module.exports = {
    security: [
      {
        bearerAuth: [],
      },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            },
        },
        schemas: {
          DisplayResponse:{
              type: "object",
              properties: {
              "status": {
                "type": "integer",
                "format": "int32",
                "example": "1"
              },
              "message": {
                "type": "string",
                "example": "success"
              },
              "data": {
                "type": "array",
                "items": {
                  "type": "object",
                  "properties": {
                    "id": {
                      "type": "integer",
                      "format": "int32",
                      "example": "1"
                    },
                    "name": {
                      "type": "string",
                      "example": "Kavya T.G"
                    },
                    "age": {
                      "type": "integer",
                      "format": "int32",
                      "example": "25"
                    }
                  }
                },
                "example": [
                  {
                    "id": 1,
                    "name": "Kavya T.G",
                    "age": 25
                  }
                ]
              }
            }
            },
        }

    }
}