# Asuna

Asuna is an open-source building management system. This full-stack web application is open-source, under MIT License.

## Introduction

Coworking space is one of the newest business trends in Indonesia and Asian countries in general (Bouncken, 2016). One of the most important metric that we have to understand in order for these kinds of business to flourish is the community of the coworking space. People enjoy coworking spaces with great facilities and good communities (Seo, 2017). If handled correctly, coworking space could make people feel connected to one another and cause them to enjoy the environment, and even create new social circles along the way (Bianchi, 2018).

If I recall correctly, there have not been a single application to manage these coworking spaces with extremely flexibility. In this application, flexibility means the ability for one to create _n_ rooms and floors, where _n_ itself means infinite. In short, this application is an open-source building management system that allows one to create infinite number of rooms and floors for their own buildings. Users of this application could also place their orders online, shall this application comes to the production version.

This application is built with performance and scalability in mind.

## Architecture

- JavaScript (main programming language)
- Next.js (front-end)
- Chakra UI (front-end framework)
- Express.js (back-end)
- MongoDB (database)
- Vercel (front-end hosting)
- Heroku (back-end hosting)
- MongoDB Atlas (database on cloud)

## Features

- Simple, colorful, but intuitive UI.
- Ability to create infinite amount of rooms and floors. Only your database limits these features.
- Users can book a room, edit their own profile, and see their transactions.
- Multiple role support: `user`, `admin`, `owner`.
- Admins can perform CRUD operations on floors, rooms, employees.
- Admins can see the earnings of the lifetime of this application.
- Admins can create visitors via an interface in the admin panel.
- Admins can create vouchers via API endpoints.
- Dark mode support for the front-end.
- High-performance support with preloaded pages, and caching.
- Server-side rendering support for pages requiring authentication.
- API-proxy via Next.js's serverless functions to provide extended security.
- Personal and secure authentication with httpOnly / sameSite cookies and JWT.
- Accessibility support (`a11y`).

## Installation

To use this repository, both front-end and back-end must be active simultaneously.

```bash
git clone https://github.com/lauslim12/Asuna.git
cd Asuna
```

Then, we have to fill the environment variables for both `web` and `api`. For the `web`, the settings are as follows.

```bash
export JWT_COOKIE_EXPIRES_IN=<YOUR_VARIABLE>
export PRIVATE_API_URL=<YOUR_VARIABLE>
export NEXT_PUBLIC_API_URL=<YOUR_VARIABLE>
```

Alternatively, you can change the `.env.development` file and set the variables from there. Don't forget to rename it to `.env` so that it can be used.

For the `api`, the settings are as follows.

```bash
export CLIENT_SIDE_URL=...
export DATABASE_PASSWORD=
export DATABASE_LOCAL=
export DATABASE=
export JWT_SECRET=
export JWT_EXPIRES_IN=
export JWT_COOKIE_EXPIRES_IN=
```

Or, same as above, change the `.env.development` file and rename it to `.env`.

Then, we can simply just install the application.

```bash
npm install
```

Before starting our application, we migrate the database first.

```bash
npm run migrate
```

If the migration fails (usually because of the date validation), just change the date of the data whose schema fails. The error message should be clear enough.

Start our application. Remember we need two terminal processes!

```
# terminal 1
cd Asuna/web/
npm run dev

# terminal 2
cd Asuna/api
npm run dev
```

You're done!

## Deployment

Before doing this, ensure that the current working directory is `Asuna`. In order to deploy the back-end, do the following command.

```bash
git subtree push --prefix api heroku master
```

To deploy the front-end, do the following command.

```bash
npx vercel # preview mode
npx vercel --prod # production mode
```

To prevent spamming of emails, I did not set up a hook that would instantly perform deployment after merging to the remote repository.

## Contribution

I accept all kinds of contributions. Feel free to submit a pull request or submit an issue if you encounter any issues!

## License

This application is licensed under MIT License. Please see the `LICENSE` file for more information.

## Credits

- Federico Bianchi, N. C. (2018). Solidarity as a byproduct of professional collaboration: Social support and trust in a coworking space. Social Networks, 61-72.

- Jongseok Seo, L. L.-S. (2017). Priorities of Coworking Space Operation Based on Comparison of the Hosts and Users' Perspectives. Sustainability, 1-8

- Ricarda B. Bouncken, S. M. (2018). Coopetition in coworking-spaces: value creation and appropriation tensions in an entrepreneurial space. Review of Managerial Science Vol. 12, 385-410.

- Ricarda B. Bouncken, T. C. (2016). Coworking-spaces in Asia: A business model design perspective. SMS Special Conference Hong Kong, 1-9.
