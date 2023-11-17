/**
 * Simplified HTTP request class using the fetch API. 
 * The class contains get, post, put, and delete methods.
 * When a request is called, the class first identifies the error state of the response from the server.
 * If there is no error, the class content data member becomes the server response body.
 * If there is an error, the class content data member becomes an error message containing the response status.
 * 
 * Data members:
 * error: Boolean value which contains the error state of the current request.
 * content: String value containing the response from the server or an error message if the request failed.
 */
class coreHTTP {

  async get(url) {

    // I noticed that get requests act strange when no URL is provided. I had to create my own error message for this.
    if (url !== "") {

      // Get request...
      let response = await fetch(url);
      
      // Check if there was an error with the request.
      if (response.ok) {

        // Content is set to the response from the server. No error.
        this.error = false;
        this.content = await response.text();
        
      }
      else {

        // If there is an error, an error message is created as content.
        this.error = true;
        this.content = `Error: [Status: ${response.status}]`;
      }
    }
    else {

      // If there is an error, an error message is created as content.
      this.error = true;
      this.content = `Error: No URL provided.`;
    }
  }

  async post(url, data) {

    // Post request...
    let response = await fetch(url, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: data
    });

    // Check if there was an error with the request.
    if (response.ok) {

      // Content is set to the response from the server. No error.
      this.error = false;
      this.content = await response.text();
    }
    else {

      // If there is an error, an error message is created as content.
      this.error = true;
      this.content = `Error: [Status: ${response.status}]`;
    }
  }

  async put(url, data) {

    // Put request...
    let response = await fetch(url, {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: data
    });

    // Check if there was an error with the request.
    if (response.ok) {

      // Content is set to the response from the server. No error.
      this.error = false;
      this.content = await response.text();
    }
    else {

      // If there is an error, an error message is created as content.
      this.error = true;
      this.content = `Error: [Status: ${response.status}]`;
    }
  }

  async delete(url) {

    // Delete request...
    let response = await fetch(url, {
      method: "DELETE"
    });

    // Check if there was an error with the request.
    if (response.ok) {

      // Content is set to the response from the server. No error.
      this.error = false;
      this.content = await response.text();
    }
    else {

      // If there is an error, an error message is created as content.
      this.error = true;
      this.content = `Error: [Status: ${response.status}]`;
    }
  }
}
