<p align="center">
    <img src="public/Logo.png" width="180" alt="RentFlow logo">
</p>

<h1 align="center">RentFlow</h1>

<p align="center">A rental property management system for organizing properties, tenants, invoices, and payments in one place.</p>

## Overview

RentFlow helps property managers keep the operational side of renting organized. Authenticated users can group related properties, manage rooms and tenants, issue invoices, and record payments without maintaining separate spreadsheets or disconnected tools.

The application is built with Laravel and presents its authenticated pages through Inertia.js and React. Laravel handles routing, authentication, authorization, validation, persistence, and server-side application logic, while React provides the interactive user interface.

## What The System Does

- **Groups** organize properties and support multi-user collaboration.
- **Rooms** store rental units with their type, capacity, price, and availability status.
- **Tenants** connect people to rooms and groups, with active and inactive records.
- **Invoices** track charges, billing dates, due dates, and payment status for tenants.
- **Payments** record payments against invoices, including payment methods and reference numbers.
- **User profiles** allow authenticated users to update their details or delete their account.
- **Authentication** includes standard login and registration flows, email verification, password changes, and Google OAuth.

## How It Works

1. A user signs in or creates an account.
2. The user creates or selects a group for a property portfolio or project.
3. Rooms are added to the group with pricing, capacity, type, and status information.
4. Tenants are assigned to rooms and managed from the tenant area.
5. Invoices are created for tenant charges and tracked through their due dates and statuses.
6. Payments are recorded against invoices so outstanding balances can be followed over time.

The main domain relationships are:

```text
Group
    ├── Rooms
    └── Tenants ─── Invoices ─── Payments
```

## Technology Stack

- PHP 8.2+
- Laravel 12
- Inertia.js 2 with React 18
- Vite 7
- Tailwind CSS
- Laravel Breeze for authentication
- Laravel Socialite for Google OAuth
- Laravel Eloquent ORM and database migrations
- Pest and PHPUnit for testing

## Getting Started

### Requirements

- PHP 8.2 or newer
- Composer
- Node.js and npm
- A supported database configured in `.env`

### Installation

Clone the repository, install the dependencies, and prepare the application:

```bash
composer install
cp .env.example .env
php artisan key:generate
```

Configure the database and mail settings in `.env`, then run the migrations and install the frontend dependencies:

```bash
php artisan migrate
npm install
```

The project also provides a setup script that performs the standard installation steps:

```bash
composer run setup
```

### Running Locally

Start the complete local development environment with:

```bash
composer run dev
```

This starts the Laravel server, queue listener, application logs, and Vite development server. To run the services separately, use:

```bash
php artisan serve
npm run dev
```

Build frontend assets for production with:

```bash
npm run build
```

## Testing

Run the application test suite with:

```bash
composer run test
```

## Project Structure

```text
app/                 Application code, controllers, models, policies, and requests
database/            Migrations, factories, and seeders
resources/js/        React pages and shared UI components
resources/css/       Application styles
routes/              Web and authentication routes
public/Logo.png      RentFlow logo
tests/               Feature and unit tests
```

## License

RentFlow is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework. You can also check out [Laravel Learn](https://laravel.com/learn), where you will be guided through building a modern Laravel application.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com)**
- **[Tighten Co.](https://tighten.co)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Redberry](https://redberry.international/laravel-development)**
- **[Active Logic](https://activelogic.com)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
