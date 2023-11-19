# Assignment Rubric: Cleanup, Refactoring & Adding REST Endpoints to your Application

## General Information

- **Assignment Title:** Cleanup, Refactoring & Adding REST Endpoints to your Application
- **Submission Method:** Git Repository on the **main branch**

---

## Functional Requirements (70 points)

| Requirement                                                 | Points |     |
| ----------------------------------------------------------- | ------ | --- |
| Github                                                      |        |     |
| - code is on the main branch                                | 5      | 5   |
| - node_modules is not in the repository                     | 5      | 4   |
| Routes                                                      |        |     |
| - api CRUD endpoints added for users                        | 10     | 7   |
| - api CRUD endpoints added for products                     | 10     | 7   |
| - api login endpount added                                  | 10     | 7   |
| - routes are refactored router modules                      | 15     | 15  |
| Data                                                        |        |     |
| - user data is moved under data folder                      | 5      | 5   |
| - product data is moved under data folder                   | 5      | 5   |
| Service Classes                                             |        |     |
| - create a User Service for CRUD operations                 | 10     | 10  |
| - create a Product Service for CRUD operations              | 10     | 10  |
| - create an AuthenticationService for simple authentication | 15     | 15  |

## Total Score: 90 / 100

### Comments:

The code here is really good. Thought it would run perfeclty but you missed
attaching the routes to the app!

`app.use("/api", apiRoutes);`

Small oversight but none of the endpoints work without it. Maybe you missed a final commit? Anyhow it is a good job regardless.

...also missing .gitignore file
