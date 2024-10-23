import readline from "readline";

const helpMessage =
  "Press\n - 'q' to quit\n - 'r' to reload server\n - 'h' for help\n - 'c' to clear console";
const terminalDevHelper = (onReload: () => void) => {
  console.log(helpMessage);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  process.stdin.setRawMode(true);

  process.stdin.on("data", (key) => {
    // Clear the current line and move the cursor to the start
    process.stdout.write("\x1B[2K\x1B[1G"); // ANSI escape codes to clear the line and move the cursor to the start

    switch (key.toString()) {
      case "h":
      case "H":
        console.log(helpMessage);
        break;
      case "q":
      case "Q":
        console.log("Exiting...");
        process.exit(0); // Exit the application
        break;
      case "r":
      case "R":
        console.log("Reloading server...");
        onReload();
        break;
      case "c":
      case "C":
        console.clear();
        console.log(helpMessage);

        break;

      default:
        console.log(
          `You pressed: ${key.toString()}. Press 'h' for help or 'q' to quit.`
        );
        break;
    }
  });
};

export default terminalDevHelper;
