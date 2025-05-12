const { spawn } = require("child_process");
const path = require("path");

const frontendPath = path.join(__dirname, "frontend");
const backendPath = path.join(__dirname, "backend");

const startBackend = () => {
  console.log("Запуск бекенду...");
  const backendProcess = spawn("npm", ["start"], { cwd: backendPath, shell: true });

  backendProcess.stdout.on("data", (data) => {
    console.log(`Бекенд: ${data}`);
  });

  backendProcess.stderr.on("data", (data) => {
    console.error(`Помилка бекенду: ${data}`);
  });

  backendProcess.on("close", (code) => {
    console.log(`Процес бекенду завершився з кодом: ${code}`);
  });

  return backendProcess;
};

const startFrontend = () => {
  console.log("Запуск фронтенду...");
  const frontendProcess = spawn("npm", ["run", "dev"], { cwd: frontendPath, shell: true });

  frontendProcess.stdout.on("data", (data) => {
    console.log(`Фронтенд: ${data}`);
  });

  frontendProcess.stderr.on("data", (data) => {
    console.error(`Помилка фронтенду: ${data}`);
  });

  frontendProcess.on("close", (code) => {
    console.log(`Процес фронтенду завершився з кодом: ${code}`);
  });

  return frontendProcess;
};

const main = () => {
  const backendProcess = startBackend();
  const frontendProcess = startFrontend();

  const handleExit = () => {
    console.log("Зупинка всіх процесів...");
    backendProcess.kill();
    frontendProcess.kill();
    process.exit();
  };

  process.on("SIGINT", handleExit);
  process.on("SIGTERM", handleExit);
};

main();