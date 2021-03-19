Клонирование проекта RN PromoCase
***
1. Берем папку `reactnative` проекта PromoCase, удаляем из нее `node_modules`,
   переносим в новый проект
2. Переименовываем приложение.
    - Устанавливаем локально утилитку для переименования `$ npm i -g react-native-rename`
    - В файле `package.json` корректируем скрипт `rename`, указывая новое название приложения
      и имя пакета, скажем, Alpha и com.pmk.alpha
    - Запускаем переименование из папки reactnative: `$ yarn rename`
3. Регистрируем PUSH.
    - Заводим проект в `console.firebase.google.com` с аккаунта `sergey.knomyanin@gmail.com`
    - Заводим Android-приложение, скачиваем `google-services.json` и кладем
      в `/android/src/google-services.json`
    - Заводим iOS приложение, скачиваем `GoogleService-Info.plist` и кладем
      в `/ios/GoogleService-Info.plist`
    - В админке сайта заходим в `PUSH и мобильные > Настройки`, там
    - прописываем ключ Firebase
4. iOS.
    - Для iOS иконки подготавливаем непрозрачный файл `icon_1024_white.png`, кладем в `/icons`
    - Устанавливаем на MacOS прогу `Icon set creator.app`, запускаем, выбираем файл
      `icon_1024_white.png` и генерируем иконки
    - Кладем иконки полученные в `/ios/ProjectName/Images.xcassets/AppIcon.appiconset`
    - Из папки reactnative ставим npm-пакеты
    - Из папки reactnative запускаем POD-установку `$ yarn ios:pod`
    - Открываем проект в XCode на папке `/ios/ProjectName.xcworkspace`,
      выставляем версию проекта 1.0.0, проверяем название приложения
5. Android.
    - Для Android иконки подготавливаем прозрачный файл `icon_1024.png`, кладем в `/icons`
    - Открываем AndroidStudio на папке проекта `/android` и дожидаемся индексации файлов
    - Переходим в `Android view > app > New > Image Asset` и генерируем иконки с
      файла `icon_1024.png`
6. Меняем настройки API в файлах `/src/env/*.json` и цветовой схемы
   в файле `/src/env/init-settings.ts`
7. Меняем настройки CodePush.
    - В файле `package.json` необходимо в поле `name` вписать новое
      название приложения, например `ProjectName`, тут же обновить
      скрипты `:codepush`, заменив `PromoCase` на `ProjectName`
    - Зайти на `https://appcenter.ms/apps` с учетки
      `sergey.knomyanin@gmail.com`, завести проекты
      Android/ReactNative с названием `ProjectName-android`
      и iOS/ReactNative с названием `ProjectName-ios`
    - Вызываем скрипт генерации ключа Android:
      `> yarn android:codepush:gen`, полученный ключ вставить заместо
       прежнего в файл `/android/src/main/res/values/strings.xml`
    - Вызываем скрипт генерации ключа iOS:
      `> yarn ios:codepush:gen`, полученный ключ вставить заместо
       прежнего в файл `/ios/ProjectName/Info.plist`

