*** Settings ***
Library     SeleniumLibrary
Library     DateTime

*** Variables ***
# Personal Info
${VALID_FIRST_NAME}        Juan
${VALID_MIDDLE_NAME}       Dela
${VALID_LAST_NAME}         Cruz
${VALID_PHONE}             09171234567
${VALID_EMAIL}             juan@example.com

# Company Info
${VALID_DATE_HIRED}        15-01-2003
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
${INVALID_DATE_HIRED}        1111-11-11     # Wrong format
${INVALID_DEPARTMENT}        ""             # Empty
${INVALID_POSITION}          %Manager%
${INVALID_DESIGNATION}       999
${INVALID_BASIC_SALARY}      -10000         # Negative

# Bank Info - Invalid
${INVALID_BANK_NAME}         ""
${INVALID_ACCOUNT_NUMBER}    abc123
${INVALID_BRANCH}            null

*** Keywords ***
Navigate To Add Employee Page
    Click Element            id:add-employee-button

Fill Out Employee Personal Info
    [Arguments]    ${first_name}    ${middle_name}    ${last_name}    ${phone}    ${email}
    Input Text    id:fname            ${first_name}
    Input Text    id:mname            ${middle_name}
    Input Text    id:lname            ${last_name}
    Input Text    id:phone            ${phone}
    Input Text    id:email            ${email}

Fill Out Employee Company Info
    [Arguments]    ${department}    ${position}    ${designation}    ${basic_salary}
    Input Text    id:department        ${department}
    Input Text    id:position          ${position}
    Input Text    id:designation       ${designation}
    Input Text    id:salary      ${basic_salary}

Set Employee Hiring Date
    Wait Until Element Is Visible    id=date
    ${today}=    Get Current Date    result_format=%d-%m-%Y
    Click Element    id=date
    Input Text       id=date    ${today}
    Sleep            0.5s
    Click Element    id:outside

Fill Out Employee Bank Info
    [Arguments]    ${bank_name}    ${account_number}    ${branch}
    Input Text    id:bank             ${bank_name}
    Input Text    id:account          ${account_number}
    Input Text    id:branch           ${branch}

Submit Employee Form
    Execute JavaScript    document.getElementById("add-employee-btn").scrollIntoView()
    Click Button    id:add-employee-btn