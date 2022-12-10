const PROTO_PATH = __dirname + '/graphql.proto';

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync(
    PROTO_PATH,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });
const graphql_proto = grpc.loadPackageDefinition(packageDefinition).graphql;

function main() {
    const client = new graphql_proto.GraphQL('localhost:50051',
        grpc.credentials.createInsecure());

    client.sendRequest({ query: 'query users{ users { userId userName } }' }, function (err, response) {
        console.log('Response from server is:', response.message);
    });
}

main();
