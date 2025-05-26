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

# Run Project:
- Navigate to directory.
- On mongodb atlas create account add current ip and get connectrin string and password.
- Open mongodb Compass, paste the connection string and password and connect.
- node app.js
- npm start 

# Customer Dashboard
![8c61e8e0-aefd-4c6c-ae3c-c24cca688b0d](https://github.com/user-attachments/assets/c634874c-622f-47cc-9b4b-3761051e8bc4)

# Labourer Dashboard
![b5d0d784-df3e-4463-8767-1e686876b2cd](https://github.com/user-attachments/assets/875b7832-c7a9-4ccf-aa70-35b6b506bd2e)

# Add job
![WhatsApp Image 2025-05-26 at 16 09 59](https://github.com/user-attachments/assets/334b3249-7f8e-482a-a1ef-f50b141222dd)

# Fetch Requests and Set Availability
![4d18fe70-6c68-4765-b726-3a0c316b14af](https://github.com/user-attachments/assets/69cff483-e429-4d75-858a-50b0c54d9eb3)

# Customers Requests
![6fea6af3-d740-44bb-a5bf-896f8ee31115](https://github.com/user-attachments/assets/0528666d-ba74-4d4d-a52e-539684027caf)

# Email
![de6f609e-f747-421b-ad84-57ba005d46b5](https://github.com/user-attachments/assets/09e988e2-5665-4850-bfea-2373b192d2e6)

**Astha Chaudhari** - asthachaudhari0815@gmail.com
