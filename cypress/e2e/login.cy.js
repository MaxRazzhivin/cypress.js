import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"
import * as recovery_page from "../locators/recovery_password_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зашли на сайт
        cy.get(main_page.fogot_pass_btn).should("be.visible") // Кнопка "Забыл пароль видна пользователю"
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Цвет кнопки совпадает с сайтом
          });

    afterEach('Конец теста', function () {
        cy.get(result_page.title).should('be.visible') // Текст сообщения виден пользователю
        cy.get(result_page.close).should('be.visible') // Наш крестик должен быть виден пользователю
        });

    it('Верный логин и верный пароль', function () {
         cy.get(main_page.email).type(data.login); //Ввели логин
         cy.get(main_page.password).type(data.password); // Ввели верный пароль
         cy.get(main_page.login_button).click(); //Нажали на кнопку "Войти"
         cy.wait(5000);
         cy.get(result_page.title).contains("Авторизация прошла успешно") // Проверка, что элемент содержит текст "Авторизация прошла успешно"
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); //Ввели логин
        cy.get(main_page.password).type('iLoveqastudio7'); // Ввели неверный пароль
        cy.get(main_page.login_button).click(); //Нажали на кнопку "Войти"
        cy.get(result_page.title).contains("Такого логина или пароля нет") // Проверка, что элемент содержит сообщение
   })

   it('Логин без @ и верный пароль', function () {
    cy.get(main_page.email).type('germandolnikov.ru'); //Ввели логин без @
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); //Нажали на кнопку "Войти"
    cy.get(result_page.title).contains("Нужно исправить проблему валидации") // Проверка, что элемент содержит сообщение
})

it('Логин неверный и верный пароль', function () {
    cy.get(main_page.email).type('germa@dolnikov.ru'); //Ввели логин неверный
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); //Нажали на кнопку "Войти"
    cy.get(result_page.title).contains("Такого логина или пароля нет") // Проверка, что элемент содержит сообщение
})

it('Строчные буквы в логине', function () {
    cy.get(main_page.email).type('GeRmaN@dolNikov.ru'); //Ввели логин верный со строчными буквами
    cy.get(main_page.password).type(data.password); // Ввели верный пароль
    cy.get(main_page.login_button).click(); //Нажали на кнопку "Войти"
    cy.get(result_page.title).contains("Авторизация прошла успешно") // Проверка, что элемент содержит текст "Авторизация прошла успешно"
})

it('Проверка восстановления пароля', function () {
    cy.get(main_page.fogot_pass_btn).click(); //Нажали на кнопку "Забыл пароль"
    cy.get(recovery_page.title).contains("Восстановите пароль") // Проверка, что элемент содержит сообщение
    cy.get(recovery_page.title).should('be.visible') // Текст сообщения виден пользователю
    cy.get(recovery_page.close).should('be.visible') // Наш крестик должен быть виден пользователю
    cy.get(recovery_page.email).type(data.login) // ввели почту для восстановления пароля
    cy.get(recovery_page.send_button).click() // нажали на "Отправить код"
    cy.get(result_page.title).contains("Успешно отправили пароль на e-mail") // сообщение содержит текст
})
})