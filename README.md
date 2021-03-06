
# Harley
v. 3.0.0
***
## Початок роботи
1. Склонуйте репозиторій;
2. Встановіть npm пакети; команда - `npm install`;
3. Встановіть bower компоненти, команда - `bower install`;
4. Збудуйте проект, команда - `gulp`.
5. Запустіть сервіс монги

***
### Back-end
## Файли запуску
- `app.js` - файл запуску веб серверу
- `getData.js` - запускає cron задачу для збору та обробки даних з веб сервісів

## Конфігураційні файли
`/config/config.json`
 - cities - масив об'єктів які містять в собі назву міста для різних сервісів та координати
 - services - масив з налаштуваннями сервісу:
    - name - назва сервісу   
    - urlPart1 - перша складова посилання до АРІ
    - urlPart2 - друга складова посилання до АРІ
    - variables - масив зі змінними необхідними для коректної обробки даних сервісу

`/config/pathConfig.json` - конфігураційний файл з назвами колекцій та БД необхідних для роботи програми
`/config/settings.json` - основні налаштування програми
 
 
## Основні роути:
- `/weather/v01/current` - повертає масив об'єктів, які містять в собі інформацію про погоду з останнього зняття показників, з усіх зазначених у конфігураційному файлі містах. <b>При не доступності бази повертається мок даних back_end/data/common_data.json</b>
- `/weather/v01/statistic/day` - Данні статистики за день зазначений у додатковому параметрі. <b>При не доступності бази повертається мок даних back_end/data/statisticMock.json</b>
- `/weather/v01/stat/service-by-city/day` - Данні статистики за день що шукаємо по кожному сервісу та місту, для формування порівняльної статистики. <b>При не доступності бази повертається мок даних back_end/data/statisticMock.json</b>

- `/weather/v01/settings` - поветає налаштування програми
- `/weather/v01/configs` - повертає налаштування конфіігураційного файла weather API

## Вирішення типових проблем
- Якщо після виконання команди `bower install` в консолі пише що *bower* не знайдено потрібно встановити його глобально на Ваш ПК. команда - `npm install bower -g`, або запустіть bower безпосередньо з папки де він знаходиться `node_modules/.bin/` та знову введіть `bower i`
- Якщо після виконання команди `gulp` в консолі пише, що *gulp* не знайдено потрібно встановити його глобально. команда - `npm install gulp -g`

## Відновлення БД з дампу
- mongorestore --db database_name path_to_bson_file

### How To
- Запускаем командную строку от администратора
- Переходим в папку C:\Program Files\MongoDB\Server\3.4\bin\
- Windows - Вводим команду mongorestore.exe --db weatherProject D:\git\Harley\dump\weatherProject (пример пути)
- Windows - Вводи команду mongorestore.exe --db Weather_Statistics D:\git\Harley\dump\Weather_Statistics (пример пути)
- Linux - Вводим команду в терминале `mongorestore -d weatherProject /home/`username`/git/Harley/dump/weatherProject` (пример пути)
- Linux - Вводим команду в терминале `mongorestore -d Weather_Statistics /home/`username`/git/Harley/dump/Weather_Statistics` (пример пути)
- Linux - Удаление БД `mongo <dbname> --eval "db.dropDatabase()"`
- Для визуального представления БД юзайте [Compass](https://drive.google.com/open?id=0B6Bti9TG7cUpTU5yM1VBMm1Fc2c)

### Angular leaflet
Документація з приклади: [link](http://tombatossals.github.io/angular-leaflet-directive/examples/0000-viewer.html#/markers/popup-example)
### Angular Chart.js
Документація з прикладами: [link](http://jtblin.github.io/angular-chart.js/)