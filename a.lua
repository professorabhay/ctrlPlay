local json = require("json")

_0RBIT = "BaMK1dfayo75s3q1ow6AO64UDpD9SEFbeE8xYrY2fyQ"  -- 0rbit Process ID
_0RBT_POINTS = "BUhZLMwQ6yZHguLtJYA5lLUa9LQzLXMXRfaq9FVcPJc"  -- $0RBT Token Process ID

FEE_AMOUNT = "1000000000000" -- 1 $0RBT
LLM_API_URL = "https://api.anthropic.com/v1/messages"  -- Claude API endpoint
LLM_API_KEY = "Bearer <key>"  -- Replace with your actual Claude API key

-- The request body for the Claude API
BODY = json.encode({
    model = "claude-3-5-sonnet-20241022",  -- Claude model name
    max_tokens = 1024,  -- Maximum tokens in response
    messages = {
        { role = "system", content = "You are an AI assistant trained by Anthropic." },
        { role = "user", content = "What is AO?" }
    }
})

Handlers.add(
    "Post-Request",
    Handlers.utils.hasMatchingTag("Action", "Send-LLM-Request"),
    function(msg)
        Send({
            Target = _0RBT_POINTS,
            Action = "Transfer",
            Recipient = _0RBIT,
            Quantity = FEE_AMOUNT,
            ["X-Url"] = LLM_API_URL,
            ["X-Action"] = "Post-Real-Data",
            ["X-Body"] = BODY,
            ["X-Headers"] = json.encode({
                ["x-api-key"] = LLM_API_KEY, 
                ["anthropic-version"] = "2023-06-01",
                ["Content-Type"] = "application/json"
            })
        })
        print(Colors.green .. "You have sent a POST request to the Claude API through the 0rbit process.")
    end
)

Handlers.add(
    "Receive-Response",
    Handlers.utils.hasMatchingTag("Action", "Receive-Response"),
    function(msg)
        local response = json.decode(msg.Data)  -- Decode the response
        if response.messages and response.messages[1] and response.messages[1].content then
            print(Colors.green .. "LLM Response: " .. response.messages[1].content)
        else
            print(Colors.red .. "Failed to retrieve a valid response from the Claude API.")
        end
    end
)
