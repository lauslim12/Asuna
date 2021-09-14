# Contributing

This application is completely open source and contribution to this tool is highly encouraged for everyone! If you have found any issues during your usage of this program, please submit an issue and I'll go back to you right away.

In order to contribute to this project as a programmer, please follow these style guide and workflow.

## Coding Style Guide

Please follow this for the sake of the code to be as readable and maintainable as possible.

- **_Use your best spelling and punctuation, in English._**
- Before you submit your pull request, ensure that you run the following procedures.

```bash
yarn lint # for both 'api' and 'web'!
```

## Commit Style Guide

Please use [Semantic Commit Messages](https://seesparkbox.com/foundry/semantic_commit_messages), but with the first letter capitalized. For further details, please check [this gist](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716) and this [website](https://www.conventionalcommits.org/en/v1.0.0/). Using these kinds of commit messages will make contributors into better programmers because of its rigid style. Another reason of using it is because its rigid style actually forces contributors to **not commit lots of files in one setting.**

## Workflow

In order to contribute to this project, please create an issue about the problem that you are going to fix / add. After that, follow these instructions below.

- Fork the repository.
- Create a new branch based on the issue number that you created beforehand. Example: `git checkout -b issue-10`.
- Make sure to update the `CHANGELOG.md`, and the version number in `package.json`.
- Commit and push your features / changes.
- Create a new pull request.
