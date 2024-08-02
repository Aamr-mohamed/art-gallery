# art-gallery

## Installation

### Clone the Repository

```bash
git clone https://github.com/Aamr-mohamed/art-gallery.git
cd art-gallery
```

### Install backend Dependencies

```bash
composer install
```

For the first time, you need to create a `.env` file in the root directory of the project and copy the `.env.example` file to it.
```bash
cp .env.example .env
```

```bash
php artisan key:generate
```

Laravel stores uploaded files in the storage directory. Create a symbolic link to access these files from the public directory:
```bash
php artisan storage:link
```
Run the database migrations
```bash
php artisan migrate
```
Seed the database with initial data
```bash
php artisan db:seed
```

###Run the backend

```bash
php artisan serve
```

### Install frontend Dependencies

```bash
npm install
```

### Run the App

```bash
npm start
```

