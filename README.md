# Simple Key Value Pair

This application demonstrates the use of Secure Storage's Key Value Pair interface to store simple key-value pair data.

Tab 1 allows users to enter keys and value.
Tab 2 displays them all.
This demo does not currently implement a way to remove a key.

## Building

You need to have a key in a `.nmprc` file that gives you access to `@ionic-enterprise/identity-vault` and `@ionic-enterprise/secure-storage` in order to build and run this demo.

- `git clone` && `cd`
- copy in your own `.nmprc` file to the root of the project
- `npm i`
- ` npm start`

To run on a device:

- ` npm run build`
- `npx cap open ios` and/or `npx cap open android`

Have a lot of fun! 🤓
