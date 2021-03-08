# Asuna

Asuna is an open-source building management system.

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

## Implementation of the Front-End System

Below table is used as a guide for the Front-End System.

|             Pages             | hasRoute? | hasBeenDesigned? |                                 routeName                                 |
|:-----------------------------:|:---------:|:----------------:|:-------------------------------------------------------------------------:|
|            Homepage           |     ✔️     |         ✔️        |                                    `/`                                    |
|             Login             |     ✔️     |         ✔️        |                                  `/login`                                 |
|            Register           |     ✔️     |         ✔️        |                                `/register`                                |
|          User Profile         |     ✔️     |         ✔️        |                                 `/profile`                                |
|         List of Rooms         |     ✔️     |         ✔️        |                                  `/rooms`                                 |
|          Detail Room          |     ✔️     |         ✔️        |                               `/rooms/:slug`                              |
|         Admin Homepage        |     ✔️     |         ✔️        |                                  `/admin`                                 |
|     Admin: See All Orders     |     ✔️     |         ✔️        |                              `/admin/orders`                              |
|     Admin: Accept Visitors    |     ✔️     |         ✔️        |                             `/admin/visitors`                             |
| Owner: Create & Edit Entities |     ✔️     |         ✔️        | `/admin/entities/create/:entity-name` `/admin/entities/edit/:entity-name` |
|      Owner: See Earnings      |     ✔️     |         ✔️        |                             `/admin/earnings`                             |
|    Owner: List of Entities    |     ✔️     |         ✔️        |                       `/admin/entities/:entity-name`                      |

Hopefully, the table will be all green soon.

## Minor Implementations

- CSS Reset
- Fonts
- Dark Mode Support
- SEO
- Asynchronous Font Loading
- Logo and Favicon
- Refactor and Split
- Error Pages
- React Context
- Color the Header and Footer
- `useMemo`, `useEffect`, SSR, CSR
- Query string masking in `NextLink`
- Seed more data

## Presentation Material

- Section I: Introduction (2 mins.)
- Introduction
- Problem
- Asuna: The Building Management System
- Section II: Architecture (3 mins.)
- Technology Stack
- Client-Server Architecture
- Asynchronous JavaScript Demo
- CI/CD Explanation
- Section III: Features (5 mins.)
- Entities, Why Denormalize Database, Explain Features
- QoL Features
- Section IV: Demo (15 mins.)
- Section V: Thoughts (5 mins.)
- Further Development
- Q&A
- Closing

## QoL Features

- NProgress
- ScrollPreserver
- Personal and secure authentication with `httpOnly` / `sameSite` cookies and JWT
- `a11y` support
- SSR / SSG

## License

MIT License.
