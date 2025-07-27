*** Settings ***
Library     SeleniumLibrary

*** Variables ***
# Personal Info
${VALID_FIRST_NAME}        Juan
${VALID_MIDDLE_NAME}       Dela
${VALID_LAST_NAME}         Cruz
${VALID_PHONE}             09171234567
${VALID_EMAIL}             juan@example.com

# Company Info
${VALID_DATE_HIRED}        2023-01-15
${VALID_DEPARTMENT}        IT
${VALID_POSITION}          Developer
${VALID_DESIGNATION}       Full-stack
${VALID_BASIC_SALARY}      35000

# Bank Info
${VALID_BANK_NAME}         BDO
${VALID_ACCOUNT_NUMBER}    1234567890
${VALID_BRANCH}            Makati

# Invalid Personal Info
${INVALID_FIRST_NAME}        !@#
${INVALID_MIDDLE_NAME}       123
${INVALID_LAST_NAME}         <script>
${INVALID_PHONE}             abcdefg
${INVALID_EMAIL}             not-an-email

# Company Info - Invalid
${INVALID_DATE_HIRED}        15-01-2023     # Wrong format
${INVALID_DEPARTMENT}        ""             # Empty
${INVALID_POSITION}          %Manager%
${INVALID_DESIGNATION}       999
${INVALID_BASIC_SALARY}      -10000         # Negative

# Bank Info - Invalid
${INVALID_BANK_NAME}         ""
${INVALID_ACCOUNT_NUMBER}    abc123
${INVALID_BRANCH}            null

*** Keywords ***
Go To Add Employee Page
    Go To    ${ADD_EMPLOYEE_URL}

Fill Out Employee Personal Info
    [Arguments]    ${first_name}    ${middle_name}    ${last_name}    ${phone}    ${email}
    Input Text    id:first-name       ${first_name}
    Input Text    id:middle-name      ${middle_name}
    Input Text    id:last-name        ${last_name}
    Input Text    id:phone            ${phone}
    Input Text    id:email            ${email}

Fill Out Employee Company Info
    [Arguments]    ${date_hired}    ${department}    ${position}    ${designation}    ${basic_salary}
    Input Text    id:date-hired       ${date_hired}
    Input Text    id:department        ${department}
    Input Text    id:position          ${position}
    Input Text    id:designation       ${designation}
    Input Text    id:basic-salary      ${basic_salary}

Fill Out Employee Bank Info
    [Arguments]    ${bank_name}    ${account_number}    ${branch}
    Input Text    id:bank-name        ${bank_name}
    Input Text    id:account-number   ${account_number}
    Input Text    id:branch           ${branch}

Submit Employee Form
    Click Button    id:add-employee-btn