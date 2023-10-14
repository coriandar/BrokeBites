## BrokeBites
Are you a student on a tight budget, tired of surviving on instant noodles and microwave dinners? Say hello to BrokeBites, your ultimate go-to resource for delicious, pocket-friendly, and convenient takeaway options! We understand the struggles of being a student and how challenging it can be to find affordable yet flavourful meals. That's why we're here to help you eat well without breaking the bank, by exploring budget-friendly food choices from restaurants around you.

_Team project using SCRUM methodlogies for COMP602 Software Development Practice._

--------------------------------------------------

## Getting Started
### Required
- `Node.js ^18.17.1 LTS`

### Required accounts
- [Firebase Auth][1.1]
- [Firebase Firestore][1.2]
- [Firebase Storage][1.3]
- [Stripe][1.4]
- [Apify][1.5]

[1.1]: <https://firebase.google.com/products/auth>
[1.2]: <https://firebase.google.com/products/firestore>
[1.3]: <https://firebase.google.com/products/storage>
[1.4]: <https://stripe.com>
[1.5]: <https://apify.com>

### API Key
- Place API keys into `.env.local` file

```js
NEXT_PUBLIC_FB_API_KEY=""
NEXT_PUBLIC_FB_AUTH_DOMAIN=""
NEXT_PUBLIC_FB_PROJECT_ID=""
NEXT_PUBLIC_FB_STORAGE_BUCKET=""
NEXT_PUBLIC_FB_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FB_APP_ID=""
NEXT_PUBLIC_FB_MEASUREMENT_ID=""
// stripe API
```

### Firestore Databases
```js
bugDB
feedbackDB
restaurantDB
reviewDB
userDB
```

### Firestore Storage
```js
avatar/
```

### Scraping restaurant data
- Use Apify `Google Maps Scraper`.
- Filter and clean data as appropriate.
- Format data with `/src/util/cleanData.js`

```js
cd src/util
node ./formatData.js
```

--------------------------------------------------

## Usage
### Installation
```js
npm i
```

### Run devevlopment server
```js
npm run dev
```

### Run production server
```js
npm run build
npm run start
```

### Run tests
```js
npm test // run test suite
npm test -t "testName" // run specific test
```

### Access
```js
http://localhost:3000
```

--------------------------------------------------

## Contributing (Current devs only)
- Pull requests are required.
- Please make sure to follow code formatting.
- Please make sure to update tests as appropriate.
- Development of this project will end at the end of semester.

### VSCode Setup
1. Install `Prettier`.
2. Install `Tailwind CSS IntelliSense`.
3. `ctrl + shift + p`, "User Settings (JSON)".
4. Replace everything in `settings.json` with:
```json
{
    "workbench.colorTheme": "Default Dark Modern",
    "workbench.startupEditor": "none",
    "prettier.tabWidth": 4,
    "editor.formatOnSave": true,
    "[javascriptreact]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[javascript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    }
}
```

--------------------------------------------------

## Team

| Name      | GitHub            | Role                      |
|:----------|:------------------|:--------------------------|
| Jamie C   | [Jarcino][2.1]    | Developer                 |
| Jamie L   | [lleejamiee][2.2] | Scrum Master / Developer  |
| Michael S | [mnymkz][2.3]     | Developer                 |
| Will B    | [nhh8869][2.4]    | Developer                 |
| Tony Y    | [coriandar][2.5]  | Product Owner / Developer |

[2.1]: <https://github.com/Jarcino>
[2.2]: <https://github.com/lleejamiee>
[2.3]: <https://github.com/mnymkz>
[2.4]: <https://github.com/nhh8869>
[2.5]: <https://github.com/coriandar>

--------------------------------------------------

## License
- [GNU General Public License v3.0](https://github.com/coriandar/BrokeBites/blob/main/LICENSE)

--------------------------------------------------