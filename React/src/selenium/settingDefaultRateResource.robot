*** Settings ***
Library           SeleniumLibrary

*** Variables ***
${URL}                  
${BROWSER}              Chrome
${USERNAME}             validUser
${PASSWORD}             validPass

${POSITIVE_INTEGER}     100
${FLOAT_VALUE}          123.45
${NEGATIVE_VALUE}       -50

*** Keywords ***
Navigate To Set Defaults Page
    Click Button            id:set-default-button

Set Default Rate To Value    ${value}
    Input Text               id:rate-field      ${value}
    Input Text               id:basic-field     ${value}
    Click Button             id:confirm-button

Should See Success Message
    Wait Until Page Contains    Defaults updated successfully    timeout=5s

Should See Error Message
    Wait Until Page Contains    Invalid input    timeout=5s