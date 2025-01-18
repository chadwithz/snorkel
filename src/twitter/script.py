import sys
import json
from twitter.account import Account


def post_text(content, cookies):
    account = Account(cookies=cookies)
    return account.tweet(content)


# TODO: handle multiple files
def post_media(content, media, cookies):
    account = Account(cookies=cookies)
    return account.tweet(content, media=[{'media': media}])


def delete_post(id, cookies):
    account = Account(cookies=cookies)
    return account.untweet(id)


def change_profile_pic(pic, cookies):
    account = Account(cookies=cookies)
    return account.update_profile_image(pic)


def get_dms(cookies):
    account = Account(cookies=cookies)
    return account.dm_history()


# Dispatcher to call functions dynamically
def dispatch_function(data):
    function_name = data.get("function")
    args = data.get("args", {})

    if function_name == "post_text":
        return post_text(**args)
    elif function_name == "post_media":
        return post_media(**args)
    elif function_name == "delete_post":
        return delete_post(**args)
    elif function_name == "change_profile_pic":
        return change_profile_pic(**args)
    elif function_name == "get_dms":
        return get_dms(**args)
    else:
        raise ValueError(f"Unknown function: {function_name}")


# Read input from stdin
input_data = sys.stdin.read()
parsed_data = json.loads(input_data)

try:
    # Call the appropriate function
    result = dispatch_function(parsed_data)
    # Output the result as JSON
    sys.stdout.write(json.dumps({"result": result}))
except Exception as e:
    # Handle errors
    sys.stdout.write(json.dumps({"error": str(e)}))
sys.stdout.flush()
