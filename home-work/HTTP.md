# ***HTTP(Hypertext Transfer protocol)***







* HTTP is an application-layer protocol for transmitting hypermedia documents, such as HTML, across the web. It's the foundation of data communication on the World Wide Web, operating on a client-server model.
* &nbsp; HTTP is a stateless protocol, meaning that each request is independent of the ones that came before it.



## ***Evolution of HTTP***





* ### HTTP/0.9 (1991)





* It only supported the GET method for requesting a document from a server.



* There were no headers, status codes, or any other metadata. The response was just the HTML file itself.





* Each request required a separate TCP connection, which was closed after the single file was transferred.





* ### HTTP/1.0 (1996)





This version introduced key features that made the web more dynamic and functional.



* Headers: This was a major change, allowing clients and servers to send metadata about the request and response. For example, headers could specify the content type, enabling the transfer of not just HTML, but also images, videos, and other file types.



* Methods: It introduced more methods like POST for submitting data to the server, and HEAD for requesting only the headers of a resource.



* Status Codes: The familiar 3-digit status codes (like 200 OK, 404 Not Found) were introduced to indicate the result of a request.



* It still primarily used a new TCP connection for each request, which created significant overhead, especially for modern webpages with many resources.



* ### HTTP/1.1 (1997)



&nbsp;It addressed many of the performance issues of its predecessor.



* Persistent Connections: The biggest improvement was the introduction of persistent connections. A single TCP connection could now be kept open and reused for multiple requests, drastically reducing the overhead of establishing a new connection for every file.



* Pipelining: This feature allowed multiple requests to be sent on the same connection without waiting for each response to arrive. However, it suffered from "head-of-line blocking," where if one request was delayed, all subsequent requests would be blocked.



* Caching: It introduced more robust caching mechanisms to reduce the need to re-request resources that haven't changed.



* ### HTTP/2 (2015)



* &nbsp;It was a binary protocol, unlike the text-based HTTP/1.x, which made it more efficient for computers to parse.



* Multiplexing: This is the most important feature of HTTP/2. It solved the head-of-line blocking problem by allowing multiple requests and responses to be sent simultaneously over a single TCP connection.





* Header Compression: To reduce overhead, HTTP/2 compressed redundant request headers, which often contain similar information.



* Server Push: A server could "push" resources to a client's cache before they were explicitly requested, proactively reducing latency.



* HTTPS Adoption: While not mandatory, all major browsers only support HTTP/2 over HTTPS, which spurred widespread adoption of secure connections.





* ### HTTP/3 (2022)





* HTTP/3 is the latest major revision, addressing the final shortcomings of HTTP/2. Its most significant change is the move from TCP to a new transport protocol called QUIC (Quick UDP Internet Connections), which is built on top of UDP.



* Elimination of Head-of-Line Blocking: While HTTP/2 solved application-level head-of-line blocking, TCP itself could still cause it at the transport layer. A single lost packet could block all concurrent streams on a TCP connection. QUIC, by using UDP, eliminates this, as each stream is independent.



* Faster Connection Establishment: QUIC combines the TCP handshake and TLS handshake into a single round-trip, significantly reducing the time it takes to establish a secure connection. For returning visitors, it can even achieve a zero round-trip time (0-RTT).



* Connection Migration: QUIC allows a client to maintain its connection even when its IP address or network changes (e.g., switching from Wi-Fi to cellular data), which is a huge benefit for mobile devices.
