async function main(event) {
  console.log('event', JSON.stringify(event));
  return {
    body: JSON.stringify({message: 'Success'}),
    statusCode: 200,
  };
};

module.exports = {main}