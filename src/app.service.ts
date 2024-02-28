import { Injectable } from '@nestjs/common';
// import fetch from 'cross-fetch';
import fetch from 'node-fetch';

@Injectable()
export class AppService {
  async getHello(): Promise<string> {
    const d = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
    return 'Hello World!';
  }
}

const fetchData = async (url: string) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Read the response body in chunks
    const chunks = [];
    response.body.on('data', (chunk) => {
      // Convert the chunk (Buffer) to a string
      const chunkString = chunk.toString();
      // Log each chunk
      console.log(chunkString);
      // Store chunks for further processing if needed
      chunks.push(chunkString);
    });

    // Wait for the response body to finish
    await new Promise((resolve, reject) => {
      response.body.on('end', resolve);
      response.body.on('error', reject);
    });

    console.log('End of response.');

    // If you need to process the concatenated chunks further, you can join them into a single string
    const responseBody = chunks.join('');

    // If the response body is JSON, you can parse it
    const jsonData = JSON.parse(responseBody);
    console.log(jsonData);
  } catch (error) {
    console.error('Error:', error);
  }
};
