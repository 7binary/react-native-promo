# ENV
- `env:local` env берется из `env/local.json`,
    когда API подняли на локалке c localtunnel через `yarn api`
- `env:dev` env берется из `env/dev.json` для dev-сервера
- `env:prod` env берется из `env/prod.json` для prod-сервера

# ANDROID
- `android` для запуска Android-приложения на подключенном
    эмуляторе или телефоне
- `android:local` запуск Android с env:local
- `android:dev` запуск Android с env:local
- `android:prod` запуск Android с env:local
- `android:build` собрать Android в .aab-бандл `/builds/release.aab`,
    пригодный для дальнейшей загрузки в PlayMarket
- `android:build:run` запуск собранного выше .aab на подключенном по
    USB-проводу Android-девайсе - нужно для отладки собранного пакета
- `android:apk` собрать .apk-файл `/builds/demo.apk` с dev-окружением,
    который затем можно передать менеджеру на установку и тестирование
- `android:clean` очистка кэша Gradle перед запусками Android
- `android:wrapper` подготовка Gradle к работе с проектом
- `android:prepare` подготовка Android-проекта к работе после клонирования,
    вызывается разок при изначальной установке проекта на локалке
- `android:perm` выдача прав на исполняемый Gradle файл
- `android:kill` завершить работу запущенного эмулятора Android
- `android:codepush` запустить CodePush на устройства Android
- `android:codepush:gen` сгенерировать ключ для CodePush Android

# iOS
- `ios:codepush` запустить CodePush на устройства iOS
- `ios:codepush:gen` сгенерировать ключ для CodePush iOS
- `iox` запуск iOS на симуляторе телефона большой диагонали
- `ios` запуск iOS на симуляторе телефона малой диагонали
- `ios:local` запуск iOS c env:local
- `ios:dev` запуск iOS c env:dev
- `ios:prod` запуск iOS c env:prod
- `ios:pod` установка POD-зависимостей через CocoaPods
- `ios:prepare` подготовка iOS-проекта к работе после клонирования,
    вызывается разок при изначальной установке проекта на локалке
- `ios:devices` список доступных симуляторов
- `ios:derived` удаление кэша симуляторов, если ругается консолька
- `start` стартуем Metro (сборщик JS-bundler), запускаем в отдельном
    терминале перед запуском Android/iOS эмуляторов

# UTILS
- `test` запуск тестов JEST по снапшотам из `/__tests__`
- `test:u` запуск тестов с перезатиранием снапшотов
- `test:c` очистка кэша JEST
- `lint` проверить код на ошибки линтером ESLint
- `postinstall` список команд на выполнение после установки пакетов NPM
    `/node_modules`
- `postfix:firebase` фикс на открытие PUSH-уведомлений
- `api` проброс локалки localhost во внешний мир через localtunnel
    `> npm i -g localtunnel`
- `rename` переименовать название приложения и пакет
    `> npm i -g react-native-rename`
- `fkill` на Windows убивает процессы Node/Java, которые порой блокируют
    запуск RN `> npm i -g fkill-cli`
- `reinstall` переустановить пакеты NPM
- `i` установить пакеты NPM
