# Asuna

Asuna is an open-source building management system.

## Available Routes

- `/`, showcases the homepage.
- `/rooms`, showcases all rooms.
- `/profile`, showcases personal profile.
- `/rooms/:slug`, showcases a single room.
- `/login`, shows the login form.

## How to Use

To use this repository, both front-end and back-end must be active simultaneously.

```bash
git clone https://github.com/lauslim12/Asuna.git
cd Asuna
```

Fill the environment variables in both `web` and `api`.

Then, run both front-end and back-end with two terminals.

```bash
# terminal 1
cd Asuna/web/
npm run dev

# terminal 2
cd Asuna/api
npm run dev
```

If necessary, run `npm run migrate` in the `api` folder first.

Happy coding!

## Development Notes - Deployment Guidelines

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

## Route To Implement

- `/admin`, to access the admin panel.
- `/admin/orders`, to see all pending orders.
- `/admin/visitor`, to create a new booking for a visitor.
- `/admin/earnings`, to check for earnings.
- `/admin/{employees,floors,rooms}/`, to show all entities and their data.
- `/admin/{employees,floors,rooms}/edit`, to edit all of the entities.
- `/admin/{employees,floors,rooms}/create`, to create all entities.
- `/register`, shows the registration form.

## QoL Features

- NProgress
- ScrollPreserver
- Personal and secure authentication with `httpOnly` / `sameSite` cookies and JWT

## License

MIT License.
