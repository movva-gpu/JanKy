import readline from 'readline';
import kleur from 'kleur';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// const welcome = (): void => {
//     console.log(kleur.cyan('Welcome to JanKy!'));
//     console.log(kleur.cyan('Please enter your project name:'));
//     process.stdout.write(kleur.cyan('> '));
// };

const welcomeQuestion = kleur.cyan(
  '-  Welcome to JanKy!\n\n' +
    '*  Please enter your project name:\n' +
    '|\n' +
    '|> '
);

const abortController = new AbortController();
const abortSignal = abortController.signal;

rl.question(welcomeQuestion, { signal: abortSignal }, answer => {
  rl.close();
  const projectName = answer.trim();
  console.log(kleur.cyan('|\n' + `|  Creating project "${projectName}"...`));
  // TODO: Continue with the rest of the steps.
});

rl.once('SIGINT', () => {
  const confirmQuestion = kleur.cyan(
    "*  You're sure you want to exit?\n" + '|\n' + '| (Y/n) >  '
  );
  const confirmRl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  abortController.abort('keyboardInterupt');

  confirmRl.question(confirmQuestion, answer => {
    switch (answer) {
      case 'n':
        // TODO go back
        break;

      case 'Y':
      case '':
        process.stdout.write(kleur.cyan('|\n' + '| Exiting...'));

        confirmRl.close();
        rl.close();
        process.exit(0);
    }
  });
});
