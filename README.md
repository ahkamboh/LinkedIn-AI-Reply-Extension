# LinkedIn AI Reply

LinkedIn AI Reply is a browser extension built with WXT, React, and TypeScript that enhances your LinkedIn messaging experience by providing AI-powered message suggestions and editing capabilities.

## video demo


## Features

- **AI-Powered Replies**: Generates contextual message suggestions for LinkedIn conversations.

## Tech Stack

- **WXT**: Web Extension Framework for streamlined extension development.
- **React**: For building responsive user interface components.
- **TypeScript**: Ensures type-safe JavaScript development.
- **Tailwind CSS**: For styling the extension UI.

## Installation

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Use `npm run dev` for development mode or `npm run build` for production build.

## Usage

1. Open a LinkedIn message conversation.
2. Click the edit icon that appears in the message box.
3. Enter your prompt in the modal.
4. Click "Generate" to receive AI-suggested replies.
5. Use "Regenerate" for alternative suggestions.
6. Click "Insert" to add the selected message to your LinkedIn conversation.

## Development

- `content.ts`: Main content script injecting functionality into LinkedIn pages. (use mix of taiwlind and inline css because of compatibility issues and cross origin policy)
- React components for the UI, including the modal and message generation interface.

## License

This project is licensed under the MIT License.

