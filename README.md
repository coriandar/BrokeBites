## BrokeBites
We understand that cooking your own meals might not always be feasible due to time constraints or lack of cooking facilities. That's why we've curated a selection of smart and pocket-friendly takeaway options from various restaurants that cater to students on a budget. Now you can enjoy a diverse range of flavors without the hassle of cooking!

Join the food-loving community and elevate your restaurant discovery experience. Download our app today and savor every moment of your culinary exploration. Your next delicious adventure is just a click away!

_Team project using SCRUM methodlogies for COMP602 Software Development Practice._

### Features
- __Account Signup:__ Unlock a world of culinary delights with a few taps. Create your personal account and get ready to embark on a gastronomic journey.
- __Interactive Restaurant Map:__ Explore your city like never before. Our interactive map reveals the best restaurants in your area, putting their locations at your fingertips.
- __Search and Save:__ Finding the perfect dining spot is a breeze. Use our powerful search tools to filter restaurants by cuisine, price, and more. Save your favorites to make your next dining experience even more effortless.
- __Reviews Restaurants:__ Share your culinary adventures with the world. Write and read insightful restaurant reviews from fellow foodies. Your opinions matter!
- __Social Media Features:__ Connect, engage, and share your foodie experiences with the community. With direct messaging, follows, and easy sharing, your food journey becomes a social adventure.
- __Premium-Only Features:__ Elevate your dining experience. Upgrade to our premium subscription for an ad-free journey through the world of flavors. Enjoy a seamless, distraction-free exploration of restaurants and cuisines.

--------------------------------------------------

## Contents
- [About][c.1]
- [Getting Started][c.2]
    - [Required][c.2.1]
    - [Required accounts][c.2.2]
    - [API keys][c.2.3]
    - [Firestore Database][c.2.4]
    - [Firestore Storage][c.2.5]
    - [Scraping Data][c.2.6]
- [Usage][c.3]
    - [Installation][c.3.1]
    - [Development Server][c.3.2]
    - [Production Server][c.3.3]
    - [Tests][c.3.4]
    - [Access][c.3.5]
- [Contributing][c.4]
    - [VSCode Setup][c.4.1]
- [Team][c.5]
- [License][c.6]

[c.1]: <https://github.com/coriandar/brokebites#brokebites>
[c.2]: <https://github.com/coriandar/brokebites#getting-started>
[c.2.1]: <https://github.com/coriandar/brokebites#required>
[c.2.2]: <https://github.com/coriandar/brokebites#required-accounts>
[c.2.3]: <https://github.com/coriandar/brokebites#api-keys>
[c.2.4]: <https://github.com/coriandar/brokebites#firestore-database>
[c.2.5]: <https://github.com/coriandar/brokebites#firestore-storage>
[c.2.6]: <https://github.com/coriandar/brokebites#scraping-restaurant-data>
[c.3]: <https://github.com/coriandar/brokebites#usage>
[c.3.1]: <https://github.com/coriandar/brokebites#installation>
[c.3.2]: <https://github.com/coriandar/brokebites#run-devevlopment-server>
[c.3.3]: <https://github.com/coriandar/brokebites#run-production-server>
[c.3.4]: <https://github.com/coriandar/brokebites#run-tests>
[c.3.5]: <https://github.com/coriandar/brokebites#access>
[c.4]: <https://github.com/coriandar/brokebites#contributing-current-devs-only>
[c.4.1]: <https://github.com/coriandar/brokebites#vscode-setup>
[c.5]: <https://github.com/coriandar/brokebites#team>
[c.6]: <https://github.com/coriandar/brokebites#license>

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

### API Keys
- Place API keys into `.env.local` file

```js
NEXT_PUBLIC_FB_API_KEY=""
NEXT_PUBLIC_FB_AUTH_DOMAIN=""
NEXT_PUBLIC_FB_PROJECT_ID=""
NEXT_PUBLIC_FB_STORAGE_BUCKET=""
NEXT_PUBLIC_FB_MESSAGING_SENDER_ID=""
NEXT_PUBLIC_FB_APP_ID=""
NEXT_PUBLIC_FB_MEASUREMENT_ID=""
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=""
```

### Firestore Database
```js
directMessageDB
reportDB
restaurantDB
reviewDB
userDB
userFeedDB
```

### Firestore Storage
```js
avatar/
```

### Scraping restaurant data
- Use Apify `Google Maps Scraper`.
- Filter and clean data as appropriate.

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