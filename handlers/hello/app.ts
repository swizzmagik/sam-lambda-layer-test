
import { Handler, APIGatewayProxyEvent, Callback, Context, APIGatewayProxyResult } from "aws-lambda";
import { buildResponseHeaders, handleError } from "/opt/nodejs/utils";

export const handler: Handler = async (event: APIGatewayProxyEvent, context: Context, callback: Callback): Promise<APIGatewayProxyResult> => {

  try {

    const response = {
      message: 'hello world my friend!',
    };
    console.log(JSON.stringify(response));

    return {
      statusCode: 200,
      headers: buildResponseHeaders(),
      body: JSON.stringify(response)
    };

  } catch (error) {
    return handleError(error);
  }
}