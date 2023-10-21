## BrokeBites
We understand that cooking your own meals might not always be feasible due to time constraints or lack of cooking facilities. That's why we've curated a selection of smart and pocket-friendly takeaway options from various restaurants that cater to students on a budget. Now you can enjoy a diverse range of flavors without the hassle of cooking!

Join the food-loving community and elevate your restaurant discovery experience. Download our app today and savor every moment of your culinary exploration. Your next delicious adventure is just a click away!

_Team project using SCRUM methodlogies for COMP602 Software Development Practice._

### Features
- Account Signup: Create accounts with personal information and login credentials.
- Interactive Restaurant Map: Displays nearby restaurants and their locations.
- Search and Save: Quickly search for restaurants with various filters (e.g., cuisine, prices), and save your favourites.
- Reviews Restaurants: Write reviews for the restaurants.
- Social Media Features: Enhance social interaction with features like direct messaging, follow, and shares.
- Premium-Only Features: Ad-free experience for premium subscribers.

- Account Signup: Unlock a world of culinary delights with a few taps. Create your personal account and get ready to embark on a gastronomic journey.
- Interactive Restaurant Map: Explore your city like never before. Our interactive map reveals the best restaurants in your area, putting their locations at your fingertips.
- Search and Save: Finding the perfect dining spot is a breeze. Use our powerful search tools to filter restaurants by cuisine, price, and more. Save your favorites to make your next dining experience even more effortless.
- Reviews Restaurants: Share your culinary adventures with the world. Write and read insightful restaurant reviews from fellow foodies. Your opinions matter!
- Social Media Features: Connect, engage, and share your foodie experiences with the community. With direct messaging, follows, and easy sharing, your food journey becomes a social adventure.
- Premium-Only Features: Elevate your dining experience. Upgrade to our premium subscription for an ad-free journey through the world of flavors. Enjoy a seamless, distraction-free exploration of restaurants and cuisines.

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
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=""
```

### Firestore Databases
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