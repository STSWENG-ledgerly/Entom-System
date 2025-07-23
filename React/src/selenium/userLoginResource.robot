*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${URL}                http://localhost:3000
${BROWSER}            Chrome
${VALID_USERNAME}     admin
${VALID_PASSWORD}     password123
${INVALID_USERNAME}   wronguser
${INVALID_PASSWORD}   wrongpass

*** Keywords ***
Open Login Page
    Open Browser    ${URL}    ${BROWSER}
    Maximize Browser Window

Login With Valid Credentials
    Input Text    css:input[placeholder="Username"]     ${VALID_USERNAME}
    Input Text    css:input[placeholder="Password"]     ${VALID_PASSWORD}
    Click Button  id:login-button

Login With Invalid Credentials
    Input Text    css:input[placeholder="Username"]     ${INVALID_USERNAME}
    Input Text    css:input[placeholder="Password"]     ${INVALID_PASSWORD}
    Click Button  id:login-button

Should Be Redirected To Main Menu
    Wait Until Location Contains    /MainMenu    timeout=5s

Should Stay On Login Page With Error
    Wait Until Page Contains Element    css:span.${ERROR_CLASS}    timeout=5s