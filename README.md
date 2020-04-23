# TWF Fullstack Intern Assignment API

## Route

####  Solve the task

<table>
    <tr>
        <td>
            TITLE
        </td>
        <td>
            Solve the Assignment task
        </td>
    </tr>
    <tr>
        <td>
            URL
        </td>
        <td>
            <code>/solve</code>
        </td>
    </tr>
    <tr>
        <td>
            Method
        </td>
        <td>
            <code>POST</code>
        </td>
    </tr>
    <tr>
        <td>
            URL params
        </td>
        <td>
            <i>none</i>
        </td>
    </tr>
    <tr>
        <td>
            Form data 
        </td>
        <td>
            <i>
                An integer array (in the form of string) of length 9 with each element denoting the quantity of each stock product (from A to I)
            </i>
            <br>
            <code>
                {
                    'input': '[1, 1, 1, 1, 0, 0, 0, 0, 0]'
                }
            </code>
        </td>
    </tr>
    <tr>
        <td>
            Success response
        </td>
        <td>
            <i>Example:</i>
            <br>
            Code: <code>200</code>
            <br>
            Content: 52
        </td>
    </tr>
    <tr>
        <td>
            Error Response
        </td>
        <td>
            Example:
            <br>
            Code: <code>400 BAD REQUEST</code>
            <br>Content: <code>{ error : "Input array should be of length 9" }</code>
            <br>
            <strong>OR</strong>
            <br>Code: <code>400 BAD REQUEST</code>
            <br>Content: <code>{ error : "Inavlid input array" }</code>
            <br>
            <strong>OR</strong>
            <br>Code: <code>500 INTERNAL SERVER ERROR</code>
            <br>Content: <code>{ error : < stack trace > }</code>
            <br>
        </td>
    </tr>
    <tr>
        <td>
            Sample call (bash)
        </td>
        <td>
            <code>
                curl --request POST
                --url https://twf-fullstack-intern-assign.herokuapp.com/solve
                -d 'input=[1, 1, 1, 1, 0, 0, 0, 0, 0]'
            </code>
        </td>
    </tr>
</table>

