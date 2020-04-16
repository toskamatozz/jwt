const schema = {
  type: 'object',
  properties: {
    login: { type: 'string' },
    password: { type: 'string' },
  },
  additionalProperties: false,
};

module.exports = schema;
