import express from "express";

const app = express();

app.get("/", (_req, res) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  const todos = ["Buy milk", "Write code", "Exercise"];
  res.write(JSON.stringify(todos));

  res.end();
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
