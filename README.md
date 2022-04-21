# Preis Assignment

- [Project Setup](#project-setup)

## Project Setup

The recommended way to set up a development environment for the application is to use [Laravel Homestead](https://laravel.com/docs/8.x/homestead). Homestead provides a simple way to set up a development environment without requiring that PHP or any other server software is installed on your local machine.

This document assumes:
* You have a `~/Code` directory on your local machine.
* The application lives at `~/Code/preis`.
* You have an ssh key pair (probably set up for github!)
* You have Homestead installed & configured

The document also assumes you will be accessing the development environment at http://homestead.test with IP 192.168.10.10 configured in Homestead.yaml

#### Versions

Project is using:  

* Php 7.4
* Laravel 8
* MySQL 8.0 (Engine: InnoDB, character set: utf8mb4 , collation: utf8mb4_0900_ai_ci)

#### Getting the Code

* `mkdir ~/Code`
* `cd ~/Code`
* `git clone git@github.com:SufyanChaudhry/preis.git`

### Accessing Local Homestead Database

The default credentials for Homestead are below.

```
host: 192.168.10.10
username: homestead
password: secret
database: homestead
port: 3306
```

### Homestead Usage Instructions

To start Homestead, run the following from the local environment:

```
# Change to Homestead directory
cd ~/Homestead

# Launch Vagrant box
vagrant up
```

To shut down Homestead, run the following from the local environment:

```
# Change to Homestead directory
cd ~/Homestead

# Suspend Vagrant machine
vagrant suspend
```

Any time the Homestead configuration file (`~/.homestead/Homestead.yaml`) is updated the virtual machine will need to be reloaded.

```
# Change to Homestead directory
cd ~/Homestead

# Update configuration
vagrant reload --provision
```

This will create the virtual machine with the Homestead configuration.

Next, configure the application's environmental variables. You can copy the application's `.env.example` file to `.env` (`~/Code/preis/.env`)

Next, install the application dependencies and run the database migrations and seeders. This should be done from within the virtual machine.

```
# Change to Homestead directory
cd ~/Homestead

# Connect to Vagrant box
vagrant ssh

# Change to project directory
cd Code/preis

# Install Composer dependencies
composer install

# Run database migrations
php artisan migrate

# Run database seeders
php artisan db:seed
```  
