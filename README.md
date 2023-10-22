# uEvent

[![Version](https://img.shields.io/static/v1?label=version&message=1.0.0&color=blue)](https://shields.io/)
[![NPM](https://img.shields.io/static/v1?label=npm&message=8.11.0&color=blue)](https://shields.io/)
[![NODE](https://img.shields.io/static/v1?label=node&message=18.12.1&color=success)](https://shields.io/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://shields.io/)

### [📹 Demo Video]([https://www.youtube.com/watch?v=qUWUdwBCEuE](https://youtu.be/kY6GTQ9buk8?si=M_nshosPW7SZcipf))

This Git repository houses 'uevent,' a platform designed for creating, promoting, and attending events. Users can effortlessly organize their events or discover and participate in others' gatherings, all within a user-friendly interface.

![Tech Stack](https://github-readme-tech-stack.vercel.app/api/cards?title=Tech+Stack&align=center&titleAlign=center&lineCount=2&width=550&hideBg=true&bg=%230D1117&badge=%23161B22&border=%2321262D&titleColor=%2358A6FF&line1=react%2Creact%2Cc259dc%3Btailwindcss%2Ctailwindcss%2C82c046%3B&line2=next.js%2Cnext.js%2C169bf6%3Bmongodb%2Cmongodb%2Ca9bfde%3Bpostman%2Cpostman%2C605aff%3B)

## Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/nickmazurenko/uevent.git`
2. Navigate to the project directory: `cd uevent`
3. Install dependencies: `npm install`

## Usage

First make sure you filled the .env file using .env.example
Mongodb database url is mandatory.
Push the databse using prisma

```
npx prisma generate
```
```
npm prisma db push
```

To start the development server, run the following command:

```
npm run dev
```

This will start the server at http://localhost:3000.

## Features

- User authentication and authorization
- Pages localization (en/uk)
- Organization creation and management
- Event search and filtering
- Ticket purchasing and management
- Custom Ticket Building
- News article creation and management

# Demo

![image](https://github.com/nickmazurenko/uevent/assets/48516366/1c5663d8-f758-4816-a637-ad1fbb629ddc)
![image (1)](https://github.com/nickmazurenko/uevent/assets/48516366/0e24505e-9e86-4af2-9a86-753eeabe0323)
![image (2)](https://github.com/nickmazurenko/uevent/assets/48516366/cea5e499-297e-4a5c-8e95-2e92108151df)


## Contributing

We welcome contributions to the Gatherwise project! To contribute, follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b my-new-feature`
3. Make changes and commit them: `git commit -m "Add my new feature"`
4. Push to the branch: `git push origin my-new-feature`
5. Create a pull request

Please ensure that your code follows our coding standards and includes appropriate tests.

## Credits

- [Tailwind CSS](https://tailwindcss.com/)
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
