# Project README

## Overview

This project is a feature-rich inventory and sales management system designed with a focus on user-friendly functionality, responsiveness, and localization for the Nigerian market. It allows administrators to manage products, sales, and users efficiently while ensuring all interactions are secure and intuitive. The platform is styled with Tailwind CSS, ensuring a modern and responsive design.


## Features

### Inventory Management

- **Edit Products**: Admins can edit product details via a dialog form.
- **Add Sales**: Sales can be recorded, with support for barcode scanning.
- **Barcode Scanning**: Integrated barcode functionality works seamlessly on the Inventory and Sales pages.

### User Management

- **Add Admins**: Admins can create other admin accounts.
- **Remove Users**: Admins can remove users when needed.

### Authentication

- **Admin Credentials**: Test credentials are provided for demo purposes.
  - **Email**: `0biken@gmail.com`
  - **Password**: `iamafool`
- **Login Page Enhancements**: The login page is styled with proper padding, max-width constraints, and mobile responsiveness.

### Design and Implementation

- **Form Handling**: React-hook-form is used for managing forms, ensuring proper context and validation.
- **Refactored Components**: Code is modularized into smaller, maintainable components for better readability and performance.

## Technical Details

### Technologies Used

- **Frontend Framework**: React.js
- **Styling**: Tailwind CSS
- **State Management**: Context API
- **Form Handling**: React-hook-form
- **Responsive Design**: Mobile-first approach with CSS media queries

### Key Libraries

- **React Hook Form**: For form state management and validation.
- **ShadCN/UI**: Provides custom wrappers like the Form component for enhanced usability.
- **Barcode Integration**: A custom barcode scanner library is integrated.

## Installation and Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the application in your browser at `http://localhost:3000`.

## Usage

### Admin Features

1. **Login**: Use the test credentials to log in.
   - Email: `0biken@gmail.com`
   - Password: `iamafool`
2. **Manage Inventory**: Add, edit, or delete products. Use the barcode scanner for quick updates.
3. **Manage Sales**: Record sales transactions and track inventory updates.
4. **User Management**: Add new admins and remove existing users.

### Responsiveness

- Ensure that the application is usable across devices, from desktops to mobile phones.

## Future Enhancements

- Securely store user credentials using hashing mechanisms.
- Integrate with a backend service for real-time data synchronization.
- Expand barcode scanning functionality to support multiple formats.
- Add analytics and reporting features for better business insights.


## Contribution

Feel free to contribute to this project by submitting pull requests or reporting issues. Ensure that your changes are well-documented and tested.

## License

This project is licensed under the [MIT License](LICENSE).

