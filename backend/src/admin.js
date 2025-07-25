import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import sequelize from './database.js';
import { Order, Lot, Component, Review, Region, ReviewPhoto, AuctionLocation, Port } from './models/index.js';
import { ComponentLoader } from 'adminjs';

AdminJS.registerAdapter(AdminJSSequelize);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const componentLoader = new ComponentLoader();

const UserPhotoUpload = componentLoader.add('UserPhotoUpload', path.join(__dirname, './components/UserPhotoUpload.jsx'));
const LotPhotoUpload = componentLoader.add('LotPhotoUpload', path.join(__dirname, './components/LotPhotoUpload.jsx'));
const ReviewPhotoUpload = componentLoader.add('ReviewPhotoUpload', path.join(__dirname, './components/ReviewPhotoUpload.jsx'));
const MainDashboard = componentLoader.add(
  'MainDashboard',
  path.join(__dirname, './components/MainDashboard.js')
);

const publicUrl = process.env.NEXT_PUBLIC_URL;

const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: '/admin',
  branding: {
    companyName: 'Maks Auto - Авто з США',
    logo: '/public/logo.svg',
    favicon: '/public/favicon.ico',
    theme: {
      colors: {
        primary100: '#038405',
        primary80: '#038405',
        primary60: '#038405',
        primary40: '#038405',
        primary20: '#038405',
      },
    },
  },
  env: {
    PUBLIC_URL: publicUrl,
  },
  locale: {
    language: 'uk',
    availableLanguages: ['en', 'uk'],
    translations: {
      uk: {
        "actions": {
        "new": "Створити",
        "edit": "Редагувати",
        "show": "Переглянути",
        "delete": "Видалити",
        "bulkDelete": "Видалити всі",
        "list": "Список"
      },
      "buttons": {
        "save": "Зберегти",
        "addNewItem": "Додати новий елемент",
        "filter": "Фільтр",
        "filterActive": "Фільтр ({{count}})",
        "applyChanges": "Застосувати зміни",
        "resetFilter": "Скинути",
        "confirmRemovalMany": "Підтвердити видалення {{count}} запису",
        "confirmRemovalMany_plural": "Підтвердити видалення {{count}} записів",
        "logout": "Вийти",
        "login": "Увійти",
        "seeTheDocumentation": "Дивіться: <1>документацію</1>",
        "createFirstRecord": "Створити перший запис",
        "cancel": "Скасувати",
        "confirm": "Підтвердити",
        "contactUs": "Зв’язатися з нами"
      },
      "components": {
        "DropZone": {
          "placeholder": "Перетягніть файл сюди або натисніть для вибору",
          "acceptedSize": "Максимальний розмір: {{maxSize}}",
          "acceptedType": "Підтримується: {{mimeTypes}}",
          "unsupportedSize": "Файл {{fileName}} занадто великий",
          "unsupportedType": "Файл {{fileName}} має непідтримуваний тип: {{fileType}}"
        },
        "LanguageSelector": {
          "availableLanguages": {
            "en": "Англійська",
            "uk": "Українська",
          }
        },
        "Login": {
          "welcomeHeader": "Ласкаво просимо",
          "welcomeMessage": "до AdminJS — провідної open-source адмін-панелі для Node.js додатків, яка дозволяє керувати всіма даними в одному місці",
          "properties": {
            "email": "Електронна пошта",
            "password": "Пароль"
          },
          "loginButton": "Увійти"
        }
      },
      "labels": {
        "navigation": "Навігація",
        "pages": "Сторінки",
        "selectedRecords": "Обрано ({{selected}})",
        "filters": "Фільтри",
        "adminVersion": "Admin: {{version}}",
        "appVersion": "Додаток: {{version}}",
        "dashboard": "Панель керування"
      },
      "properties": {
        "length": "Довжина",
        "from": "Від",
        "to": "До"
      },
      "resources": {},
      "messages": {
        "successfullyBulkDeleted": "Успішно видалено {{count}} запис",
        "successfullyBulkDeleted_plural": "Успішно видалено {{count}} записів",
        "successfullyDeleted": "Запис успішно видалено",
        "successfullyUpdated": "Запис успішно оновлено",
        "thereWereValidationErrors": "Виявлено помилки валідації — перевірте нижче",
        "forbiddenError": "Ви не можете виконати дію {{actionName}} на {{resourceId}}",
        "anyForbiddenError": "Ви не можете виконати цю дію",
        "successfullyCreated": "Новий запис успішно створено",
        "bulkDeleteError": "Помилка при видаленні записів. Дивіться консоль для деталей",
        "errorFetchingRecords": "Помилка при отриманні записів. Дивіться консоль для деталей",
        "errorFetchingRecord": "Помилка при отриманні запису. Дивіться консоль для деталей",
        "noRecordsSelected": "Ви не вибрали жодного запису",
        "theseRecordsWillBeRemoved": "Буде видалено наступний запис",
        "theseRecordsWillBeRemoved_plural": "Будуть видалені наступні записи",
        "pickSomeFirstToRemove": "Щоб видалити записи, спочатку оберіть їх",
        "error404Resource": "Ресурс із ID: {{resourceId}} не знайдено",
        "error404Action": "Ресурс із ID: {{resourceId}} не має дії з назвою: {{actionName}} або у вас немає доступу!",
        "error404Record": "Ресурс із ID: {{resourceId}} не має запису з ID: {{recordId}} або у вас немає доступу!",
        "seeConsoleForMore": "Дивіться консоль розробника для додаткової інформації...",
        "noActionComponent": "Необхідно реалізувати компонент для цієї дії",
        "noRecordsInResource": "У цьому ресурсі немає записів",
        "noRecords": "Немає записів",
        "confirmDelete": "Ви дійсно хочете видалити цей елемент?",
        "welcomeOnBoard_title": "Ласкаво просимо!",
        "welcomeOnBoard_subtitle": "Тепер ви з нами! Ми підготували кілька порад для початку:",
        "addingResources_title": "Додавання ресурсів",
        "addingResources_subtitle": "Дізнайтесь, як додати нові ресурси до бокової панелі",
        "customizeResources_title": "Налаштування ресурсів",
        "customizeResources_subtitle": "Визначайте поведінку, властивості та інше...",
        "customizeActions_title": "Налаштування дій",
        "customizeActions_subtitle": "Змінюйте існуючі або додавайте нові дії",
        "writeOwnComponents_title": "Написання компонентів",
        "writeOwnComponents_subtitle": "Як змінити вигляд AdminJS",
        "customDashboard_title": "Користувацька панель",
        "customDashboard_subtitle": "Дізнайтесь, як налаштувати головну сторінку AdminJS",
        "roleBasedAccess_title": "Розмежування доступу за ролями",
        "roleBasedAccess_subtitle": "Визначайте права доступу для користувачів AdminJS",
        "community_title": "Приєднуйтесь до спільноти в Discord",
        "community_subtitle": "Спілкуйтесь з розробниками AdminJS та іншими користувачами",
        "foundBug_title": "Знайшли баг або потрібне покращення?",
        "foundBug_subtitle": "Створіть issue на нашому GitHub репозиторії",
        "needMoreSolutions_title": "Потрібні складніші рішення?",
        "needMoreSolutions_subtitle": "Ми можемо створити гарний UI/UX і рішення на базі AdminJS",
        "invalidCredentials": "Неправильна електронна пошта або пароль",
        "keyPlaceholder": "КЛЮЧ",
        "valuePlaceholder": "ЗНАЧЕННЯ",
        "initialKey": "Ключ-{{number}}",
        "keyInUse": "Ключі об'єкта мають бути унікальними",
        "keyValuePropertyDefaultDescription": "Всі значення зберігаються як текст. Ключі мають бути унікальними, дублікати не будуть збережені.",
        "pageNotFound_title": "Сторінку не знайдено",
        "pageNotFound_subtitle": "Сторінка <strong>\"{{pageName}}\"</strong> не існує",
        "componentNotFound_title": "Компонент не вказано",
        "componentNotFound_subtitle": "Необхідно вказати компонент для відображення цього елементу"
      },
      },
    },
  },
  componentLoader,
  pages: {
    mainDashboard: {
      label: 'Головна',
      component: MainDashboard,
    },
  },
  resources: [
    { resource: Order, options: { navigation: 'Заявки' } },
    {
      resource: Lot,
      options: {
        navigation: 'Лоти',
        properties: {
          photos: {
            isVisible: { list: false, edit: true, show: true },
            components: {
              edit: LotPhotoUpload,
            },
          },
        },
      },
    },
    { resource: Component, options: { navigation: 'Компоненти' } },
    {
      resource: Review,
      options: {
        navigation: 'Відгуки',
        properties: {
          userPhoto: {
            isVisible: { list: false, edit: true, show: true },
            components: {
              edit: UserPhotoUpload, 
            },
            type: 'string',
          },
          reviewPhotos: {
            isVisible: { list: false, edit: true, show: true },
            components: {
              edit: ReviewPhotoUpload, 
            },
          },
        },
      },
    },
    { resource: Region, options: { navigation: 'Регіони' } },
    {
      resource: AuctionLocation,
      options: {
        navigation: 'Аукціони',
        properties: {
          portId: { isVisible: false },
          auctionType: {
            isVisible: { list: true, filter: true, show: true, edit: true },
            availableValues: [
              { value: 'copart', label: 'Copart' },
              { value: 'iaai', label: 'IAAI' }
            ]
          }
        },
        listProperties: ['id', 'name', 'auctionType'],
        showProperties: ['id', 'name', 'auctionType'],
        editProperties: ['name', 'auctionType'], 
      },
    },
    {
      resource: Port,
      options: {
        navigation: 'Порти',
        properties: {
          auctionLocations: { isVisible: false },
        },
        listProperties: ['id', 'name'],
        showProperties: ['id', 'name'],
        editProperties: ['name'],
      },
    },
  ],
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
  authenticate: async (email, password) => {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (email === adminEmail && password === adminPassword) {
      return { email };
    }
    return null;
  },
  cookieName: 'adminjs',
  cookiePassword: process.env.COOKIE_SECRET,
}, null, {
  resave: false,
  saveUninitialized: false,
  secret: process.env.ADMIN_COOKIE_SECRET,
});

adminJs.watch();

export { adminJs, adminRouter };