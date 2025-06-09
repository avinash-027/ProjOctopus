🚪 Authentication Endpoints (/api/Auth)
🔐 POST /api/Auth/login
Description: Authenticates a user and returns a JWT access token and a refresh token.

Input (application/json):


{
  "username": "abc@abc",
  "password": "123123"
}
Output (application/json):


{
  "accessToken": "eyJhbGciOi...",
  "refreshToken": "some-guid-token"
}
🔄 POST /api/Auth/refresh
Description: Refreshes the JWT access token using a valid refresh token.

Input:

{
  "refreshToken": "some-guid-token"
}
Output:

{
  "accessToken": "new-access-token"
}
🔒 GET /api/Auth/secure
Description: A test endpoint to verify if JWT-based authentication is working.

Authorization: Requires Bearer Token in the Authorization header.

Output:

Hi, this is a secure endpoint!
🧠 Nutrition Report Endpoints (/api/GeminiNutrientTracker)
✅ GET /api/GeminiNutrientTracker
Description: Basic test endpoint to confirm the API is working.

Output:

hi..Don't worry i work
🍽️ POST /api/GeminiNutrientTracker/generate-nutrition-report
Description: Submits a food intake description and user data to generate a nutrition report using the Gemini API.

Input (application/json):


{
  "text": "I have eaten Biryani chicken, apple",
  "weightKg": 70,
  "heightCm": 175,
  "age": 30,
  "gender": "male",
  "healthConditions": [
    "Heart Issue"
  ]
}
Response (application/json): Can be either:

✅ Structured report:

{
  "message": "Structured nutrition report generated.",
  "rawResponse": "RawResponse is parsed as it looks like JSON",
  "foodItems": [
    {
      "foodName": "Biryani Chicken",
      "calories": 500,
      ...
    },
    ...
  ]
}
❌ Unstructured fallback:

{
  "message": "Unstructured output from Gemini.",
  "rawResponse": "Hi there! I'm your Nutrition Assistant...",
  "foodItems": []
}





## 📝

[GitHub link - ProjOctopus.git](https://github.com/avinash-027/ProjOctopus.git)



---

---

### Input - Case 00

> Request body

```
{
  "text": "string",
  "weightKg": 70,
  "heightCm": 175,
  "age": 30,
  "gender": "male",
  "healthConditions": [
    "Heart Issue"
  ]
}
```

> Response Body

```
Check
```
---

### Input - Case 01

> Req Body

```
{
  "text": "I have eaten Biryani chicken, apple",
  "weightKg": 70,
  "heightCm": 175,
  "age": 30,
  "gender": "male",
  "healthConditions": [
    "No known health conditions"
  ]
}
``` 
	

> Response body
```
{
  "message": "Structured nutrition report generated.",
  "rawResponse": "RawResponse is parsed as it looks like JSON",
  "foodItems": [
    {
      "foodName": "Biryani chicken",
      "calories": 550,
      "protein_g": 30,
      "carbs_g": 60,
      "fats_g": 20,
      "servingSize": "1 cup (approx. 220g)",
      "vitamins": "B vitamins, Iron",
      "canConsume": true,
      "reason": "Suitable in moderation, considering it's a balanced meal containing carbs, protein, and fats.",
      "suggestions": [
        "Control portion sizes to manage calorie intake.",
        "Choose biryani made with brown rice for higher fiber.",
        "Pair with a side of salad for added nutrients."
      ]
    },
    {
      "foodName": "Apple",
      "calories": 95,
      "protein_g": 0.5,
      "carbs_g": 25,
      "fats_g": 0.3,
      "servingSize": "1 medium (182g)",
      "vitamins": "C, A",
      "canConsume": true,
      "reason": "Suitable for most diets and a good source of fiber and vitamins.",
      "suggestions": [
        "Enjoy as a snack to boost fiber intake.",
        "Pair with nuts for a balanced snack.",
        "Include in a salad for added texture and nutrients."
      ]
    }
  ]
}
```

---

### Input - Case 02

> Request Body
```
{
  "text": "Hello",
  "weightKg": 70,
  "heightCm": 175,
  "age": 30,
  "gender": "male",
  "healthConditions": [
    "No known health conditions"
  ]
}
```

> Response body
```
{
  "message": "Unstructured output from Gemini.",
  "rawResponse": "Hi there! I'm your Nutrition Assistant. Tell me what you've eaten, and I'll break down the nutritional info for you!",
  "foodItems": []
}
```

---

### Input - Case 03

> Request Body
```
{
  "text": "I have eaten Biryani chicken, apple",
  "weightKg": 70,
  "heightCm": 175,
  "age": 30,
  "gender": "male",
  "healthConditions": [
    "Heart Issue"
  ]
}
```

> Response body
```
{
  "message": "Structured nutrition report generated.",
  "rawResponse": "RawResponse is parsed as it looks like JSON",
  "foodItems": [
    {
      "foodName": "Biryani Chicken",
      "calories": 500,
      "protein_g": 30,
      "carbs_g": 50,
      "fats_g": 25,
      "servingSize": "1 serving (300g)",
      "vitamins": "B vitamins",
      "canConsume": false,
      "reason": "Biryani can be high in saturated fats and sodium, which are not ideal for someone with heart issues. Moderation is key.",
      "suggestions": [
        "Opt for a biryani made with brown rice and leaner cuts of chicken.",
        "Limit portion size and pair with a large serving of vegetables.",
        "Reduce added salt and oil during preparation."
      ]
    },
    {
      "foodName": "Apple",
      "calories": 95,
      "protein_g": 0.5,
      "carbs_g": 25,
      "fats_g": 0.3,
      "servingSize": "1 medium (182g)",
      "vitamins": "C, A",
      "canConsume": true,
      "reason": "Apples are a good source of fiber and antioxidants and are generally beneficial for heart health.",
      "suggestions": [
        "Enjoy as a snack to boost fiber intake.",
        "Pair with nuts for a balanced snack.",
        "Include in salads for added crunch and nutrients."
      ]
    }
  ]
}
```

