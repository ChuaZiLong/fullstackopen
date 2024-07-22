sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note (URL Redirect)
    activate server
    server-->>server: HTML document
    server->>server: GET https://studies.cs.helsinki.fi/exampleapp/note
    server-->>browser: new note
    server->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server-->>browser: the JSON payload
    Note right of browser: The browser executes the callback function that renders the notes
    server->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server-->>browser: the JavaScript file
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    server->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    server-->>browser: the css file
    deactivate server