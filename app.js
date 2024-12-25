const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const port = 3000;

// Создаем подключение к базе данных SQLite
const db = new sqlite3.Database("charactersGenshin.db");

// Для обработки JSON-ответов
app.use(express.json());
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "images")));

// Эндпоинт для получения персонажей
app.get("/characters", (req, res) => {
  // SQL-запрос для получения данных из таблицы
  db.all(
    "SELECT id, name, region, weapon, element, stars FROM characters",
    [],
    (err, rows) => {
      if (err) {
        throw err;
      }
      // Отправляем данные в формате JSON
      res.json(rows);
    }
  );
});

app.get("/charactersHSR", (req, res) => {
  // SQL-запрос для получения данных из таблицы
  db.all(
    "SELECT id, name, element, path, stars FROM charactersHSR",
    [],
    (err, rows) => {
      if (err) {
        throw err;
      }
      // Отправляем данные в формате JSON
      res.json(rows);
    }
  );
});

app.get("/charactersZZZ", (req, res) => {
  // SQL-запрос для получения данных из таблицы
  db.all(
    "SELECT id, name, element, specification, fraction, stars FROM charactersZZZ",
    [],
    (err, rows) => {
      if (err) {
        throw err;
      }
      // Отправляем данные в формате JSON
      res.json(rows);
    }
  );
});

// Стартуем сервер
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
