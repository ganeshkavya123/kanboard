module.exports = {
    get: {
        tags: ['Display: Display TestData'],
        description: "Display",
        operationId: "Display",
        parameters: [
            // {
            //     in: 'query',
            //     name: "limit",
            //     schema: {
            //         type: 'number'
            //     }
            // },
            // {
            //     in: 'query',
            //     name: "keyword",
            //     schema: {
            //         type: 'string'
            //     }
            // },
        ],
        requestBody: {
        },
        responses: {
            '200': {
                description: 'Successful operation',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/DisplayResponse'
                        }
                    }
                },
            },
            '500': {
                description: 'Server error'
            }
        }
    }
}