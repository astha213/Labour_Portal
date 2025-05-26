# Labour_Portal
Labour_Portal is a web application designed to connect customers with skilled labourers such as electricians, plumbers, and carpenters. The platform facilitates seamless communication between service seekers (customers) and service providers (labourers) through user authentication, real-time dashboards, service requests, and email notifications.

# 💻 Tech Stack:
- Frontend: React
- Backend: Node.js (Express)
- Database: MongoDB
- Email: Nodemailer (or similar)

# 🔑 Core Functionalities:
**1. User Authentication**
- Signup/Login for 2 types of users:
    - Customer
    - Labourer

- Based on login:
    - Customer ➜ redirects to customer-dashboard
    - Labourer ➜ redirects to labourer-dashboard

**2. Labourer Dashboard**
- Select job title (e.g., Plumber, Electrician)
- Set availability: ✅ Available / ❌ Not Available
- View requests made by customers

**3. Customer Dashboard**
- See available labours by job type & availability
- Select a labourer and make a service request

On request:
- It is stored in the database
- It becomes visible to the selected labourer
- An email is sent to the customer confirming the request

# 🔁 Flow Summary
- Signup/Login
- Redirect based on user type
- Labour sets job + availability
- Customer browses available labourers
- Customer makes a request
- Request saved to DB + visible to labourer
- Email sent to customer
