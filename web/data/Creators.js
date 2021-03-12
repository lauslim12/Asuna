import {
  SiAboutDotMe,
  SiAdobe,
  SiGithub,
  SiLinkedin,
  SiMongodb,
  SiNextDotJs,
  SiNodeDotJs,
  SiStackoverflow,
} from 'react-icons/si';

const Creators = [
  {
    id: 1,
    name: '👩‍💻 Nicholas Dwiarto Wirasbawa',
    description:
      'Nicholas is a software engineer specializing in multiple fields. Follow him in GitHub, LinkedIn, StackOverflow, or his personal website!',
    contacts: [
      {
        name: "Nicholas's GitHub",
        icon: SiGithub,
        link: 'https://github.com/lauslim12',
      },
      {
        name: "Nicholas's LinkedIn",
        icon: SiLinkedin,
        link: 'https://www.linkedin.com/in/nicholasdwiarto/',
      },
      {
        name: "Nicholas's StackOverflow",
        icon: SiStackoverflow,
        link: 'https://stackoverflow.com/users/13980107/nicholas-d',
      },
      {
        name: "Nicholas's Website",
        icon: SiAboutDotMe,
        link: 'https://nicholasdw.com',
      },
    ],
    technologies: [SiNextDotJs, SiNodeDotJs, SiMongodb],
  },
  {
    id: 2,
    name: '🎨 M. Dzulfiqar Ramadhan W',
    description:
      'Dzulfiqar is a really cool artist with interesting front-end skills! Follow his work on GitHub and Instagram!',
    contacts: [
      {
        name: "Dzulfiqar's GitHub",
        icon: SiGithub,
        link: 'https://github.com/dzulfiqar12',
      },
    ],
    technologies: [SiAdobe],
  },
  {
    id: 3,
    name: '📄 Albert Kosasi',
    description:
      'Albert Kosasi is a very good technical writer with skills! Follow his work on GitHub, or Instagram!',
    contacts: [
      {
        name: "Albert's GitHub",
        icon: SiGithub,
        link: 'https://github.com/dzulfiqar12',
      },
    ],
    technologies: [SiAdobe],
  },
];

export default Creators;
