// pages/api/proxy.js
export default async function handler(req, res) {
    let { url } = req.query;

       // Check if url contains 'http' or 'https' at the beginning; if not, prepend the base URL
       if (!/^https?:\/\//i.test(url)) {
        url = `https://aethenos.com:2053/aethenos-api/common/downloadFile?filePath=${url}`;
    }
    
    try {
      const response = await fetch(url); // Fetching the file from the external server
  
      if (!response.ok) {
        res.status(response.status).json({ message: `Failed to fetch file: ${response.statusText}` });
        return;
      }
  
      const contentType = response.headers.get('Content-Type');
      const contentDisposition = response.headers.get('Content-Disposition');
  
      res.setHeader('Content-Type', contentType); // Set Content-Type to what the file actually is
      res.setHeader('Content-Disposition', contentDisposition || 'attachment'); // Set proper download disposition
  
      const reader = response.body.getReader();
      const stream = new ReadableStream({
        async start(controller) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            controller.enqueue(value);
          }
          controller.close();
        }
      });
  
      const newResponse = new Response(stream);
      const data = await newResponse.blob();
      res.status(200).send(Buffer.from(await data.arrayBuffer()));
    } catch (error) {
      res.status(500).json({ message: `Error fetching file: ${error.message}` });
    }
  }
  