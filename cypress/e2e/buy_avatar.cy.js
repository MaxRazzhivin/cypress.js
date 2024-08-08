import * as pokemons from "../locators/pokemons.json"

describe('Покупка аватара для тренера', function () {

it('Покупка аватара для тренера', function () {
    cy.visit(pokemons.host); // Зашли на сайт
    cy.get(pokemons.login).type('Name_Login'); //Ввели верный логин
    cy.get(pokemons.password).type('Password'); // Ввели верный пароль
    cy.get(pokemons.login_button).click(); //Нажали на кнопку "Войти"
    cy.wait(2000); // Задержка в 2 секунды
    cy.get(pokemons.shop_btn).click(); // Нажали перейти в магазин
    cy.get(pokemons.trainer_8_buy_btn).click();
    cy.get(pokemons.credit_card_input).type('4620869113632996');
    cy.get(pokemons.credit_card_date_input).type('1225');
    cy.get(pokemons.cvv_input).type('125');
    cy.get(pokemons.name_for_card_input).type('Some Name');
    cy.get(pokemons.pay_btn_card_menu).click();
    cy.get(pokemons.sms_code_input).type('56456');
    cy.get(pokemons.payment_submit_btn).click();
    cy.contains('Покупка прошла успешно').should('be.visible');
    cy.get(pokemons.return_main_page).click();
    })

})